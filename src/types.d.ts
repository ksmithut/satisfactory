type ItemID = string
type MachineID = string
type Name = string
type QuantityPerMinute = number
type PowerConsumption = number
type Alternate = boolean
type Quantity = number

type Item = {
  id: ItemID
  name: Name
}

type ItemQuantity = {
  item: Item
  quantity: QuantityPerMinute
}
type ItemQuantityTuple = [Item, QuantityPerMinute]

type Machine = {
  id: MachineID
  name: Name
  powerConsumption: PowerConsumption
}

type Recipe = {
  alternate: Alternate
  machine: Machine
  produces: ItemQuantity
  consumes: ItemQuantity[]
}

type Factory = {
  recipe: Recipe
  quantity: Quantity
  subFactories: Factory[]
  itemsRequested: Quantity
  itemsProduced: Quantity
}
