"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import { GitBranch, GitGraph, Github } from "lucide-react";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "../context/globalContext";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="w-full py-4 flex item-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />
        <div className="btn-group flex item-center gap-2">
          <ThemeDropdown />
          <Button
            className="source-code-btn flex item-center gap-2"
            asChild
          >
            <Link href="https://github.com/piyushdhamecha/weather-app" target="_blank">
              <Github />
              Source Code
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
