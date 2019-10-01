import chalk from 'chalk'
import { renderTree } from './lib/render-tree'

class ItemNotFound extends Error {
  code: string
  details: {
    item: Item
  }

  constructor (item: Item) {
    super(`${item.id} not found`)
    Error.captureStackTrace(this, this.constructor)
    this.code = 'ITEM_NOT_FOUND'
    this.details = {
      item
    }
  }
}

class TooManyAlternateRecipes extends Error {
  code: string
  details: {
    item: Item
    recipes: Recipe[]
  }

  constructor (item: Item, recipes: Recipe[]) {
    super(`${item.id} has too many alternate recipes`)
    Error.captureStackTrace(this, this.constructor)
    this.code = 'TOO_MANY_ALTERNATE_RECIPES'
    this.details = {
      item,
      recipes
    }
  }
}

class TooManyRecipes extends Error {
  code: string
  details: {
    item: Item
    recipes: Recipe[]
  }

  constructor (item: Item, recipes: Recipe[]) {
    super(`${item.id} has too many recipes`)
    Error.captureStackTrace(this, this.constructor)
    this.code = 'TOO_MANY_RECIPES'
    this.details = {
      item,
      recipes
    }
  }
}

function selectRecipe (item: Item, recipes: Recipe[]): Recipe {
  const itemRecipes = recipes.filter(
    recipe => recipe.produces.item.id === item.id
  )
  if (itemRecipes.length === 1) return itemRecipes[0]
  if (itemRecipes.length === 0) throw new ItemNotFound(item)
  const alternateRecipes = recipes.filter(recipe => recipe.alternate)
  if (alternateRecipes.length === 1) return alternateRecipes[0]
  if (alternateRecipes.length > 1) {
    throw new TooManyAlternateRecipes(item, alternateRecipes)
  }
  throw new TooManyRecipes(item, itemRecipes)
}

export function planFactory (
  item: Item,
  recipes: Recipe[],
  quantity?: QuantityPerMinute
): Factory {
  const recipe = selectRecipe(item, recipes)
  const requestedQuantity =
    quantity === undefined ? recipe.produces.quantity : quantity
  const recipeQuantity = Math.ceil(requestedQuantity / recipe.produces.quantity)
  const resourcesProduced = recipeQuantity * recipe.produces.quantity
  return {
    recipe,
    quantity: recipeQuantity,
    subFactories: recipe.consumes.map(consume =>
      planFactory(consume.item, recipes, consume.quantity * recipeQuantity)
    ),
    itemsRequested: requestedQuantity,
    itemsProduced: resourcesProduced
  }
}

export function renderFactory (factory: Factory) {
  const renderItem = (factory: Factory) => {
    const machineName = factory.recipe.machine.name
    let itemName = factory.recipe.produces.item.name
    if (factory.recipe.alternate) itemName += ' - ' + chalk.bold('ALTERNATE')
    const quantity = String(factory.quantity)
    const itemsProduced = String(factory.itemsProduced)
    const itemsRemainder = factory.itemsProduced - factory.itemsRequested
    const remainder = itemsRemainder ? `+${itemsRemainder}` : ''
    return chalk`{yellow ${quantity}} {cyan ${machineName}} {gray (${itemName})} {green ${itemsProduced}} {magenta ${remainder}}`
  }
  const getChildren = (factory: Factory) => factory.subFactories
  return renderTree<Factory>(factory, renderItem, getChildren)
}
