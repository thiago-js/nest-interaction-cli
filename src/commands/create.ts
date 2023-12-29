import { GluegunToolbox } from 'gluegun'
import { createRootFiles } from '../generator/create-root-files'
import { createInfraFiles } from '../generator/create-infra-files'
import { createApplicationFiles } from '../generator/create-application-files'
import { createDomainFiles } from '../generator/create-domain-files'
import { createHandlerFiles } from '../generator/create-handlers-files'
import { createSharedFiles } from '../generator/create-shared-files'
import { createDebugFiles } from '../generator/create.debug-files'
import { createPrismaFiles } from '../generator/create-prisma-files'
import { delay, installDependencies } from '../utils/functions'
import { createTestFiles } from '../generator/create-tests-files'
import * as fs from 'fs'

module.exports = {
  name: 'create',
  description: 'Create a new project based on schema.txt',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { error: ErrorMessage, success, info },
    } = toolbox

    const delaytime = 100
    const name = parameters.first
    const currentDirectory = `${process.cwd()}/${name}`
    const path = parameters.options.p || parameters.options.path
    const schema = path || `${process.cwd()}/schema.txt`

    if (!name) {
      ErrorMessage('name project is required')
      info('')
      info('please use correct command:')
      info('> nic create <project_name>')
      return
    }

    if (!fs.existsSync(schema)) {
      ErrorMessage(`template schema on path ${schema} not found.`)
      info(``)
      info(`please pass the path of the schema file as a parameter correctly.`)
      return
    }

    info('Generate files: ')

    await delay(delaytime, () => createDebugFiles(toolbox))
    await delay(delaytime, () => createPrismaFiles(toolbox))
    await delay(delaytime, () => createApplicationFiles(toolbox))
    await delay(delaytime, () => createDomainFiles(toolbox))
    await delay(delaytime, () => createInfraFiles(toolbox))
    await delay(delaytime, () => createSharedFiles(toolbox))
    await delay(delaytime, () => createHandlerFiles(toolbox))
    await delay(delaytime, () => createRootFiles(toolbox))
    await delay(delaytime, () => createTestFiles(toolbox))
    await delay(delaytime, async () => {
      info('')
      info('installing dependencies...')

      await installDependencies(currentDirectory, ErrorMessage, success)
    })
  },
}
