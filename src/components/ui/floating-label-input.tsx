import React, { useState } from 'react'
import { Input } from './input'
import { Label } from './label'
import { cn } from '@/lib/utils'

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, id, type = 'text', className, ...props }, ref) => {
    // 1. State to track if the input is focused or has a value
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    // 2. Handler for input focus
    const handleFocus = () => setIsFocused(true)

    // 3. Handler for input blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value !== '')
    }

    // 4. Handler for input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value !== '')
      if (props.onChange) {
        props.onChange(e)
      }
    }

    return (
      <div className="relative">
        {/* 5. Input component */}
        <Input
          id={id}
          type={type}
          className={cn(
            "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
            className
          )}
          placeholder=" "
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        {/* 6. Floating label */}
        <Label
          htmlFor={id}
          className={cn(
            "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",
            (isFocused || hasValue) && "text-blue-600 peer-focus:text-blue-600"
          )}
        >
          {label}
        </Label>
      </div>
    )
  }
)

FloatingLabelInput.displayName = 'FloatingLabelInput'