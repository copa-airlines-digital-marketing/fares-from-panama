export const saveToLocalStorage = (storage: typeof localStorage, key: string, value: string) => {
  return storage.setItem(key, value)
}

export const getFromStorage = (storage: typeof localStorage, key: string, defaultValue: string) => {
  return storage.getItem(key) ?? defaultValue
}