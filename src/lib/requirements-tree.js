'use strict'

const renderTree = require('./render-tree')

/**
 * @typedef {object} InputRequirementFrom
 * @property {number} quantity
 * @property {string} item
 */

/**
 * @typedef {object} InputRequirement
 * @property {string?} machine
 * @property {string} item
 * @property {number} quantity
 * @property {InputRequirementFrom[]} from
 */

/**
 * @typedef {object} RequirementsTree
 * @property {string?} machine
 * @property {number} machineQuantity
 * @property {string} item
 * @property {number} output
 * @property {number} leftover
 * @property {RequirementsTree[]} requirements
 */

/**
 * @param {InputRequirement[]} requirements
 * @param {string} itemNeeded
 * @param {number} quantityNeeded
 * @return {RequirementsTree}
 */
function buildRequirementsTree (requirements, itemNeeded, quantityNeeded) {
  const possibleRequirements = requirements.filter(
    requirement => requirement.item === itemNeeded
  )
  const requirement = possibleRequirements[possibleRequirements.length - 1]
  if (!requirement) throw new Error('not found')
  const requiredMachines = Math.ceil(quantityNeeded / requirement.quantity)
  const totalOutput = requiredMachines * requirement.quantity
  const leftover = totalOutput % quantityNeeded
  const children = requirement.from.map(sub => {
    return buildRequirementsTree(
      requirements,
      sub.item,
      sub.quantity * requiredMachines
    )
  })
  return {
    machine: requirement.machine,
    machineQuantity: requiredMachines,
    item: requirement.item,
    output: totalOutput,
    leftover,
    requirements: children
  }
}

/**
 * @param {InputRequirement[]} requirements
 * @param {string} itemNeeded
 * @param {number} quantityNeeded
 */
function renderRequirements (tree, item, quantity) {
  return renderTree(tree, {
    renderItem: ({ machine, machineQuantity, item, output, leftover }) =>
      `${machine ||
        ''} x ${machineQuantity} (${item}) output: ${output} leftover: ${leftover}`,
    getChildren: obj => obj.requirements
  })
}

exports.render = renderRequirements
exports.build = buildRequirementsTree
