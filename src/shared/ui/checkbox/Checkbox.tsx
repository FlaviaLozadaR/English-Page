import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/shared/lib/cn"

function Checkbox(
  props: React.ComponentProps<typeof CheckboxPrimitive.Root>
) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer border bg-input-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground size-4 shrink-0 rounded border outline-none disabled:cursor-not-allowed disabled:opacity-50"
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
