
/**
 * 
 * @param storage 
 * @param key 
 * @param value Serializable value will be stringyfied
 * @returns 
 */
export const saveToLocalStorage = (storage: Map<string, string>, key: string, value: unknown) => {
  try {
    const serialized = JSON.stringify(value)
    storage.set(key, serialized)
    return 'completed'
  } catch (e) {
    console.error(e)
    return 'error'
  }
}

export const getFromStorage = (storage: Map<string, string>, key: string, defaultValue: string) => {
  return storage.get(key) ?? defaultValue
}