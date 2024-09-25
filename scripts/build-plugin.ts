import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import { rimraf } from 'rimraf'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pathTo = (p: string) => path.join(__dirname, p)

async function main() {
  await rimraf(pathTo('../plugin'))
  await build({
    entryPoints: [pathTo('../src/main.ts')],
    bundle: true,
    outfile: pathTo('../plugin/main.js'),
  })
  await fs.cp(
    pathTo('../ui'),
    pathTo('../plugin/ui'),
    { recursive: true },
  )

  const toCopy = [
    ['../manifest.json', '../plugin/manifest.json'],
    ['../README.md', '../plugin/README.md'],
    ['../LICENSE', '../plugin/LICENSE'],
  ]

  for (const [from, to] of toCopy) {
    await fs.copyFile(pathTo(from), pathTo(to))
  }

  console.log('📦 Done!')
}

await main()
