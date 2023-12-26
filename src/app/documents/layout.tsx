"use client";
import Navigation from "@/components/docs/doc-nav";
import Header from "@/components/docs/header";
import MobileNavSheet from "@/components/docs/mobile-nav";
import SearchCommand from "@/components/docs/search-command";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useConvexAuth } from "convex/react";
import { redirect, useParams } from "next/navigation";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const params = useParams();
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
          minSize={0}
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
          {!!params.documentId && <Header />}
          <main className="h-full p-6">{children}</main>
        </ResizablePanel>
      </ResizablePanelGroup>
      <SearchCommand />
    </>
  );
}
