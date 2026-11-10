import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import { deriveWorkItems, formatElapsed, parseLog, stageSummary, truncate } from './board-model'
import type { BoardEvent, Lane } from '../types'

const PANE = 'agent-board-kanban'
const LOG_PATH = '.claude/board/events.local.jsonl'
const POLL_MS = 1500

// Change the tag when a stored event's fields change: it declines what an
// earlier version stored, which outlives a reload.
const events = atom({ plugin: 'agent-board-kanban', key: 'events' } as const, [] as BoardEvent[], {
  shape: 'events-1',
})

const LANES: { id: Lane; label: string; icon: string; color: string }[] = [
  { id: 'inProgress', label: 'In Progress', icon: '▸', color: 'text' },
  { id: 'blocked', label: 'Blocked', icon: '⛔', color: 'warning' },
  { id: 'done', label: 'Done', icon: '✓', color: 'success' },
]

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'board',
      description: 'Open the agent-board Kanban pane',
    })
    void $.ui.open({ id: PANE, title: 'Agent Board' })

    const poll = async (): Promise<void> => {
      const text = await $.fs.read(LOG_PATH).catch(() => '')
      const { events: parsed } = parseLog(typeof text === 'string' ? text : '')
      await update($, events, () => parsed)

      const items = [...deriveWorkItems(parsed).values()]
      const blocked = items.filter(item => item.lane === 'blocked').length
      const inProgress = items.filter(item => item.lane === 'inProgress').length
      const done = items.filter(item => item.lane === 'done').length
      $.ui.status(
        items.length === 0
          ? undefined
          : `board: ${inProgress} in progress · ${blocked} blocked · ${done} done`,
      )
    }
    await poll()
    $.clock.every(POLL_MS, poll)

    return next(e)
  })

  on('command.run', { command: 'board' }, async $ => {
    await $.ui.open({ id: PANE, title: 'Agent Board' })

    return { text: 'Agent Board pane opened.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e)
    const list = await read($, events)
    const items = [...deriveWorkItems(list).values()]

    if (items.length === 0) {
      return (
        <Box flexDirection="column">
          <Text dimColor>No board events yet at {LOG_PATH}.</Text>
          <Text dimColor>Run a governed workflow to populate it.</Text>
        </Box>
      )
    }

    const columns = e.props.bodyColumns ?? 80
    const gap = 1
    const laneWidth = Math.max(18, Math.floor((columns - (LANES.length - 1) * gap) / LANES.length))
    const noteBudget = Math.max(10, laneWidth - 6)

    return (
      <Box flexDirection="column">
        <Text dimColor>
          {items.length} work item{items.length === 1 ? '' : 's'} · {LOG_PATH}
        </Text>
        <Box flexDirection="row" gap={gap} marginTop={1}>
          {LANES.map(lane => {
            const laneItems = items.filter(item => item.lane === lane.id)

            return (
              <Box key={lane.id} flexDirection="column" width={laneWidth}>
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  paddingX={1}
                  borderStyle="round"
                  borderColor={lane.color}
                >
                  <Text weight="bold" color={lane.color}>
                    {lane.icon} {lane.label}
                  </Text>
                  <Text weight="bold" color={lane.color}>
                    {laneItems.length}
                  </Text>
                </Box>
                <Box flexDirection="column" gap={1} marginTop={1}>
                  {laneItems.length === 0 && <Text dimColor>  (empty)</Text>}
                  {laneItems.map(item => (
                    <Box
                      key={item.workItem}
                      flexDirection="column"
                      borderStyle="round"
                      borderDimColor
                      paddingX={1}
                      width={laneWidth}
                    >
                      <Box flexDirection="row">
                        <Text color={lane.color}>● </Text>
                        <Text weight="bold">{item.workItem}</Text>
                      </Box>
                      <Text dimColor>
                        {item.workflowId} · {stageSummary(item.latest)}
                      </Text>
                      {item.latestNote && <Text dimColor>{truncate(item.latestNote, noteBudget)}</Text>}
                      <Box flexDirection="row" justifyContent="space-between">
                        <Text dimColor>{formatElapsed(item.lastTimestamp)}</Text>
                        {item.citationCount > 0 && <Text dimColor>{item.citationCount} cited</Text>}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    )
  })
}
