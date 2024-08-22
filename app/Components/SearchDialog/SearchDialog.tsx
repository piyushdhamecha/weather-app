"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search, Command as CommandIcon } from "lucide-react";
import React from "react";

export default function SearchDialog() {
  return (
    <div className="search-btn">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-between text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200 p-2 w-80"
          >
            <p className="text-sm text-muted-foreground">Search here...</p>
            <div className="command dark:bg-[#262626] bg-slate-200 py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex gap-2 items-center">
              <CommandIcon size={15} />
              <span className="text-[9px]">F</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0">
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <ul className="px-3 pb-2">
              <p className="p-2 text-sm text-muted-foreground">Suggestions</p>
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}
