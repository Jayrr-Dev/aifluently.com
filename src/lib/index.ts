// place files you want to import through the `$lib` alias in this folder.
import { Popover as PopoverPrimitive } from 'bits-ui';
import Content from './ui/shadcn-svelte/popover/popover-content.svelte';
const Root = PopoverPrimitive.Root;
const Trigger = PopoverPrimitive.Trigger;

export {
    Root,
    Content,
    Trigger,
    //
    Root as Popover,
    Content as PopoverContent,
    Trigger as PopoverTrigger
};
