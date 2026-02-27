import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cn } from "@/shared/lib/cn"

function HoverCard(
  props: React.ComponentProps<typeof HoverCardPrimitive.Root>
) {
  return <HoverCardPrimitive.Root {...props} />
}

function HoverCardTrigger(
  props: React.ComponentProps<typeof HoverCardPrimitive.Trigger>
) {
  return <HoverCardPrimitive.Trigger {...props} />
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground z-50 w-64 rounded-md border p-4 shadow-md",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
}
