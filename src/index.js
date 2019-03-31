'use strict'

const { render, build } = require('./lib/requirements-tree')
const data = require('../data.json')

console.log('MOTOR')
console.log(render(build(data.requirements, 'motor', 5)))
console.log()

console.log('MODULAR_FRAME')
console.log(render(build(data.requirements, 'modular_frame', 4)))
console.log()

console.log('REINFORCED_IRON_PLATE')
console.log(render(build(data.requirements, 'reinforced_iron_plate', 15)))
console.log()
