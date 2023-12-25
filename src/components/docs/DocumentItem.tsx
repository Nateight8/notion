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
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Doc, Id } from "../../../convex/_generated/dataModel";

interface Props {
  label: string;
  parentDocumentId?: Id<"documents">;
  data?: Doc<"documents">[];
}

export default function DocumentItem({ label, parentDocumentId, data }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const params = useParams();
  const router = useRouter();

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

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
          <FileIcon className="w-4 h-4" /> <span>{label}</span>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="px-4 space-y-1 data-[state=open]:animate-collapsible-up data-[state=close]:animate-collapsible-down">
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
