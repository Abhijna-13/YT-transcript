import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'h-12 w-full rounded-full border border-white/10 bg-white/8 px-5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-cyan-200/60 focus:ring-4 focus:ring-cyan-300/10',
      className,
    )}
    {...props}
  />
))

Input.displayName = 'Input'
