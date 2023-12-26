"use client";

import { PropsWithChildren } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { EdgeStoreProvider } from "@/lib/edgestore";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
