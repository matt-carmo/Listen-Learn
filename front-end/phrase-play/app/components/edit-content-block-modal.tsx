import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ComboboxDemo } from "@/components/ui/combox/combox";
import { baseUrl } from "@/lib/utils";

export function EditContentBlockModal({
  // children,
  textOriginal,
  textTranslated,
  audioUrl,
  id,
}: {
  // children: React.ReactNode;
  textOriginal: string;
  textTranslated: string;
  audioUrl: string;
  id?: string;
}) {
  const [original, setOriginal] = useState(textOriginal);
  const [translated, setTranslated] = useState(textTranslated);
  const [audio, setAudio] = useState(audioUrl);
  const [blockId] = useState(id);
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault(); 
    try {
      await fetch(`${baseUrl}/content-blocks/${blockId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalText: original,
          translatedText: translated,
          audioUrl: audio,
        }),
      });
      setOpen(false);
      console.log("Content block updated successfully");
    } catch (error) {
      console.error("Error updating content block:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-[calc(100%-4.75rem)] h-[calc(100%-2px)] absolute z-20 top-0" asChild>
        <button className="text-[unset]">
          {/* {children} */}
        </button>
        {/* <Button>{children}</Button> */}
      </DialogTrigger>
      <DialogContent  className="w-full max-w-4xl border">
        <form action="submit" onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Edit content block</DialogTitle>
          <DialogDescription>
            <p className="text-sm text-muted-foreground">
              Edit the content block below. You can change the original text, translated text, and audio file.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="flex flex-col gap-1">
            <Label>
              Original
            </Label>
            <Input id="original" onChange={(e) => setOriginal(e.target.value)} value={original} className="col-span-3" />
          </div>
          <div className="flex flex-col gap-1">
            <Label>
              Translated
            </Label>
            <Input id="translated" onChange={(e) => setTranslated(e.target.value)} value={translated} className="col-span-3" />
          </div>
          <div className="flex flex-col gap-1">
            <Label>
              Audio
            </Label>
            <Input id="audio" value={audio.split('-')[1]} disabled className="col-span-3 text-black !opacity-100 !cursor-default" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <ComboboxDemo modal={false} onValueChange={setAudio} audio={audio} phraseId={blockId}/>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}