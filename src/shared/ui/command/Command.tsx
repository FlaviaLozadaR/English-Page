import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"
import { cn } from "@/shared/lib/cn"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/shared/ui/dialog"

function Command(
  props: React.ComponentProps<typeof CommandPrimitive>
) {
  return (
    <CommandPrimitive
      className="bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md"
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search...",
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <DialogContent className="overflow-hidden p-0">
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput(
  props: React.ComponentProps<typeof CommandPrimitive.Input>
) {
  return (
    <div className="flex items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 opacity-50" />
      <CommandPrimitive.Input
        className="flex h-10 w-full bg-transparent text-sm outline-none"
        {...props}
      />
    </div>
  )
}

function CommandList(
  props: React.ComponentProps<typeof CommandPrimitive.List>
) {
  return (
    <CommandPrimitive.List
      className="max-h-[300px] overflow-y-auto"
      {...props}
    />
  )
}

function CommandEmpty(
  props: React.ComponentProps<typeof CommandPrimitive.Empty>
) {
  return (
    <CommandPrimitive.Empty
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

function CommandGroup(
  props: React.ComponentProps<typeof CommandPrimitive.Group>
) {
  return (
    <CommandPrimitive.Group
      className="p-1 text-sm"
      {...props}
    />
  )
}

function CommandSeparator(
  props: React.ComponentProps<typeof CommandPrimitive.Separator>
) {
  return (
    <CommandPrimitive.Separator
      className="bg-border h-px"
      {...props}
    />
  )
}

function CommandItem(
  props: React.ComponentProps<typeof CommandPrimitive.Item>
) {
  return (
    <CommandPrimitive.Item
      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm data-[selected=true]:bg-accent"
      {...props}
    />
  )
}

function CommandShortcut(
  props: React.ComponentProps<"span">
) {
  return (
    <span
      className="ml-auto text-xs opacity-60"
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator
}
