"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="justify-start items-center space-x-2 w-full"
        >
          <ChevronRightIcon
            className={`w-4 h-4 ${isOpen ? "rotate-90" : "rotate-0"}`}
          />
          <FileIcon className="w-4 h-4" /> <span>Home</span>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-2 space-x-8 data-[state=open]:animate-collapsible-up data-[state=close]:animate-collapsible-down">
        {/* <div className="h-16 bg-muted/10 pl-4 border-l">here is content</div> */}
        <Button
          variant={"ghost"}
          size={"sm"}
          className="justify-start items-center space-x-2 pl-6 w-full"
        >
          <PlusIcon className="w-4 h-4" />
          <FileIcon className="w-4 h-4" /> <span>New page</span>
        </Button>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="justify-start items-center space-x-2 pl-6 w-full"
        >
          <PlusIcon className="w-4 h-4" />
          <FileIcon className="w-4 h-4" /> <span>New page</span>
        </Button>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="justify-start items-center space-x-2 pl-6 w-full"
        >
          <PlusIcon className="w-4 h-4" />
          <FileIcon className="w-4 h-4" /> <span>New page</span>
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}
