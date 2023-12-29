/* eslint-disable */
import { exec } from 'child_process'
import * as fs from 'fs'

export const toCamelCase = function (str: string): string {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

export const getProps = async function (caminhoArquivo: string) {
  if (!fs.existsSync(caminhoArquivo)) {
    console.log(`\n templade schema on path ${caminhoArquivo} not found.`)
    console.log(
      `\n please pass the path of the schema file as a parameter correctly.`
    )

    process.exit(1)
  }

  const content = await fs.promises.readFile(caminhoArquivo, 'utf-8')
  const lines = content.split('\n')

  return lines.map((linha) => {
    // eslint-disable-next-line prefer-const
    let [key, type] = linha.split(':').map((s) => s.trim())
    let isOptional = false

    if (type.includes('?')) {
      isOptional = true
      type = type.replace('?', '') // Remove o '?' do tipo
    }

    return {
      nameSnakeCase: key,
      nameCamelCase: toCamelCase(key),
      type: type?.charAt(0).toUpperCase() + type.slice(1),
      isOptional,
    }
  })
}

export const prismaProps = async function (name: string, properties: any[]) {
  return {
    name,
    properties: properties.map((prop) => ({
      ...prop,
      typePrisma: prop.type.toUpperCase() === 'NUMBER' ? 'Int' : 'String',
      isUnique: `${prop.nameSnakeCase}`.includes('uid'),
    })),
  }
}

export const capitalizeName = function (str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const installDependencies = async function (
  currentDirectory: string,
  ErrorMessage: any,
  success: any
) {
  exec(`cd ${currentDirectory} && pnpm i`, (error) => {
    if (isValid(error, ' 1 - error to install dependencies with pnpm')) {
      success(' 1 - install all dependencies with success.')

      exec(`cd ${currentDirectory} && pnpm run prisma:generate`, (error) => {
        if (isValid(error, ' 2 - error to generate prisma client')) {
          success(' 2 - prisma client generated with success.')
        }
      })
    }
  })

  const isValid = (error: any, message: string) => {
    if (error) {
      ErrorMessage(message)
      return false
    }

    return true
  }
}

export function delay(ms, callback) {
  return new Promise((resolve) => setTimeout(() => resolve(callback()), ms))
}
