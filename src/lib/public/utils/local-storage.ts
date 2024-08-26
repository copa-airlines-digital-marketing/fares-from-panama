
/**
 * 
 * @param storage 
 * @param key 
 * @param value Serializable value will be stringyfied
 * @returns 
 */
export const saveToLocalStorage = (storage: typeof localStorage, key: string, value: string) => {
  try {
    const serialized = JSON.stringify(value)
    storage.setItem(key, serialized)
    return 'completed'
  } catch (e) {
    console.error(e)
    return 'error'
  }
}

export const getFromStorage = (storage: typeof localStorage, key: string, defaultValue: string) => {
  return storage.getItem(key) ?? defaultValue
}