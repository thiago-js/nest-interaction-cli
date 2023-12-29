import { GluegunToolbox } from 'gluegun'
import { capitalizeName, getProps } from '../utils/functions'

export const createApplicationFiles = async (
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
    template: 'application/create.body.request.ts.ejs',
    target: `${name}/src/context/application/controllers/request/body/create-${name}.body.request.ts`,
    props: {
      name,
      nameCapitalize,
      proprierties,
    },
  })

  await generate({
    template: 'application/update.body.request.ejs',
    target: `${name}/src/context/application/controllers/request/body/update-${name}.body.request.ts`,
    props: {
      name,
      nameCapitalize,
      proprierties,
    },
  })

  await generate({
    template: 'application/search.query.request.ts.ejs',
    target: `${name}/src/context/application/controllers/request/query/search-${name}.query.request.ts`,
    props: {
      name,
      nameCapitalize,
      proprierties,
    },
  })

  await generate({
    template: 'application/response.ts.ejs',
    target: `${name}/src/context/application/controllers/response/${name}.response.ts`,
    props: {
      name,
      nameCapitalize,
      proprierties,
    },
  })

  await generate({
    template: 'application/controller.ts.ejs',
    target: `${name}/src/context/application/controllers/${name}.controller.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  info(' 4 - Generated application files')

  if (verbose) {
    success(`
  ${name}
    └── src
        └── context
            └── application
                └── controllers
                    ├── request
                    │   ├── body
                    │   │   ├── create-${name}.body.request.ts
                    │   │   └── update-${name}.body.request.ts
                    │   └── query
                    │       └── search-${name}.query.request.ts
                    ├── response
                    │   └── ${name}.response.ts
                    └── ${name}.controller.ts
  `)
  }
}
