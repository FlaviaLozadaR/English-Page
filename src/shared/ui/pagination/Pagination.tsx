import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"

import { cn } from "@/shared/lib/cn"
import { Button, buttonVariants } from "@/shared/ui/button"

function Pagination(props: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="mx-auto flex w-full justify-center"
      {...props}
    />
  )
}

function PaginationContent(props: React.ComponentProps<"ul">) {
  return (
    <ul className="flex flex-row items-center gap-1" {...props} />
  )
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <li {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  isActive,
  size = "icon",
  className,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious(props: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Previous page"
      size="default"
      className="gap-1 px-2.5"
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext(props: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Next page"
      size="default"
      className="gap-1 px-2.5"
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis(props: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className="flex size-9 items-center justify-center"
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
