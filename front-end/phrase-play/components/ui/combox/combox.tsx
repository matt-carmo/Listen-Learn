"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { baseUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { useAudiosStore } from "@/app/stores/audios-store";

export function ComboboxDemo(props: {
  phraseId?: string; audio?: string, onValueChange?: (value: string) => void;
  className?: string;
  modal?: boolean;
}) {
  console.log(props)
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.audio || "");

  const { audios } = useAudiosStore(store => store);
  const updateAudio = async (shortName: string) => {

    const fileName = audios.find((audio) => audio.shortName === shortName)?.fileName
    if (props.onValueChange) {
      return props.onValueChange(fileName ?? "");
    }
    try {
 
       await axios.put(`${baseUrl}/content-blocks/${props.phraseId}`, {
        audioUrl: fileName
      });

    } catch (error) {
      console.log(error);
    }
  };

  if(!props.modal) {
    return (
      <Command>
      <CommandInput placeholder="Search audio..." />
      <CommandList>
        <CommandEmpty>No audio found.</CommandEmpty>
        <CommandGroup className="max-h-[200px] overflow-y-auto">
          {audios.map((audio) => (
            <CommandItem
              key={audio.shortName}
              value={audio.shortName}
              onSelect={(val) => {
                setValue(val === value ? "" : val);
                if(val === value) {
                  setOpen(false)
                  return
                }
                setOpen(false);
                updateAudio(val);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === audio.shortName ? "opacity-100" : "opacity-0"
                )}
              />
              {audio.shortName}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
    )
  }
  return (
    audios && (
      <Popover >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? audios.find((audio) => audio.shortName === value)?.shortName
              : "Select audio"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-3xl w-screen p-0">
          <Command>
            <CommandInput placeholder="Search audio..." />
            <CommandList>
              <CommandEmpty>No audio found.</CommandEmpty>
              <CommandGroup>
                {audios.map((audio) => (
                  <CommandItem
                    key={audio.shortName}
                    value={audio.shortName}
                    onSelect={(val) => {
                      setValue(val === value ? "" : val);
                      if(val === value) {
                        setOpen(false)
                        return
                      }
                      setOpen(false);
                      updateAudio(val);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === audio.shortName ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {audio.shortName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  );
}
