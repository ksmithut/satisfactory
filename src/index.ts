// import { Recipe, Item } from './types'
import { items, baseRecipes, alternateRecipes } from './definitions'
import { planFactory, renderFactory } from './factory'

const createFactoryPrinter = (recipes: Recipe[]) => {
  return (item: Item) => {
    const title = `----- ${item.name} Factory -----`
    const separator = '-'.repeat(title.length)
    const header = [separator, title, separator].join('\n')
    const factory = renderFactory(planFactory(item, recipes))
    console.log(header)
    console.log()
    console.log(factory)
    console.log()
  }
}

const recipes = baseRecipes.concat([alternateRecipes.screw])
const printFactory = createFactoryPrinter(recipes)

printFactory(items.motor)
printFactory(items.quickwire)
