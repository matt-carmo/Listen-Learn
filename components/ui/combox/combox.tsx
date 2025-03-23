"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { useEffect } from "react";

export function ComboboxDemo(props: { phraseId: number; audio: string }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.audio || "");
  const [audios, setAudios] = React.useState<any>([]);

  const updateAudio = async (audio: string) => {
    try {
      const response = await axios.put(`/api/audios`, {
        audio: audio,
        phraseId: props.phraseId,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllAudios = async () => {
    try {
      const response = await axios.get(`/api/audios`);
      setAudios(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAudios();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? audios.find((audio: string) => audio === value)
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {audios.map((audio: string) => (
                <CommandItem
                  key={audio}
                  value={audio}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    updateAudio(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === audio ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {audio}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
