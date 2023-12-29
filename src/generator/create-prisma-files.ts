import { GluegunToolbox } from 'gluegun'
import { getProps, prismaProps } from '../utils/functions'

export const createPrismaFiles = async (
  toolbox: GluegunToolbox
): Promise<void> => {
  const {
    parameters,
    template: { generate },
    print: { success, info },
  } = toolbox

  const name = parameters.first
  const verbose = parameters.options.v || parameters.options.verbose
  const path = parameters.options.p || parameters.options.path
  const schema = path || `${process.cwd()}/schema.txt`

  const proprierties = await getProps(schema)

  await generate({
    template: 'prisma/schema.prisma.ejs',
    target: `${name}/prisma/schema.prisma`,
    props: await prismaProps(name, proprierties),
  })

  info(' 3 - Generated prisma files')

  if (verbose) {
    success(`
  ${name}        
    └── prisma
        └── schema.prisma
  `)
  }
}
