# Modern express.js with TypeScript

A minimal boilerplate for building express.js application with TypeScript and yarn PnP. Why yarn PnP? Because it is fast and modern package manager.

It also use Rollup.js to bundle the application for production. I create `bin` folder to store some script to run the application.

It use:
- TypeScript
- express.js
- Node.js (ESM module)
- Rollup.js
- Yarn PnP (No `node_modules`)


## How to setup

Install [yarn](https://yarnpkg.com/getting-started/install)

```bash
# Install corepack if you don't have it
> npm install -g corepack
# Set yarn to stable version
> yarn set version stable
# Install dependencies
> yarn install
```

Enable [Editor Sdks for yarn](https://yarnpkg.com/getting-started/editor-sdks)

```bash
> yarn dlx @yarnpkg/sdks vscode
```

## How to run

```bash
# Build the project
> yarn build
# Run the project
> yarn start
```

