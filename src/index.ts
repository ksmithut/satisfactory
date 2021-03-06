import { items, baseRecipes, alternateRecipes } from './definitions'
import { planFactory, renderFactory } from './factory'

const renderHeader = (string: string) => {
  const title = `----- ${string} -----`
  const separator = '-'.repeat(title.length)
  return [separator, title, separator].join('\n')
}

const createFactoryPrinter = (recipes: Recipe[]) => {
  return (item: Item, quantity?: number) => {
    console.log(renderHeader(`${item.name} Factory`))
    console.log()
    console.log(renderFactory(planFactory(item, recipes, quantity)))
    console.log()
  }
}

const recipes = baseRecipes.concat([alternateRecipes.screw])
const printFactory = createFactoryPrinter(recipes)

// printFactory(items.motor)
// printFactory(items.quickwire)

printFactory(items.reinforcedIronPlate, 15)
