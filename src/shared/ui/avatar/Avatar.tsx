import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/shared/lib/cn"

function Avatar(
  props: React.ComponentProps<typeof AvatarPrimitive.Root>
) {
  return (
    <AvatarPrimitive.Root
      className="relative flex size-10 shrink-0 overflow-hidden rounded-full"
      {...props}
    />
  )
}

function AvatarImage(
  props: React.ComponentProps<typeof AvatarPrimitive.Image>
) {
  return (
    <AvatarPrimitive.Image
      className="aspect-square size-full"
      {...props}
    />
  )
}

function AvatarFallback(
  props: React.ComponentProps<typeof AvatarPrimitive.Fallback>
) {
  return (
    <AvatarPrimitive.Fallback
      className="bg-muted flex size-full items-center justify-center rounded-full"
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
