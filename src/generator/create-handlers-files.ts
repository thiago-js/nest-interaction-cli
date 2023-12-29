import { GluegunToolbox } from 'gluegun'
import { capitalizeName } from '../utils/functions'

export const createHandlerFiles = async (
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
    template: 'handlers/api/app.config.ts.ejs',
    target: `${name}/src/handlers/api/app.config.ts`,
  })

  await generate({
    template: 'handlers/api/app.module.ts.ejs',
    target: `${name}/src/handlers/api/app.module.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: 'handlers/api/handler.ts.ejs',
    target: `${name}/src/handlers/api/handler.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  info(' 8 - Generated handlers files')

  if (verbose) {
    success(`
  ${name}
    └── src
        └── handlers
            └── api
                ├── app.config.ts
                ├── app.module.ts
                └── handler.ts
  `)
  }
}
