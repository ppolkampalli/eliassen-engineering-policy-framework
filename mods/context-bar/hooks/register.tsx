import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import { formatTokens, progressBar, usageColor } from './context-model'
import type { ContextUsageSnapshot } from '../types'

const POLL_MS = 2000

const usage = atom({ plugin: 'context-bar', key: 'usage' } as const, null as ContextUsageSnapshot | null)
const isHidden = atom({ plugin: 'context-bar', key: 'isHidden' } as const, false)

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'context-bar',
      description: 'Show the context-usage band, if hidden',
    })

    const poll = async (): Promise<void> => {
      const result = await $.session.usage().catch(() => null)
      const snapshot: ContextUsageSnapshot | null = result && {
        percent: result.context.percent,
        tokens: result.context.tokens,
        window: result.context.window,
      }
      await update($, usage, () => snapshot)
    }
    await poll()
    $.clock.every(POLL_MS, poll)

    return next(e)
  })

  on('command.run', { command: 'context-bar' }, async $ => {
    await update($, isHidden, () => false)

    return { text: 'Context bar shown.' }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const hidden = await read($, isHidden)
    const snapshot = await read($, usage)

    if (hidden || !snapshot) {
      return next(e)
    }

    const { Box, Text, Button } = $.ui.resolve(e)
    const { percent, window } = snapshot
    const tokens = snapshot.tokens ?? 0
    const barWidth = Math.min(24, Math.max(10, (e.props.bodyColumns ?? 80) - 40))

    return (
      <Box flexDirection="row" justifyContent="space-between">
        <Text color={usageColor(percent)}>
          {progressBar(percent, barWidth)} {percent === undefined ? '—' : `${percent}%`} ·{' '}
          {formatTokens(tokens)}/{formatTokens(window)} tokens
        </Text>
        <Button key="hide" plain onPress={() => update($, isHidden, () => true)}>
          Hide
        </Button>
      </Box>
    )
  })
}
