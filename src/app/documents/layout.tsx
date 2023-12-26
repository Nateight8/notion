"use client";
import Navigation from "@/components/docs/doc-nav";
import MobileNavSheet from "@/components/docs/mobile-nav";
import SearchCommand from "@/components/docs/search-command";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">loading...</div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen w-full rounded-lg border"
      >
        <ResizablePanel
          maxSize={30}
          minSize={20}
          className="hidden md:block"
          defaultSize={25}
        >
          <div className="">
            <Navigation />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden md:block " />
        <ResizablePanel defaultSize={75}>
          <MobileNavSheet />
          <main className="flex h-full items-center justify-center p-6">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
      <SearchCommand />
    </>
  );
}
