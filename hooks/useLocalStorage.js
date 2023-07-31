import { useState, useEffect } from "react"

const useLocalStorage = (key, initialValue) => {
  const isClient = typeof window !== "undefined"
  const [value, setValue] = useState(() => {
    const item = isClient ? window.localStorage.getItem(key) : null
    return item ? JSON.parse(item) : initialValue
  })
  useEffect(() => {
    if (isClient) {
      const item = JSON.stringify(value)
      window.localStorage.setItem(key, item)
      console.log("⚪ useLocalStorage useEffect", key, item)
      console.log("⚪ Actual LocalStorage", window.localStorage.getItem(key))
    }
  }, [value])
  return [value, setValue]
}

export default useLocalStorage
