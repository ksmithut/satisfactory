const createItem = (id: ItemID, name: Name): Item => ({ id, name })
const createMachine = (
  id: MachineID,
  name: Name,
  powerConsumption: PowerConsumption
): Machine => ({
  id,
  name,
  powerConsumption
})
const createRecipe = (
  machine: Machine,
  produces: ItemQuantityTuple,
  consumes: ItemQuantityTuple[],
  alternate: Alternate = false
): Recipe => ({
  machine,
  produces: { item: produces[0], quantity: produces[1] },
  consumes: consumes.map(([item, quantity]) => ({ item, quantity })),
  alternate
})

export const items = {
  // Raw Bio Material
  leaves: createItem('leaves', 'Leaves'),
  wood: createItem('wood', 'Wood'),
  greenPowerSlug: createItem('green_power_slug', 'Green Power Slug'),
  mycelia: createItem('mycelia', 'Mycelia'),
  flowerPetals: createItem('flower_petals', 'Flower Petals'),
  yellowPowerSlug: createItem('yellow_power_slug', 'Yellow Power Slug'),
  alienCarapace: createItem('alien_carapace', 'Alien Carapace'),
  // Raw Materials
  ironOre: createItem('iron_ore', 'Iron Ore'),
  copperOre: createItem('copper_ore', 'Copper Ore'),
  cateriumOre: createItem('caterium_ore', 'Caterium Ore'),
  coal: createItem('coal', 'Coal'),
  limestone: createItem('limestone', 'Limestone'),
  sulfur: createItem('sulfur', 'Sulfur'),
  crudeOil: createItem('crude_oil', 'Crude Oil'),
  rawQuartz: createItem('raw_quartz', 'Raw Quartz'),
  // Materials
  ironIngot: createItem('iron_ingot', 'Iron Ingot'),
  copperIngot: createItem('copper_ingot', 'Copper Ingot'),
  cateriumIngot: createItem('caterium_ingot', 'Caterium Ingot'),
  steelIngot: createItem('steel_ingot', 'Steel Ingot'),
  ironPlate: createItem('iron_plate', 'Iron Plate'),
  ironRod: createItem('iron_rod', 'Iron Rod'),
  wire: createItem('wire', 'Wire'),
  cable: createItem('cable', 'Cable'),
  concrete: createItem('concrete', 'Concrete'),
  screw: createItem('screw', 'Screw'),
  steelBeam: createItem('steel_beam', 'Steel Beam'),
  steelPipe: createItem('steel_pipe', 'Steel Pipe'),
  spikedRebar: createItem('spiked_rebar', 'Spiked Rebar'),
  quickwire: createItem('quickwire', 'Quickwire'),
  reinforcedIronPlate: createItem(
    'reinforced_iron_plate',
    'Reinforced Iron Plate'
  ),
  rotor: createItem('rotor', 'Rotor'),
  modularFrame: createItem('modular_frame', 'Modular Frame'),
  blackPowder: createItem('black_powder', 'Black Powder'),
  encasedIndustrialBeam: createItem(
    'encased_industrial_beam',
    'Encased Industrial Beam'
  ),
  stator: createItem('stator', 'Stator'),
  motor: createItem('motor', 'Motor'),
  plastic: createItem('plastic', 'Plastic'),
  fuel: createItem('fuel', 'Fuel'),
  rubber: createItem('rubber', 'Rubber'),
  quartzCrystal: createItem('quartz_crystal', 'Quartz Crystal'),
  // Bio Material
  biomass: createItem('biomass', 'Biomass'),
  biofuel: createItem('biofuel', 'Biofuel'),
  powerShard: createItem('power_shard', 'Power Shard'),
  colorCartridge: createItem('color_cartridge', 'Color Cartridge'),
  fabric: createItem('fabric', 'Fabric')
}

export const machines = {
  mineSource: createMachine('mine_source', 'Mine Source', 0),
  oilSource: createMachine('oil_source', 'Oil Source', 0),
  manualSource: createMachine('manual_source', 'Manual Source', 0),
  smelter: createMachine('smelter', 'Smelter', 4),
  constructor: createMachine('constructor', 'Constructor', 0),
  assembler: createMachine('assembler', 'Assembler', 0),
  foundry: createMachine('foundry', 'Foundry', 0),
  oilRefinery: createMachine('oil_refinery', 'Oil Refinery', 0)
}

