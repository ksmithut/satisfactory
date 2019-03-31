'use strict'

/**
 * @param {T} tree
 * @param {{ renderItem: (item: T) => string, getChildren: (item: T) => T[] }} options
 * @return {string}
 */
function renderTree (tree, { renderItem, getChildren } = {}) {
  function _renderTree (root) {
    return getChildren(root).reduce(
      (lines, child, i, children) => {
        const last = i === children.length - 1
        return lines.concat(
          _renderTree(child).map(
            (line, i) =>
              (i === 0 ? (last ? '└ ' : '├ ') : last ? '  ' : '│ ') + line
          )
        )
      },
      [`${renderItem(root)}`]
    )
  }
  return _renderTree(tree).join('\n')
}

module.exports = renderTree
