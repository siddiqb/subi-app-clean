// 1. Import necessary dependencies
import * as React from "react"
import { cn } from "@/lib/utils"

// 2. Convert the interface to a type alias since it has no additional properties
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

// 3. Create the Textarea component using React.forwardRef
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    // 4. Render the textarea element with merged classNames
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

// 5. Set display name for the Textarea component
Textarea.displayName = "Textarea"

// 6. Export the Textarea component
export { Textarea }