import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "@/shared/lib/cn"

function Drawer(
  props: React.ComponentProps<typeof DrawerPrimitive.Root>
) {
  return <DrawerPrimitive.Root {...props} />
}

function DrawerTrigger(
  props: React.ComponentProps<typeof DrawerPrimitive.Trigger>
) {
  return <DrawerPrimitive.Trigger {...props} />
}

function DrawerPortal(
  props: React.ComponentProps<typeof DrawerPrimitive.Portal>
) {
  return <DrawerPrimitive.Portal {...props} />
}

function DrawerClose(
  props: React.ComponentProps<typeof DrawerPrimitive.Close>
) {
  return <DrawerPrimitive.Close {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          "bg-background fixed z-50 flex flex-col",
          className
        )}
        {...props}
      >
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader(
  props: React.ComponentProps<"div">
) {
  return <div className="flex flex-col gap-1.5 p-4" {...props} />
}

function DrawerFooter(
  props: React.ComponentProps<"div">
) {
  return <div className="mt-auto flex flex-col gap-2 p-4" {...props} />
}

function DrawerTitle(
  props: React.ComponentProps<typeof DrawerPrimitive.Title>
) {
  return <DrawerPrimitive.Title className="font-semibold" {...props} />
}

function DrawerDescription(
  props: React.ComponentProps<typeof DrawerPrimitive.Description>
) {
  return (
    <DrawerPrimitive.Description className="text-sm text-muted-foreground" {...props} />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
}
