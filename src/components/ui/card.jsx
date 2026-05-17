import { cn } from '../../lib/utils'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn('glass-panel rounded-2xl p-5 transition duration-300', className)}
      {...props}
    />
  )
}
