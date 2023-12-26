import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Id } from "../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { ResetIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function TrashCan() {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onRestore = (
    // event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    // event.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: " Failed to restore note.",
    });
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        loading...
      </div>
    );
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size={"icon"}
            variant={"outline"}
            className="h-6 w-6 rounded-full"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filteredDocuments && filteredDocuments.length >= 0 && (
                  <ScrollArea className="h-72">
                    <div className="p-4 space-y-2">
                      {filteredDocuments.map((status) => (
                        <CommandItem
                          className="bg-transparent p-0"
                          key={status._id}
                          value={status._id}
                          onSelect={(value) => {
                            setSelectedStatus(value);

                            //   setOpen(false);
                          }}
                        >
                          <Link
                            href={`/documents/${status._id}`}
                            className="h-full bg-background border border-border/10 hover:border-border/20  w-full p-2 flex items-center justify-between"
                          >
                            <span className="text-sm">{status.title}</span>
                            <div className="space-x-2">
                              <Button
                                onClick={() => onRestore(status._id)}
                                size={"icon"}
                                variant={"outline"}
                                className="h-6 w-6 rounded-full "
                              >
                                <ResetIcon className="text-muted-forground" />
                              </Button>
                              <ConfirmDelet
                                Id={selectedStatus}
                                title={status.title}
                              />
                            </div>
                          </Link>
                        </CommandItem>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ConfirmDelet({ Id, title }: { Id: any; title: string }) {
  const remove = useMutation(api.documents.remove);

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: " Failed to delete note.",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"outline"}
          className="h-6 w-6 rounded-full "
        >
          <TrashIcon className="text-muted-forground" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <Link href={`/documents/${Id}`} className="font-bold text-red-800">
              {title}
            </Link>{" "}
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onRemove(Id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
