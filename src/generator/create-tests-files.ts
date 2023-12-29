import { GluegunToolbox } from 'gluegun'
import { capitalizeName, getProps } from '../utils/functions'

export const createTestFiles = async (
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

  const properties = await getProps(schema)

  await generate({
    template: '/test/unit/fixture/fixture.ts.ejs',
    target: `${name}/test/unit/fixture/${name}.fixture.ts`,
    props: {
      name,
      nameCapitalize,
      properties,
    },
  })

  await generate({
    template: '/test/unit/app-test-RO.module.ts.ejs',
    target: `${name}/test/unit/app-test-RO.module.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/test/unit/app-test-RW.module.ts.ejs',
    target: `${name}/test/unit/app-test-RW.module.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/test/unit/app-test.config.ts.ejs',
    target: `${name}/test/unit/app-test.config.ts`,
  })

  await generate({
    template: '/test/unit/jest-unit.setup.ts.ejs',
    target: `${name}/test/unit/jest-unit.setup.ts`,
  })

  await generate({
    template: '/test/unit/interceptor/open-telemetry.interceptor.spec.ts.ejs',
    target: `${name}/test/unit/interceptor/open-telemetry.interceptor.spec.ts`,
  })

  // command

  await generate({
    template: '/test/unit/command/create.command.spec.ts.ejs',
    target: `${name}/test/unit/command/create-${name}.command.spec.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/test/unit/command/delete.command.spec.ts.ejs',
    target: `${name}/test/unit/command/delete-${name}.command.spec.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/test/unit/command/update.command.spec.ts.ejs',
    target: `${name}/test/unit/command/update-${name}.command.spec.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/test/unit/response/response.spec.ts.ejs',
    target: `${name}/test/unit/response/${name}-response.spec.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/test/unit/query/get-by-code.query.spec.ts.ejs',
    target: `${name}/test/unit/query/get-${name}-by-code.query.spec.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/test/unit/query/get-by-id.query.spec.ts.ejs',
    target: `${name}/test/unit/query/get-${name}-by-id.query.spec.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/test/unit/query/get-by-params.query.spec.ts.ejs',
    target: `${name}/test/unit/query/get-${name}-by-params.query.spec.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/test/unit/controller/controller.spec.ts.ejs',
    target: `${name}/test/unit/controller/${name}.controller.spec.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/test/unit/controller/RO.controller.spec.ts.ejs',
    target: `${name}/test/unit/controller/${name}-RO.controller.spec.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/test/unit/controller/RW.controller.spec.ts.ejs',
    target: `${name}/test/unit/controller/${name}-RW.controller.spec.ts`,
    props: {
      name,
      nameCapitalize,
    },
  })

  info(' 10 - Generated Tests files')

  if (verbose) {
    success(`
    test
      └── unit
          ├── command
          │   ├── create-${name}.command.spec.ts
          │   ├── delete-${name}.command.spec.ts
          │   └── update-${name}.command.spec.ts
          ├── controller
          │   ├── ${name}-RO.controller.spec.ts
          │   ├── ${name}-RW.controller.spec.ts
          │   └── ${name}.controller.spec.ts
          ├── fixture
          │   └── ${name}.fixture.ts
          ├── interceptor
          │   └── open-telemetry.interceptor.spec.ts
          ├── query
          │   ├── get-${name}-by-id.query.spec.ts
          │   └── get-${name}s-by-params.query.spec.ts
          ├── response
          │   └── ${name}.response.spec.ts
          ├── app-test-RO.module.ts
          ├── app-test-RW.module.ts
          ├── app-test.config.ts
          └── jest-unit.setup.ts
  `)
  }
}
