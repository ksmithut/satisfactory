# satisfactory

This has been a playground for me to play around with satisfactory recipes and
factory planning. It's far from comprehensive, but it helps in designing
factories for specific items.

## Installation

```sh
yarn # npm install will work, just don't commit the package-lock.json
```

There isn't a CLI or interactive way to playing around with this yet. I really
just wanted something I could refer to quickly and add new recipes as I get
them.

I use `src/index.ts` to do my planning. I import the `items`, `baseRecipes` and
`alternateRecipes` from `src/definitions.ts`, then I use `planFactory()` and
`renderFactory()` to print out the requirements for a factory to build a given
item. Take a look at `src/index.ts` to see what's going on there.

## Build

```sh
yarn build
```

## Run

```sh
yarn start
```

## Development

```sh
# No need to build for this
yarn start:dev
```
