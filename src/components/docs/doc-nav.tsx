import React from "react";
import { Button } from "../ui/button";
import { ChevronRightIcon, FileIcon, PlusIcon } from "@radix-ui/react-icons";
import CollapsibleDemo from "./collaps";

type Props = {};

function Navigation({}: Props) {
  return (
    <div className="flex items-between md:py-6 justify-center flex-col h-screen">
      <div className="flex-1 w-full">
        <CollapsibleDemo />
        <CollapsibleDemo />
      </div>
      <Button
        variant={"ghost"}
        size={"sm"}
        className="justify-start items-center space-x-2"
      >
        <PlusIcon className="w-4 h-4" />
        <FileIcon className="w-4 h-4" /> <span>New page</span>
      </Button>
    </div>
  );
}

export default Navigation;
