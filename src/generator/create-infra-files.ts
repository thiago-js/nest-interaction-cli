import { GluegunToolbox } from 'gluegun'
import { capitalizeName, getProps } from '../utils/functions'

export const createInfraFiles = async (
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
  const path = parameters.options.p || parameters.options.path
  const schema = path || `${process.cwd()}/schema.txt`

  const proprierties = await getProps(schema)

  await generate({
    template: 'infra/logger/logger.client.ts.ejs',
    target: `${name}/src/context/infra/logger/logger.client.ts`,
    props: {
      name,
    },
  })

  await generate({
    template: 'infra/logger/adapter/winston.adapter.ts.ejs',
    target: `${name}/src/context/infra/logger/adapter/winston.adapter.ts`,
    props: {
      name,
    },
  })

  await generate({
    template: 'infra/prisma/adapter/prisma.adapter.ts.ejs',
    target: `${name}/src/context/infra/prisma/adapter/prisma.adapter.ts`,
    props: {
      name,
    },
  })

  await generate({
    template: `infra/repository/repository.ts.ejs`,
    target: `${name}/src/context/infra/${name}/repository/${name}.repository.ts`,
    props: {
      name,
      nameCapitalize,
      proprierties,
    },
  })

  info(' 6 - Generated infra files')

  if (verbose) {
    success(`
  ${name}
    └── src
         └── context
             └── infra
                  ├── ${name}
                  │   └── repository
                  │       └── ${name}.repository.ts
                  ├── logger
                  │   ├── adapter
                  │   │   └── winston.adapter.ts
                  │   └── logger.client.ts
                  └── prisma
                      └── adapter
                          └── prisma.adapter.ts
  `)
  }
}
