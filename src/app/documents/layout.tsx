"use client";
import Navigation from "@/components/docs/doc-nav";
import MobileNavSheet from "@/components/docs/mobile-nav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
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
  );
}
