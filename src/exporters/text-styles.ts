import type { ExportResultTextStyles, TextStyle } from '../types'

export async function exportTextStyles(): Promise<ExportResultTextStyles> {
  const figmaStyles = await figma.getLocalTextStylesAsync()
  const styles: TextStyle[] = figmaStyles.map(({
    id,
    name,
    description,
    fontSize,
    fontName,
    lineHeight,
    letterSpacing,
  }) => ({
    id,
    name,
    description,
    size: fontSize,
    font: {
      family: fontName.family,
      style: fontName.style,
    },
    leading: (() => {
      switch (lineHeight.unit) {
        case 'PIXELS': return { unit: 'px', value: lineHeight.value }
        case 'PERCENT': return { unit: '%', value: lineHeight.value }
        case 'AUTO': return 'auto'
      }
    })(),
    tracking: (() => {
      switch (letterSpacing.unit) {
        case 'PIXELS': return { unit: 'px', value: letterSpacing.value }
        case 'PERCENT': return { unit: '%', value: letterSpacing.value }
      }
    })(),
  }))

  return { styles }
}
