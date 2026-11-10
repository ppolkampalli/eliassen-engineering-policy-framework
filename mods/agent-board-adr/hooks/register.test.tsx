import { expect, test } from 'claude-code/testing'

const PANE = {
  plugin: 'agent-board-adr',
  component: 'Pane',
  requestId: 'agent-board-adr',
  props: {
    title: 'ADR Records',
    isFocused: false,
    bodyColumns: 80,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 24 },
    view: {},
  },
} as const

const SAMPLE_ADR = '# ADR-0001: Sample\n\n- **Status:** ACCEPTED\n- **Date:** 2026-01-01\n\n## Context\n\nSample body.\n'

test('lists ADR records found under docs/adr', async ($, on) => {
  on('command.register', () => ({ value: { command: 'board-adr' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('fs.list', (_, e) => {
    expect(e.path.endsWith('docs/adr')).toBe(true)

    return { value: [{ name: '0001-sample.md', kind: 'file', size: 100, mtimeMs: 1, isLink: false }] }
  })
  on('fs.read', () => ({ value: SAMPLE_ADR }))

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })

  const row = await ui.find({ type: 'Text', text: /0001-sample\.md/ })
  expect(row?.text).toBeTruthy()
  await ui.unmount()
})

test('shows a diagnostic, not a silently empty board, when the directory has no entries', async ($, on) => {
  on('command.register', () => ({ value: { command: 'board-adr' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('fs.list', () => ({ value: [] }))

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })

  const diag = await ui.find({ type: 'Text', text: /0 entries/ })
  expect(diag?.text).toBeTruthy()
  await ui.unmount()
})

test('skips a non-.md entry and an unreadable .md file without failing the whole load', async ($, on) => {
  on('command.register', () => ({ value: { command: 'board-adr' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('fs.list', () => ({
    value: [
      { name: 'README.md', kind: 'file', size: 10, mtimeMs: 1, isLink: false },
      { name: 'not-markdown.txt', kind: 'file', size: 10, mtimeMs: 1, isLink: false },
      { name: 'broken.md', kind: 'file', size: 10, mtimeMs: 1, isLink: false },
    ],
  }))
  on('fs.read', (_, e) => {
    if (e.path.endsWith('broken.md')) return { deny: 'simulated read failure' }

    return { value: SAMPLE_ADR }
  })

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })

  const row = await ui.find({ type: 'Text', text: /^README\.md$/ })
  expect(row?.text).toBeTruthy()
  const brokenRow = await ui.find({ type: 'Text', text: /broken\.md/ })
  expect(brokenRow).toBeUndefined()
  await ui.unmount()
})