export const baseRecipes = [
  // Manual pickup
  createRecipe(machines.manualSource, [items.leaves, 1], []),
  createRecipe(machines.manualSource, [items.wood, 1], []),
  createRecipe(machines.manualSource, [items.greenPowerSlug, 1], []),
  createRecipe(machines.manualSource, [items.mycelia, 1], []),
  createRecipe(machines.manualSource, [items.flowerPetals, 1], []),
  createRecipe(machines.manualSource, [items.yellowPowerSlug, 1], []),
  createRecipe(machines.manualSource, [items.alienCarapace, 1], []),
  // Base Ore
  createRecipe(machines.mineSource, [items.ironOre, 1], []),
  createRecipe(machines.mineSource, [items.copperOre, 1], []),
  createRecipe(machines.mineSource, [items.cateriumOre, 1], []),
  createRecipe(machines.mineSource, [items.coal, 1], []),
  createRecipe(machines.mineSource, [items.limestone, 1], []),
  createRecipe(machines.mineSource, [items.sulfur, 1], []),
  createRecipe(machines.oilSource, [items.crudeOil, 1], []),
  // Smelter
  createRecipe(machines.smelter, [items.ironIngot, 30], [[items.ironOre, 30]]),
  createRecipe(
    machines.smelter,
    [items.copperIngot, 30],
    [[items.copperOre, 30]]
  ),
  createRecipe(
    machines.smelter,
    [items.cateriumIngot, 15],
    [[items.cateriumOre, 45]]
  ),
  // Foundry
  createRecipe(
    machines.foundry,
    [items.steelIngot, 30],
    [[items.ironOre, 45], [items.coal, 45]]
  ),
  // Constructor
  createRecipe(
    machines.constructor,
    [items.ironPlate, 15],
    [[items.ironIngot, 30]]
  ),
  createRecipe(
    machines.constructor,
    [items.ironRod, 15],
    [[items.ironIngot, 15]]
  ),
  createRecipe(
    machines.constructor,
    [items.wire, 45],
    [[items.copperIngot, 15]]
  ),
  createRecipe(machines.constructor, [items.cable, 15], [[items.wire, 30]]),
  createRecipe(
    machines.constructor,
    [items.biomass, 90],
    [[items.leaves, 150]]
  ),
  createRecipe(
    machines.constructor,
    [items.concrete, 15],
    [[items.limestone, 45]]
  ),
  createRecipe(machines.constructor, [items.screw, 90], [[items.ironRod, 15]]),
  createRecipe(machines.constructor, [items.biomass, 25], [[items.wood, 75]]),
  createRecipe(
    machines.constructor,
    [items.biofuel, 30],
    [[items.biomass, 60]]
  ),
  createRecipe(
    machines.constructor,
    [items.powerShard, 6],
    [[items.greenPowerSlug, 6]]
  ),
  createRecipe(
    machines.constructor,
    [items.biomass, 150],
    [[items.mycelia, 150]]
  ),
  createRecipe(
    machines.constructor,
    [items.colorCartridge, 75],
    [[items.flowerPetals, 37.5]]
  ),
  createRecipe(
    machines.constructor,
    [items.steelBeam, 10],
    [[items.steelIngot, 30]]
  ),
  createRecipe(
    machines.constructor,
    [items.steelPipe, 15],
    [[items.steelIngot, 15]]
  ),
  createRecipe(
    machines.constructor,
    [items.powerShard, 8],
    [[items.yellowPowerSlug, 4]]
  ),
  createRecipe(
    machines.constructor,
    [items.spikedRebar, 15],
    [[items.ironRod, 15]]
  ),
  createRecipe(
    machines.constructor,
    [items.biomass, 1500],
    [[items.alienCarapace, 15]]
  ),
  createRecipe(
    machines.constructor,
    [items.quickwire, 60],
    [[items.cateriumIngot, 15]]
  ),
  // Assembler
  createRecipe(
    machines.assembler,
    [items.reinforcedIronPlate, 5],
    [[items.ironPlate, 20], [items.screw, 120]]
  ),
  createRecipe(
    machines.assembler,
    [items.rotor, 6],
    [[items.ironRod, 18], [items.screw, 132]]
  ),
  createRecipe(
    machines.assembler,
    [items.modularFrame, 4],
    [[items.reinforcedIronPlate, 12], [items.ironRod, 24]]
  ),
  createRecipe(
    machines.assembler,
    [items.fabric, 15],
    [[items.mycelia, 15], [items.biomass, 75]]
  ),
  createRecipe(
    machines.assembler,
    [items.blackPowder, 7.5],
    [[items.coal, 7.5], [items.sulfur, 15]]
  ),
  createRecipe(
    machines.assembler,
    [items.encasedIndustrialBeam, 4],
    [[items.steelBeam, 16], [items.concrete, 20]]
  ),
  createRecipe(
    machines.assembler,
    [items.stator, 6],
    [[items.steelPipe, 18], [items.wire, 60]]
  ),
  createRecipe(
    machines.assembler,
    [items.motor, 5],
    [[items.rotor, 10], [items.stator, 10]]
  ),
  createRecipe(
    machines.oilRefinery,
    [items.plastic, 22.5],
    [[items.crudeOil, 30]]
  ),
  createRecipe(
    machines.oilRefinery,
    [items.fuel, 37.5],
    [[items.crudeOil, 60]]
  ),
  createRecipe(machines.oilRefinery, [items.rubber, 30], [[items.crudeOil, 30]])
]

export const alternateRecipes = {
  screw: createRecipe(
    machines.constructor,
    [items.screw, 90],
    [[items.ironIngot, 15]],
    true
  )
}
