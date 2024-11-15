// 1. Import necessary dependencies
import * as React from "react"
import { cn } from "@/lib/utils"

// 2. Convert the interface to a type alias since it has no additional properties
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

// 3. Create the Input component using React.forwardRef
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // 4. Render the input element with merged classNames
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

// 5. Set display name for the Input component
Input.displayName = "Input"

// 6. Export the Input component
export { Input }
