import type { Effect, EffectStyle, ExportResultEffectStyles } from '../types'

export async function exportEffectStyles(): Promise<ExportResultEffectStyles> {
  const figmaStyles = await figma.getLocalEffectStylesAsync()
  const styles: EffectStyle[] = figmaStyles.map(({
    id,
    name,
    description,
    effects,
  }) => ({
    id,
    name,
    description,
    effects: effects.map((eff): Effect => {
      switch (eff.type) {
        case 'DROP_SHADOW':
          return {
            type: 'DROP_SHADOW',
            offset: eff.offset,
            radius: eff.radius,
            spread: eff.spread,
            color: eff.color,
            blendMode: eff.blendMode,
            visible: eff.visible,
          }
        case 'INNER_SHADOW':
          return {
            type: 'INNER_SHADOW',
            offset: eff.offset,
            radius: eff.radius,
            spread: eff.spread,
            color: eff.color,
            blendMode: eff.blendMode,
            visible: eff.visible,
          }
        case 'LAYER_BLUR':
          return {
            type: 'LAYER_BLUR',
            radius: eff.radius,
            visible: eff.visible,
          }
        case 'BACKGROUND_BLUR':
          return {
            type: 'BACKGROUND_BLUR',
            radius: eff.radius,
            visible: eff.visible,
          }
        default: throw new Error(`unknown effect: "${eff satisfies never}"`)
      }
    }),
  }))

  return { styles }
}
