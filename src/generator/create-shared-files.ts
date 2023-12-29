import { GluegunToolbox } from 'gluegun'

export const createSharedFiles = async (
  toolbox: GluegunToolbox
): Promise<void> => {
  const {
    parameters,
    template: { generate },
    print: { success, info },
  } = toolbox

  const name = parameters.first
  const verbose = parameters.options.v || parameters.options.verbose

  await generate({
    template: 'shared/domain/decorator/index.ts.ejs',
    target: `${name}/src/context/shared/domain/decorator/index.ts`,
  })
  await generate({
    template: 'shared/domain/decorator/validate.ts.ejs',
    target: `${name}/src/context/shared/domain/decorator/validate.ts`,
  })

  await generate({
    template: 'shared/domain/helpers/http.ts.ejs',
    target: `${name}/src/context/shared/domain/helpers/http.ts`,
  })
  await generate({
    template: 'shared/domain/helpers/index.ts.ejs',
    target: `${name}/src/context/shared/domain/helpers/index.ts`,
  })

  info(' 7 - Generated shared files')

  if (verbose) {
    success(`
  ${name}
    └── src
        └── context
            └── shared
                └── domain
                    ├── decorator
                    │   ├── index.ts
                    │   └── validate.ts
                    └── helpers
                        ├── http.ts
                        └── index.ts
  `)
  }
}
