// ┘ └ ┌ ┐
// │ ─
// ┬ ┴ ├ ┤ ┼

export function renderTree<T> (
  tree: T,
  renderItem: (item: T) => string,
  getChildren: (item: T) => T[]
) {
  const prefix = (index: number, isLast: boolean) => {
    if (index === 0) return isLast ? '└─ ' : '├─ '
    return isLast ? '   ' : '│  '
  }
  const _renderTree = (root: T): string[] => {
    const rootLines = [`${renderItem(root)}`]
    return getChildren(root).reduce((lines, child, index, children) => {
      const last = index === children.length - 1
      return lines.concat(
        _renderTree(child).map((line, i) => prefix(i, last) + line)
      )
    }, rootLines)
  }
  return _renderTree(tree).join('\n')
}
