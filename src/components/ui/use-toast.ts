import { useState, useEffect, useCallback } from 'react'

type ToastType = {
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const addToast = useCallback((toast: ToastType) => {
    setToasts((prevToasts) => [...prevToasts, toast])
  }, [])

  const removeToast = useCallback((index: number) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index))
  }, [])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(0)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [toasts, removeToast])

  return { toast: addToast, toasts, removeToast }
}