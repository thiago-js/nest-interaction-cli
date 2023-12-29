import { GluegunToolbox } from 'gluegun'
import { capitalizeName, getProps } from '../utils/functions'

export const createDomainFiles = async (
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
    template: 'domain/repository/repository.interface.ts.ejs',
    target: `${name}/src/context/domain/repository/${name}-repository.interface.ts`,
    props: {
      name,
      nameCapitalize,
      proprierties,
    },
  })

  await generate({
    template: 'domain/entities/entity-base.ts.ejs',
    target: `${name}/src/context/domain/entities/entity.ts`,
  })
  await generate({
    template: 'domain/entities/index.ts.ejs',
    target: `${name}/src/context/domain/entities/index.ts`,
  })

  await generate({
    template: 'domain/entities/entity.ts.ejs',
    target: `${name}/src/context/domain/entities/${name}.entity.ts`,
    props: {
      name,
      nameCapitalize,
      proprierties,
    },
  })

  await generate({
    template: 'domain/exceptions/create.exception.ts.ejs',
    target: `${name}/src/context/domain/exceptions/create-${name}.exception.ts`,
    props: {
      nameCapitalize,
    },
  })

  await generate({
    template: 'domain/exceptions/delete.exception.ts.ejs',
    target: `${name}/src/context/domain/exceptions/delete-${name}.exception.ts`,
    props: {
      nameCapitalize,
    },
  })
  await generate({
    template: 'domain/exceptions/get.exception.ts.ejs',
    target: `${name}/src/context/domain/exceptions/get-${name}.exception.ts`,
    props: {
      nameCapitalize,
    },
  })
  await generate({
    template: 'domain/exceptions/not-found.exception.ts.ejs',
    target: `${name}/src/context/domain/exceptions/not-found-${name}.exception.ts`,
    props: {
      nameCapitalize,
    },
  })
  await generate({
    template: 'domain/exceptions/open-telemetry.exception.ts.ejs',
    target: `${name}/src/context/domain/exceptions/open-telemetry.exception.ts`,
    props: {
      nameCapitalize,
    },
  })
  await generate({
    template: 'domain/exceptions/update-minimal-requirements.exception.ts.ejs',
    target: `${name}/src/context/domain/exceptions/update-minimal-requirements.exception.ts`,
    props: {
      nameCapitalize,
    },
  })
  await generate({
    template: 'domain/exceptions/update.exception.ts.ejs',
    target: `${name}/src/context/domain/exceptions/update-${name}.exception.ts`,
    props: {
      nameCapitalize,
    },
  })
  await generate({
    template: 'domain/interceptor/open-telemetry.interceptor.ts.ejs',
    target: `${name}/src/context/domain/interceptor/open-telemetry.interceptor.ts`,
  })

  await generate({
    template: 'domain/query/get-by-code.query.ts.ejs',
    target: `${name}/src/context/domain/query/get-${name}-by-code.query.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: 'domain/query/get-by-id.query.ts.ejs',
    target: `${name}/src/context/domain/query/get-${name}-by-id.query.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: 'domain/query/get-by-params.query.ts.ejs',
    target: `${name}/src/context/domain/query/get-${name}-by-params.query.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: 'domain/command/create.command.ts.ejs',
    target: `${name}/src/context/domain/command/create-${name}.command.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: 'domain/command/delete.command.ts.ejs',
    target: `${name}/src/context/domain/command/delete-${name}.command.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: 'domain/command/update.command.ts.ejs',
    target: `${name}/src/context/domain/command/update-${name}.command.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  info(' 5 - Generated domain files')

  if (verbose) {
    success(`
  ${name}
    └── src
        └── context
            └── domain
                ├── command
                │   ├── create-${name}.command.ts
                │   ├── delete-${name}.command.ts
                │   └── update-${name}.command.ts
                ├── entities
                │   ├── ${name}.entity.ts
                │   ├── entity.ts
                │   └── index.ts
                ├── exceptions
                │   ├── create-${name}.exception.ts
                │   ├── delete-${name}.exception.ts
                │   ├── get-${name}.exception.ts
                │   ├── not-found-${name}.exception.ts
                │   ├── open-telemetry.exception.ts
                │   ├── update-${name}.exception.ts
                │   └── update-minimal-requirements.exception.ts
                ├── interceptor
                │   └── open-telemetry.interceptor.ts
                ├── query
                │   ├── get-${name}-by-code.query.ts
                │   ├── get-${name}-by-id.query.ts
                │   └── get-${name}-by-params.query.ts
                └── repository
                    └── ${name}-repository.interface.ts
  `)
  }
}
