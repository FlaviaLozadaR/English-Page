import * as React from "react"
import { cn } from "@/shared/lib/cn"

function Card(props: React.ComponentProps<"div">) {
  return (
    <div
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border"
      {...props}
    />
  )
}

function CardHeader(props: React.ComponentProps<"div">) {
  return (
    <div
      className="grid auto-rows-min grid-rows-[auto_auto] gap-1.5 px-6 pt-6"
      {...props}
    />
  )
}

function CardTitle(props: React.ComponentProps<"h4">) {
  return <h4 className="leading-none" {...props} />
}

function CardDescription(props: React.ComponentProps<"p">) {
  return <p className="text-muted-foreground" {...props} />
}

function CardContent(props: React.ComponentProps<"div">) {
  return <div className="px-6" {...props} />
}

function CardFooter(props: React.ComponentProps<"div">) {
  return <div className="flex items-center px-6 pb-6" {...props} />
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
}
