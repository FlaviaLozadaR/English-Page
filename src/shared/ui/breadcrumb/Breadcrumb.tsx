import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/shared/lib/cn"

function Breadcrumb(props: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" {...props} />
}

function BreadcrumbList(props: React.ComponentProps<"ol">) {
  return (
    <ol
      className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm"
      {...props}
    />
  )
}

function BreadcrumbItem(props: React.ComponentProps<"li">) {
  return (
    <li
      className="inline-flex items-center gap-2"
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {

  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      className="hover:text-foreground transition-colors"
      {...props}
    />
  )
}

function BreadcrumbPage(props: React.ComponentProps<"span">) {
  return (
    <span
      aria-current="page"
      className="text-foreground font-medium"
      {...props}
    />
  )
}

function BreadcrumbSeparator(props: React.ComponentProps<"li">) {
  return (
    <li {...props}>
      <ChevronRight size={14} />
    </li>
  )
}

function BreadcrumbEllipsis(props: React.ComponentProps<"span">) {
  return (
    <span className="flex items-center justify-center">
      <MoreHorizontal size={16} />
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
}
