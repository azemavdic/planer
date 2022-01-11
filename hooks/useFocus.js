import { useRef } from 'react'

export const useFocus = () => {
  const htmlRef = useRef(null)
  const setFocus = () => {
    htmlRef.current && htmlRef.current.focus()
  }
  return [htmlRef, setFocus]
}
