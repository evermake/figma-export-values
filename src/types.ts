export type ExportResultVariables = {
  collections: VariableCollection[]
}

export type ExportResultTextStyles = {
  styles: TextStyle[]
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

export type TextStyle = {
  id: string
  name: string
  description: string
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
