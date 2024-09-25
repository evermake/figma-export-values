import type { ExportResultVariables, Variable, VariableCollection } from '../types'
import { setsEqual } from '../utils'

export async function exportVariables(): Promise<ExportResultVariables> {
  const variables = await figma.variables.getLocalVariablesAsync()
  const figmaCollections = await figma.variables.getLocalVariableCollectionsAsync()

  const collections: VariableCollection[] = []
  for (const collection of figmaCollections) {
    const leftIds = new Set(collection.variableIds)
    const collectionVars = variables.filter((v) => {
      if (v.variableCollectionId !== collection.id)
        return false

      if (leftIds.delete(v.id))
        return true

      throw new Error(`Wrong connection between variable "${v.name}" and collection "${collection.name}"`)
    })

    if (leftIds.size !== 0)
      throw new Error(`Not all variables loaded for collection ${collection.name}`)

    const collectionModeIds = new Set(collection.modes.map(({ modeId }) => modeId))

    collections.push({
      id: collection.id,
      name: collection.name,
      defaultModeId: collection.defaultModeId,
      modes: collection.modes.map(({ modeId: id, name }) => ({ id, name })),
      variables: collectionVars.map((v): Variable => {
        const type = (() => {
          switch (v.resolvedType) {
            case 'BOOLEAN': return 'boolean'
            case 'COLOR': return 'color'
            case 'FLOAT': return 'float'
            case 'STRING': return 'string'
          }
        })()

        const varModeIds = new Set(Object.keys(v.valuesByMode))
        if (!setsEqual(varModeIds, collectionModeIds))
          throw new Error(`Mismatch of variable "${v.name}" modes and collection "${collection.name}" modes`)

        const validValueForMode = (modeId: string): Variable['values'][string] => {
          const value = v.valuesByMode[modeId]

          if (value == null) {
            const modeName = collection.modes.find(({ modeId: id }) => modeId === id)!.name
            throw new Error(`Value of the variable "${v.name}" is undefined for mode "${modeName}"`)
          }

          if (typeof value === 'boolean' && type === 'boolean')
            return value

          if (typeof value === 'number' && type === 'float')
            return value

          if (typeof value === 'string' && type === 'string')
            return value

          if (typeof value === 'object' && type === 'color') {
            if ('type' in value && value.type === 'VARIABLE_ALIAS')
              throw new Error('Variable aliasing is not supported')

            if ('r' in value)
              return value
          }

          throw new Error(`Cannot match variable type "${type}" with value ${value}`)
        }

        return {
          id: v.id,
          name: v.name,
          description: v.description,
          type,
          values: Object.fromEntries(Object.keys(v.valuesByMode).map(modeId => [modeId, validValueForMode(modeId)])) as any,
        }
      }),
    })
  }

  return { collections }
}
