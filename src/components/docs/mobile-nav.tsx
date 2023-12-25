import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Navigation from "./doc-nav";

export default function MobileNavSheet() {
  return (
    <div className="px-4 h-14 border-b flex items-center">
      <Sheet>
        <SheetTrigger className="md:hidden" asChild>
          <Button variant="outline" size={"icon"}>
            <HamburgerMenuIcon className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Navigation />
        </SheetContent>
      </Sheet>
    </div>
  );
}
