import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { cn } from "@/shared/lib/cn"

function Menubar(props: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      className="bg-background flex h-9 items-center gap-1 rounded-md border p-1"
      {...props}
    />
  )
}

function MenubarMenu(props: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarTrigger(
  props: React.ComponentProps<typeof MenubarPrimitive.Trigger>
) {
  return (
    <MenubarPrimitive.Trigger
      className="flex items-center rounded-sm px-2 py-1 text-sm font-medium hover:bg-accent"
      {...props}
    />
  )
}

function MenubarContent(
  props: React.ComponentProps<typeof MenubarPrimitive.Content>
) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        className="bg-popover text-popover-foreground z-50 min-w-[12rem] rounded-md border p-1 shadow-md"
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
}

function MenubarItem(props: React.ComponentProps<typeof MenubarPrimitive.Item>) {
  return (
    <MenubarPrimitive.Item
      className="flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
      {...props}
    />
  )
}

function MenubarSeparator(
  props: React.ComponentProps<typeof MenubarPrimitive.Separator>
) {
  return <MenubarPrimitive.Separator className="bg-border my-1 h-px" {...props} />
}

function MenubarLabel(
  props: React.ComponentProps<typeof MenubarPrimitive.Label>
) {
  return <MenubarPrimitive.Label className="px-2 py-1.5 text-sm font-medium" {...props} />
}

function MenubarGroup(props: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarCheckboxItem({
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      className="relative flex items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm hover:bg-accent"
      {...props}
    >
      <span className="absolute left-2">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioGroup(
  props: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>
) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarRadioItem({
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      className="relative flex items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm hover:bg-accent"
      {...props}
    >
      <span className="absolute left-2">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarShortcut(props: React.ComponentProps<"span">) {
  return <span className="ml-auto text-xs opacity-60" {...props} />
}

function MenubarSub(props: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub {...props} />
}

function MenubarSubTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger>) {
  return (
    <MenubarPrimitive.SubTrigger
      className={cn(
        "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent(
  props: React.ComponentProps<typeof MenubarPrimitive.SubContent>
) {
  return (
    <MenubarPrimitive.SubContent
      className="bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-md"
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
