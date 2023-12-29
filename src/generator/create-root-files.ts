import { GluegunToolbox } from 'gluegun'
import { capitalizeName } from '../utils/functions'

export const createRootFiles = async (
  toolbox: GluegunToolbox
): Promise<void> => {
  const {
    parameters,
    template: { generate },
    print: { success, info },
  } = toolbox

  const name = parameters.first
  const nameCapitalize = capitalizeName(name)
  const verbose = parameters.options.v || parameters.options.verbose

  await generate({
    template: 'root/.env',
    target: `${name}/.env`,
  })
  await generate({
    template: 'root/.npmrc',
    target: `${name}/.npmrc`,
  })

  await generate({
    template: 'root/.env',
    target: `${name}/.env`,
  })
  await generate({
    template: 'root/.npmrc',
    target: `${name}/.npmrc`,
  })
  await generate({
    template: 'root/Dockerfile',
    target: `${name}/Dockerfile`,
  })
  await generate({
    template: 'root/jest-unit.config.js',
    target: `${name}/jest-unit.config.js`,
  })
  await generate({
    template: 'root/jest.config.js',
    target: `${name}/jest.config.js`,
  })
  await generate({
    template: 'root/nest-cli.json',
    target: `${name}/nest-cli.json`,
  })
  await generate({
    template: 'root/tsconfig.build.json',
    target: `${name}/tsconfig.build.json`,
  })
  await generate({
    template: 'root/tsconfig.json',
    target: `${name}/tsconfig.json`,
  })
  await generate({
    template: 'root/webpack.config.js',
    target: `${name}/webpack.config.js`,
  })
  await generate({
    template: 'root/package.json.ejs',
    target: `${name}/package.json`,
    props: {
      name,
    },
  })
  await generate({
    template: 'root/serverless.yaml.ejs',
    target: `${name}/serverless.yaml`,
    props: {
      name,
    },
  })
  await generate({
    template: 'root/readme.md.ejs',
    target: `${name}/readme.md`,
    props: {
      name,
      nameCapitalize,
    },
  })

  info(' 9 - Generated root files')

  if (verbose) {
    success(`
  ${name}
    ├── .env
    ├── .npmrc
    ├── Dockerfile
    ├── Environments-RO
    ├── Environments-RW
    ├── jest-unit.config.js
    ├── jest.config.js
    ├── nest-cli.json
    ├── package.json
    ├── serverless.yaml
    ├── tsconfig.build.json
    ├── tsconfig.json
    └── webpack.config.js
  `)
  }
}
