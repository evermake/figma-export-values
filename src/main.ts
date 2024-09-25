import { exportTextStyles } from './exporters/text-styles'
import { exportVariables } from './exporters/variables'

async function main(): Promise<string> {
  let resolve: (message: string) => void
  const promise = new Promise<string>((res) => {
    resolve = res
  })
  figma.ui.onmessage = (message) => {
    if (message.type === 'downloaded')
      resolve(`✅ Exported as "${message.name}"`)
  }

  figma.showUI(__uiFiles__.download, {
    title: 'Export',
    width: 200,
    height: 100,
    themeColors: true,
  })

  switch (figma.command) {
    case 'variables': {
      figma.ui.postMessage({
        type: 'download',
        name: 'variables.json',
        payload: await exportVariables(),
      })
      break
    }
    case 'text-styles': {
      figma.ui.postMessage({
        type: 'download',
        name: 'text-styles.json',
        payload: await exportTextStyles(),
      })
      break
    }
    default: throw new Error('No command specified')
  }

  return promise
}

main()
  .then(figma.closePlugin)
  .catch(err => figma.closePlugin(`❌ Error: ${err}`))
