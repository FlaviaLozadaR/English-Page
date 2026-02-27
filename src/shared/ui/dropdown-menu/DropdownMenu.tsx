import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { cn } from "@/shared/lib/cn"

function DropdownMenu(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>
) {
  return <DropdownMenuPrimitive.Root {...props} />
}

function DropdownMenuTrigger(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>
) {
  return <DropdownMenuPrimitive.Trigger {...props} />
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuItem(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Item>
) {
  return (
    <DropdownMenuPrimitive.Item
      className="flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>
) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className="flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm"
      {...props}
    />
  )
}

function DropdownMenuRadioGroup(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>
) {
  return <DropdownMenuPrimitive.RadioGroup {...props} />
}

function DropdownMenuRadioItem(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>
) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className="flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm"
      {...props}
    />
  )
}

function DropdownMenuLabel(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Label>
) {
  return <DropdownMenuPrimitive.Label className="px-2 py-1.5 text-sm font-medium" {...props} />
}

function DropdownMenuSeparator(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>
) {
  return <DropdownMenuPrimitive.Separator className="bg-border my-1 h-px" {...props} />
}

function DropdownMenuShortcut(
  props: React.ComponentProps<"span">
) {
  return <span className="ml-auto text-xs opacity-60" {...props} />
}

function DropdownMenuSub(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>
) {
  return <DropdownMenuPrimitive.Sub {...props} />
}

function DropdownMenuSubTrigger(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>
) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className="flex items-center px-2 py-1.5 text-sm"
      {...props}
    />
  )
}

function DropdownMenuSubContent(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>
) {
  return (
    <DropdownMenuPrimitive.SubContent
      className="bg-popover text-popover-foreground rounded-md border p-1 shadow-md"
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
}
