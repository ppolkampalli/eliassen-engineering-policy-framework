import { atom, read, update } from 'claude-code'
import type { Color, EngineInterface, Register } from 'claude-code'

import { extractMarkdownTitle, extractStatus, titleFallback } from './adr-model'
import type { AdrRecord } from '../types'

const PANE = 'agent-board-adr'
const ADR_DIR = 'docs/adr'

const STATUS_COLOR: Record<string, Color> = {
  ACCEPTED: 'success',
  APPROVED: 'success',
  PROPOSED: 'warning',
  DRAFT: 'warning',
  SUPERSEDED: 'inactive',
  DEPRECATED: 'inactive',
  REJECTED: 'error',
}

function statusColor(status: string | null): Color {
  if (!status) return 'subtle'
  return STATUS_COLOR[status] ?? 'subtle'
}

// Change the tag when a stored record's fields change: it declines what an
// earlier version stored, which outlives a reload.
const records = atom({ plugin: 'agent-board-adr', key: 'records' } as const, [] as AdrRecord[], {
  shape: 'records-1',
})
const selected = atom({ plugin: 'agent-board-adr', key: 'selected' } as const, null as string | null)
const diagnostic = atom({ plugin: 'agent-board-adr', key: 'diagnostic' } as const, null as string | null)

async function loadRecords($: EngineInterface): Promise<void> {
  let listError: string | null = null
  const entries = await $.fs.list(ADR_DIR).catch(err => {
    listError = err instanceof Error ? err.message : String(err)
    return []
  })
  const files = entries
    .filter(entry => entry.kind === 'file' && entry.name.endsWith('.md'))
    .map(entry => entry.name)
    .sort((a, b) => a.localeCompare(b))

  const built: AdrRecord[] = []
  let unreadable = 0
  for (const filename of files) {
    const content = await $.fs.read(`${ADR_DIR}/${filename}`).catch(() => null)
    if (typeof content !== 'string') {
      unreadable += 1
      continue
    }
    built.push({
      filename,
      title: extractMarkdownTitle(content, titleFallback(filename)),
      content,
      status: extractStatus(content),
    })
  }
  await update($, records, () => built)
  await update(
    $,
    diagnostic,
    () =>
      listError
        ? `$.fs.list("${ADR_DIR}") failed: ${listError}`
        : `$.fs.list("${ADR_DIR}") → ${entries.length} entries, ${files.length} *.md, ${unreadable} unreadable`,
  )
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
    const diag = await read($, diagnostic)

    function Badge({ color, children }: { color: Color; children: string }) {
      return (
        <Text backgroundColor={color} color="inverseText">
          {' '}
          {children}
          {' '}
        </Text>
      )
    }

    if (list.length === 0) {
      return (
        <Box flexDirection="column">
          <Text dimColor>No ADR documents found in {ADR_DIR}.</Text>
          {diag && <Text dimColor>{diag}</Text>}
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
            ← Back to Records
          </Button>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop={1}
            marginBottom={1}
            borderStyle="round"
            borderColor={statusColor(current.status)}
            paddingX={1}
          >
            <Text weight="bold">{current.title}</Text>
            <Badge color={statusColor(current.status)}>{current.status ?? 'UNKNOWN'}</Badge>
          </Box>
          <Text dimColor>{current.filename}</Text>
          <Box marginTop={1}>
            <Markdown text={current.content} />
          </Box>
        </Box>
      )
    }

    const statusCounts = new Map<string, number>()
    for (const record of list) {
      const key = record.status ?? 'UNKNOWN'
      statusCounts.set(key, (statusCounts.get(key) ?? 0) + 1)
    }

    return (
      <Box flexDirection="column">
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Text dimColor>
            {list.length} ADR document{list.length === 1 ? '' : 's'}
          </Text>
          <Button key="refresh" plain onPress={() => loadRecords($)}>
            ↻ Refresh
          </Button>
        </Box>
        <Box flexDirection="row" gap={1} marginTop={1} flexWrap="wrap">
          {[...statusCounts.entries()].map(([status, count]) => (
            <Badge key={status} color={statusColor(status === 'UNKNOWN' ? null : status)}>
              {`${status} ${count}`}
            </Badge>
          ))}
        </Box>
        <Box flexDirection="column" marginTop={1} gap={1}>
          {list.map((record, index) => (
            <Box
              key={record.filename}
              flexDirection="column"
              borderStyle="round"
              borderColor={statusColor(record.status)}
              borderDimColor
              paddingX={1}
            >
              <Button key={record.filename} plain onPress={() => update($, selected, () => record.filename)}>
                <Text dimColor>{String(index + 1).padStart(2, '0')}</Text> {record.title}
              </Button>
              <Box flexDirection="row" justifyContent="space-between">
                <Text dimColor>{record.filename}</Text>
                <Badge color={statusColor(record.status)}>{record.status ?? 'UNKNOWN'}</Badge>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )
  })
}
