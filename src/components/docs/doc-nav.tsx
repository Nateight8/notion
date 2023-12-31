import React from "react";
import { Button } from "../ui/button";
import {
  ChevronRightIcon,
  FileIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import User from "./user";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import DocumentItem from "./DocumentItem";
import DocumentList from "./document-item";
import TrashCan from "./trash-dialog";
import { useSearch } from "@/lib/seachContext";

type Props = {};

function Navigation({}: Props) {
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const { isOpen, onClose, onOpen, toggle } = useSearch((store) => store);
  const createNote = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  return (
    <div className="flex items-between pb-4 justify-center flex-col h-screen">
      <div className="h-14 flex items-center justify-end p-4">
        <div className="space-x-2 flex items-center">
          <TrashCan />

          <Button
            size={"icon"}
            variant={"outline"}
            className="h-6 w-6 rounded-full"
            onClick={() => toggle()}
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
          </Button>

          <User />
        </div>
      </div>

      <div className="flex-1 w-full">
        {/* <DocumentItem label="Home" /> */}
        <DocumentList />
      </div>

      <Button
        onClick={createNote}
        variant={"ghost"}
        size={"sm"}
        className="justify-start items-center space-x-2"
      >
        <PlusIcon className="w-4 h-4" />
        <FileIcon className="w-4 h-4" /> <span>New page</span>
      </Button>

      {/* {!!params.documentId ? (
          <Navbar
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
          </nav>
        )} */}
    </div>
  );
}

export default Navigation;
