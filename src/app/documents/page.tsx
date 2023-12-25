"use client";
import CollapsibleDemo from "@/components/docs/DocumentItem";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

function Page() {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

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
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.fullName}&apos;s Jotion
      </h2>
      <Button onClick={createNote}>
        <PlusCircledIcon className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
}

export default Page;
