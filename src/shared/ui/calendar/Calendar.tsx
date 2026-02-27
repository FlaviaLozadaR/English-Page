import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import type { ChevronProps } from "react-day-picker"
import { cn } from "@/shared/lib/cn"
import { buttonVariants } from "@/shared/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "w-8 text-center text-xs",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center text-sm",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground",
        day_disabled: "opacity-50",
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation }: ChevronProps) => {
          if (orientation === "left") {
            return <ChevronLeft className={cn("size-4", className)} />
          }
          if (orientation === "right") {
            return <ChevronRight className={cn("size-4", className)} />
          }

          return (
            <ChevronRight
              className={cn(
                "size-4",
                orientation === "up" ? "rotate-90" : "-rotate-90",
                className
              )}
            />
          )
        },
      }}
      {...props}
    />
  )
}

export { Calendar }
