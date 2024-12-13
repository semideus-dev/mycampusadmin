"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Users,
  Moon,
  Sun,
  LayoutDashboard,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "relative min-h-screen border-r border-border bg-background transition-all duration-300",
          "w-64",
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative min-h-screen border-r border-border bg-background transition-all duration-300",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 z-40 h-8 w-8 rounded-full border bg-background p-0 shadow-md hover:bg-accent"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </Button>

      <div className="flex flex-col gap-4 py-4">
        <div className="px-4 py-2">
          <h2
            className={cn(
              "flex items-center gap-3 font-semibold tracking-tight transition-all",
              collapsed ? "justify-center text-xl" : "text-2xl",
            )}
          >
            <LayoutDashboard className="h-8 w-8" />
            {!collapsed && <span>MCA</span>}
          </h2>
        </div>

        <div className="flex flex-col gap-1 px-2">
          <TooltipProvider delayDuration={0}>
            {menuItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "h-14",
                      collapsed ? "justify-center px-2" : "justify-start px-4",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-8 w-8 transition-all",
                        collapsed ? "mr-0" : "mr-3",
                      )}
                    />
                    {!collapsed && (
                      <span className="text-lg">{item.label}</span>
                    )}
                  </Button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="border-border">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        <div className="mt-auto px-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "h-14 w-full",
                    collapsed ? "justify-center px-2" : "justify-start px-4",
                  )}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun
                        className={cn(
                          "h-8 w-8 transition-all",
                          collapsed ? "mr-0" : "mr-3",
                        )}
                      />
                      {!collapsed && (
                        <span className="text-lg">Light Mode</span>
                      )}
                    </>
                  ) : (
                    <>
                      <Moon
                        className={cn(
                          "h-8 w-8 transition-all",
                          collapsed ? "mr-0" : "mr-3",
                        )}
                      />
                      {!collapsed && <span className="text-lg">Dark Mode</span>}
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" className="border-border">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
