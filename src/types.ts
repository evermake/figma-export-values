export type ExportResultVariables = {
  collections: VariableCollection[]
}

export type ExportResultTextStyles = {
  styles: TextStyle[]
}

export type ExportResultEffectStyles = {
  styles: EffectStyle[]
}

export type VariableCollection = {
  id: string
  name: string
  defaultModeId: string
  modes: VariableMode[]
  variables: Variable[]
}

export type VariableMode = {
  id: string
  name: string
}

export type Variable =
  | BaseVariable<'boolean', boolean>
  | BaseVariable<'float', number>
  | BaseVariable<'string', string>
  | BaseVariable<'color', Color>

type BaseVariable<T extends string, V> = {
  /** Unique identifier of the variable. */
  id: string

  /** Name of the variable. */
  name: string

  /** Description of the variable. */
  description: string

  /** Data type of the variable. */
  type: T

  /** Value of the variable for each mode ID. */
  values: Record<string, V>
}

export type Color = {
  r: number
  g: number
  b: number
  a?: number
}

export type TextStyle = BaseStyle & {
  font: {
    family: string
    style: string
  }
  size: number
  tracking:
    | { unit: 'px', value: number }
    | { unit: '%', value: number }
  leading:
    | 'auto'
    | { unit: 'px', value: number }
    | { unit: '%', value: number }
}

/**
 * @see https://www.figma.com/plugin-docs/api/Effect/
 */
export type EffectStyle = BaseStyle & {
  effects: Effect[]
}

export type Effect =
  | EffectDropShadow
  | EffectInnerShadow
  | EffectLayerBlur
  | EffectBackgroundBlur

export type EffectDropShadow = {
  type: 'DROP_SHADOW'
  color: Color
  offset: Vector
  radius: number
  spread?: number
  visible: boolean
  blendMode: BlendMode
}

export type EffectInnerShadow = Omit<EffectDropShadow, 'type'> & { type: 'INNER_SHADOW' }

export type EffectLayerBlur = {
  type: 'LAYER_BLUR'
  radius: number
  visible: boolean
}

export type EffectBackgroundBlur = Omit<EffectLayerBlur, 'type'> & { type: 'BACKGROUND_BLUR' }

export type BaseStyle = {
  id: string
  name: string
  description: string
}

export type Vector = {
  x: number
  y: number
}

export type BlendMode =
  | 'PASS_THROUGH'
  | 'NORMAL'
  | 'DARKEN'
  | 'MULTIPLY'
  | 'LINEAR_BURN'
  | 'COLOR_BURN'
  | 'LIGHTEN'
  | 'SCREEN'
  | 'LINEAR_DODGE'
  | 'COLOR_DODGE'
  | 'OVERLAY'
  | 'SOFT_LIGHT'
  | 'HARD_LIGHT'
  | 'DIFFERENCE'
  | 'EXCLUSION'
  | 'HUE'
  | 'SATURATION'
  | 'COLOR'
  | 'LUMINOSITY'
