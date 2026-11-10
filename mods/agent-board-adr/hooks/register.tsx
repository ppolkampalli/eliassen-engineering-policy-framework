import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import { extractMarkdownTitle, titleFallback } from './adr-model'
import type { AdrRecord } from '../types'

const PANE = 'agent-board-adr'
const ADR_DIR = 'docs/adr'

// Change the tag when a stored record's fields change: it declines what an
// earlier version stored, which outlives a reload.
const records = atom({ plugin: 'agent-board-adr', key: 'records' } as const, [] as AdrRecord[], {
  shape: 'records-1',
})
const selected = atom({ plugin: 'agent-board-adr', key: 'selected' } as const, null as string | null)

async function loadRecords($: EngineInterface): Promise<void> {
  const entries = await $.fs.list(ADR_DIR).catch(() => [])
  const files = entries
    .filter(entry => entry.kind === 'file' && entry.name.endsWith('.md'))
    .map(entry => entry.name)
    .sort((a, b) => a.localeCompare(b))

  const built: AdrRecord[] = []
  for (const filename of files) {
    const content = await $.fs.read(`${ADR_DIR}/${filename}`).catch(() => null)
    if (typeof content !== 'string') continue
    built.push({ filename, title: extractMarkdownTitle(content, titleFallback(filename)), content })
  }
  await update($, records, () => built)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'board-adr',
      description: 'Browse ADR records (docs/adr)',
    })
    await loadRecords($)

    return next(e)
  })

  on('command.run', { command: 'board-adr' }, async $ => {
    await $.ui.open({ id: PANE, title: 'ADR Records' })

    return { text: 'ADR Records pane opened.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button, Markdown } = $.ui.resolve(e)
    const list = await read($, records)
    const selectedFilename = await read($, selected)
    const current = list.find(record => record.filename === selectedFilename) ?? null

    if (list.length === 0) {
      return (
        <Box flexDirection="column">
          <Text dimColor>No ADR documents found in {ADR_DIR}.</Text>
          <Button plain onPress={() => loadRecords($)}>
            ↻ Refresh
          </Button>
        </Box>
      )
    }

    if (current) {
      return (
        <Box flexDirection="column">
          <Button key="back" plain onPress={() => update($, selected, () => null)}>
            ← Back
          </Button>
          <Box marginTop={1} marginBottom={1}>
            <Text weight="bold">{current.title}</Text>
          </Box>
          <Markdown text={current.content} />
        </Box>
      )
    }

    return (
      <Box flexDirection="column">
        <Box flexDirection="row" justifyContent="space-between">
          <Text dimColor>
            {list.length} ADR document{list.length === 1 ? '' : 's'}
          </Text>
          <Button key="refresh" plain onPress={() => loadRecords($)}>
            ↻ Refresh
          </Button>
        </Box>
        <Box flexDirection="column" marginTop={1} gap={1}>
          {list.map(record => (
            <Button key={record.filename} plain onPress={() => update($, selected, () => record.filename)}>
              {record.title} <Text dimColor>{record.filename}</Text>
            </Button>
          ))}
        </Box>
      </Box>
    )
  })
}
