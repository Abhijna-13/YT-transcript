import { cloneElement, forwardRef, isValidElement } from 'react'
import { cn } from '../../lib/utils'

const variants = {
  primary:
    'bg-cyan-300 text-slate-950 shadow-glow hover:bg-cyan-200 focus-visible:ring-cyan-300',
  secondary:
    'border border-white/12 bg-white/8 text-white hover:border-white/25 hover:bg-white/12 focus-visible:ring-white/40',
  ghost: 'text-muted-foreground hover:bg-white/8 hover:text-foreground focus-visible:ring-white/30',
}

export const Button = forwardRef(({ asChild, children, className, variant = 'primary', ...props }, ref) => {
  const classes = cn(
      'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition duration-300 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
      variants[variant],
      className,
    )

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ref,
      className: cn(classes, children.props.className),
      ...props,
    })
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'
