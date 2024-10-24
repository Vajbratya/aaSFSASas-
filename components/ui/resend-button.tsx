import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ResendButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'white';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

export function ResendButton({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}: ResendButtonProps) {
  return (
    <Button
      className={cn(
        "font-medium transition-all duration-200",
        // Base styles
        "rounded hover:translate-y-[1px] active:translate-y-[2px]",
        // Variants
        variant === 'default' && "bg-[#000000] border border-[#1d1d1d] text-[#fafafa] hover:border-[#333333]",
        variant === 'outline' && "bg-transparent border border-[#1d1d1d] text-[#fafafa] hover:border-[#333333]",
        variant === 'white' && "bg-[#fafafa] text-[#000000] hover:bg-[#f0f0f0]",
        // Sizes
        size === 'default' && "h-10 px-4 py-2",
        size === 'sm' && "h-8 px-3 text-sm",
        size === 'lg' && "h-12 px-6",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
