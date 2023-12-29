import { GluegunToolbox } from 'gluegun'
import { capitalizeName } from '../utils/functions'

export const createDebugFiles = async (
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
    template: '/.vscode/launch.json.ejs',
    target: `${name}/.vscode/launch.json`,
    props: {
      name,
      nameCapitalize,
    },
  })

  await generate({
    template: '/.vscode/settings.json.ejs',
    target: `${name}/.vscode/settings.json`,
  })

  info(' 2 - Generated .vscode files')

  if (verbose) {
    success(`
  ${name}
    └── .vscode
        ├── launch.json
        └── settings.json
  `)
  }
}
