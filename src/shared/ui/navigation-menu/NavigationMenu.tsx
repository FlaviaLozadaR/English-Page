import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/shared/lib/cn"

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent transition"
)

function NavigationMenu(
  props: React.ComponentProps<typeof NavigationMenuPrimitive.Root>
) {
  return (
    <NavigationMenuPrimitive.Root
      className="relative flex max-w-max flex-1 items-center justify-center"
      {...props}
    />
  )
}

function NavigationMenuList(
  props: React.ComponentProps<typeof NavigationMenuPrimitive.List>
) {
  return (
    <NavigationMenuPrimitive.List
      className="flex flex-1 list-none items-center justify-center gap-1"
      {...props}
    />
  )
}

function NavigationMenuItem(
  props: React.ComponentProps<typeof NavigationMenuPrimitive.Item>
) {
  return <NavigationMenuPrimitive.Item {...props} />
}

function NavigationMenuTrigger({
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={navigationMenuTriggerStyle()}
      {...props}
    >
      {children}
      <ChevronDownIcon className="ml-1 size-3 transition group-data-[state=open]:rotate-180" />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent(
  props: React.ComponentProps<typeof NavigationMenuPrimitive.Content>
) {
  return (
    <NavigationMenuPrimitive.Content
      className="absolute top-full mt-2 rounded-md border bg-popover p-2 shadow-md"
      {...props}
    />
  )
}

function NavigationMenuLink(
  props: React.ComponentProps<typeof NavigationMenuPrimitive.Link>
) {
  return (
    <NavigationMenuPrimitive.Link
      className="block rounded-sm px-3 py-2 text-sm hover:bg-accent"
      {...props}
    />
  )
}

function NavigationMenuViewport(
  props: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>
) {
  return (
    <div className="absolute top-full left-0 flex justify-center">
      <NavigationMenuPrimitive.Viewport
        className="mt-2 rounded-md border bg-popover shadow"
        {...props}
      />
    </div>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
