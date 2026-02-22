'use client'

import * as React from 'react'
import type { DialogProps } from '@radix-ui/react-dialog'
import { SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type CommandProps = React.ComponentPropsWithoutRef<'div'> & {
  shouldFilter?: boolean
  filter?: (value: string, search: string) => number
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  loop?: boolean
  disablePointerSelection?: boolean
}

const CommandContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
}>({
  value: '',
  onValueChange: () => {},
})

function Command({
  className,
  children,
  value: valueProp,
  onValueChange,
  defaultValue,
  ...props
}: CommandProps) {
  const [value, setValue] = React.useState(defaultValue ?? '')
  const [CommandPrimitive, setCommandPrimitive] = React.useState<any>(null)

  React.useEffect(() => {
    import('cmdk').then((mod) => setCommandPrimitive(() => mod.Command))
  }, [])

  const currentValue = valueProp ?? value
  const handleValueChange = onValueChange ?? setValue

  if (!CommandPrimitive) {
    return <div className={cn('flex h-full w-full', className)} {...props} />
  }

  return (
    <CommandContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
      }}
    >
      <CommandPrimitive
        data-slot="command"
        className={cn(
          'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
          className,
        )}
        value={currentValue}
        onValueChange={handleValueChange}
        {...props}
      >
        {children}
      </CommandPrimitive>
    </CommandContext.Provider>
  )
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: DialogProps & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn('overflow-hidden p-0', className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[data-slot=command-input-wrapper]]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

type CommandInputProps = React.ComponentPropsWithoutRef<'input'> & {
  value?: string
  onValueChange?: (value: string) => void
}

function CommandInput({ className, ...props }: CommandInputProps) {
  const [Input, setInput] = React.useState<any>(null)

  React.useEffect(() => {
    import('cmdk').then((mod) => setInput(() => mod.Command.Input))
  }, [])

  if (!Input) {
    return (
      <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
        <SearchIcon className="size-4 shrink-0 opacity-50" />
        <input
          className={cn(
            'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        />
      </div>
    )
  }

  return (
    <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <Input
        data-slot="command-input"
        className={cn(
          'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [List, setList] = React.useState<any>(null)

  React.useEffect(() => {
    import('cmdk').then((mod) => setList(() => mod.Command.List))
  }, [])

  if (!List) {
    return <div className={cn('overflow-hidden', className)} {...props} />
  }

  return (
    <List
      data-slot="command-list"
      className={cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', className)}
      {...props}
    />
  )
}

function CommandEmpty(props: React.ComponentPropsWithoutRef<'div'>) {
  const [Empty, setEmpty] = React.useState<any>(null)

  React.useEffect(() => {
    import('cmdk').then((mod) => setEmpty(() => mod.Command.Empty))
  }, [])

  if (!Empty) {
    return null
  }

  return <Empty data-slot="command-empty" className="py-6 text-center text-sm" {...props} />
}

function CommandGroup({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [Group, setGroup] = React.useState<any>(null)

  React.useEffect(() => {
    import('cmdk').then((mod) => setGroup(() => mod.Command.Group))
  }, [])

  if (!Group) {
    return <div className={cn('p-1', className)} {...props} />
  }

  return (
    <Group
      data-slot="command-group"
      className={cn(
        'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className,
      )}
      {...props}
    />
  )
}

function CommandSeparator({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [Separator, setSeparator] = React.useState<any>(null)

  React.useEffect(() => {
    import('cmdk').then((mod) => setSeparator(() => mod.Command.Separator))
  }, [])

  if (!Separator) {
    return <div className={cn('bg-border -mx-1 h-px', className)} {...props} />
  }

  return (
    <Separator
      data-slot="command-separator"
      className={cn('bg-border -mx-1 h-px', className)}
      {...props}
    />
  )
}

type CommandItemProps = React.ComponentPropsWithoutRef<'div'> & {
  onSelect?: (value: string) => void
  disabled?: boolean
  value?: string
}

function CommandItem({ className, onSelect, ...props }: CommandItemProps) {
  const [Item, setItem] = React.useState<any>(null)

  React.useEffect(() => {
    import('cmdk').then((mod) => setItem(() => mod.Command.Item))
  }, [])

  if (!Item) {
    return <div className={cn('px-2 py-1.5', className)} {...props} />
  }

  return (
    <Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      onSelect={onSelect}
      {...props}
    />
  )
}

function CommandShortcut({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
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
  CommandSeparator,
}
