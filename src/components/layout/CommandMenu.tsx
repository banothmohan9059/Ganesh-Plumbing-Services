"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, Wrench, MapPin } from "lucide-react";
import { ALL_SERVICES } from "@/lib/services-page-data";
import { TARGET_LOCATIONS } from "@/lib/location-data";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
      <div 
        aria-hidden="true"
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={() => setOpen(false)}
      />
      <Command 
        className="relative z-50 flex w-full max-w-lg flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-2xl border border-border"
      >
        <div className="flex items-center border-b border-border px-3">
          <Search className="mr-2 size-4 shrink-0 opacity-50" />
          <Command.Input 
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search services or locations..." 
          />
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
          <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>
          
          <Command.Group heading="Services" className="text-xs font-medium text-muted-foreground px-2 py-1.5">
            {ALL_SERVICES.map((service) => (
              <Command.Item
                key={service.id}
                value={service.title}
                onSelect={() => runCommand(() => router.push(`/services/${service.id}`))}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 mt-1 cursor-pointer"
              >
                <Wrench className="mr-2 size-4 text-brand-500" />
                {service.title}
              </Command.Item>
            ))}
          </Command.Group>
          
          <div className="h-px bg-border my-1 mx-2" />
          
          <Command.Group heading="Locations" className="text-xs font-medium text-muted-foreground px-2 py-1.5">
            {TARGET_LOCATIONS.map((location) => (
              <Command.Item
                key={location.id}
                value={location.name}
                onSelect={() => runCommand(() => router.push(`/locations/${location.id}`))}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 mt-1 cursor-pointer"
              >
                <MapPin className="mr-2 size-4 text-brand-500" />
                {location.name}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
