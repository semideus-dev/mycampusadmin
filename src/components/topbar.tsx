"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export function Topbar() {
  return (
    <div className="h-16 border-b border-border bg-background px-6">
      <div className="flex h-full items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative max-w-2xl flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
            />
          </div>
        </div>
        <UserButton
          appearance={{ baseTheme: dark }}
          userProfileProps={{ appearance: { baseTheme: dark } }}
        />
      </div>
    </div>
  );
}
