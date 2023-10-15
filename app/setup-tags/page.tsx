"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export type Tag = Record<"id" | "name", string>;

const TAGS = [
  { id: "a8c220c3-1fee-4529-9c8b-7c8fe422d6c2", name: "Studying" },
  { id: "ae53aed1-d5cd-4e0a-80fd-7350b37bd7ef", name: "Music" },
  { id: "f45ea98b-658d-44f0-8b50-cbe3abeecec4", name: "Sports" },
  { id: "7e0eea4e-2194-49c4-81fd-dd0f82d2f6d5", name: "On-Campus" },
  { id: "4188596d-e61d-44c4-8c08-f9a582258ae3", name: "Food" },
  { id: "991d5f6d-a0a9-47d1-a52e-d25f083456a3", name: "Gaming" },
  { id: "95b96c34-73a3-4c36-8235-8289b0b1a6eb", name: "Networking" },
  { id: "f9953f1b-8b41-45ae-8988-fb573f42a3a6", name: "Fitness" },
  { id: "f5197353-d68a-400d-8cb9-9474cb23ff0d", name: "Art" },
  { id: "634ba936-7bf4-42be-8e12-ad1c597e276f", name: "Health" },
  { id: "11b667f4-3f2d-4cb2-b410-e46b5cf540b9", name: "Tech" },
  { id: "22e50e7c-2070-4d3a-972a-d1a9231a4255", name: "Outdoors" },
  { id: "340c3d0c-ef51-4c8c-9877-c4d6b91e5dd0", name: "Science" },
  { id: "5660ef48-80c5-4254-87bd-5ea608138a7a", name: "Coding" },
  { id: "6f8ea6da-e17b-4038-b841-d357ed143ff6", name: "Film" },
  { id: "2b611e06-7f0a-49bb-805d-487ec9af468e", name: "Photography" },
  { id: "276b6516-5578-4f9f-b762-b3d3b03debc7", name: "Politics" },
  { id: "fc31c765-de67-4859-9a45-c31778f48d49", name: "Culture" },
  { id: "b61286db-d04e-4843-9c84-635af0b7078f", name: "Religious" },
  { id: "3bdd5b9b-59a0-45b0-9832-1d6d7e66a80d", name: "Queer" },
  { id: "2e5b7ac9-d6fb-48fd-8b44-230a450562f9", name: "Travel" },
  { id: "4e00b30f-c7e4-4733-bdd3-41d51893ff21", name: "Fashion" },
  {
    id: "14777df1-9f4c-44da-b2e4-fc93f7264e59",
    name: "Entrepreneurship",
  },
  { id: "087b9d25-de63-40ba-91a7-292941289766", name: "Literature" },
  { id: "4e63fa15-1ded-4fbc-b3b3-31f824690a62", name: "Comedy" },
  { id: "41ecbb97-4f21-4e3f-81bc-c87dc54a5ed5", name: "Theatre" },
  { id: "d1abdf78-c4de-484c-91d8-ddcb9b970798", name: "Virtual" },
  { id: "ff290029-9bc9-4a7d-8a4d-907fd07e7153", name: "Nightlife" },
  { id: "385b1a6e-b851-4bd9-a5af-55f08f806292", name: "Animals" },
  { id: "34dcb15e-6a95-49be-a851-06af06f89ad1", name: "Giveaway" },
];

export default function SetupTags() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Tag[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const supabase = createClientComponentClient();

  const handleUnselect = React.useCallback((tag: Tag) => {
    setSelected((prev) => prev!.filter((s) => s.id !== tag.id));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (selected.length > 9) return;

      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.id === "") {
            setSelected((prev) => {
              const newSelected = [...prev!];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [],
  );

  const selectables =
    TAGS === undefined ? [] : TAGS.filter((tag) => !selected!.includes(tag));

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card className="px-[40px] pt-[35px]">
        <CardTitle className="mb-[10px]">Choose your interests</CardTitle>
        <CardDescription className="mb-[30px]">
          Choose up to 10 interests!
        </CardDescription>
        <Command
          onKeyDown={handleKeyDown}
          className="overflow-visible bg-transparent mb-[30px]"
        >
          <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <div className="flex gap-1 flex-wrap">
              {selected!.map((tag) => {
                return (
                  <Badge key={tag.id} variant="default">
                    {tag.name}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(tag);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleUnselect(tag)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                );
              })}
              {/* Avoid having the "Search" Icon */}
              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
                onValueChange={setInputValue}
                onBlur={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                placeholder="Select tags..."
                className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
              />
            </div>
          </div>
          <div className="relative mt-2">
            {open && selectables.length > 0 ? (
              <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="max-h-[20vh] overflow-y-scroll">
                  {selectables.map((tag) => {
                    return (
                      <CommandItem
                        key={tag.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          setInputValue("");
                          setSelected((prev) => [...prev!, tag]);
                        }}
                        className={
                          "cursor-pointer bg-neutral-50 hover:bg-neutral-100 duration-300"
                        }
                      >
                        {tag.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            ) : null}
          </div>
        </Command>
        <Button
          className="w-full text-white mb-[30px]"
          onClick={async () => {
            const tagIds = [];
            for (let i = 0; i < TAGS.length; i++) {
              tagIds.push(TAGS[i].id);
            }
            await supabase
              .from("profiles")
              .update({ tags: tagIds })
              .eq("id", (await supabase.auth.getUser()).data!.user!.id);
            window.location.href = "/";
          }}
        >
          Done
        </Button>
      </Card>
    </div>
  );
}
