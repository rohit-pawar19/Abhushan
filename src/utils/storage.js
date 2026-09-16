export function readStorage(key, fallback, storageName = 'localStorage') {
  try {
    return JSON.parse(window[storageName].getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}
