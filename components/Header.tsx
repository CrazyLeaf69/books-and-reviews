import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ToggleColorMode } from "../pages/_app";
import { Divider, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Header = () => {
  const router = useRouter();
  const path = router.pathname;
  const theme = useTheme();

  return (
    <header className="sticky" style={{ backgroundColor: theme.palette.background.default, zIndex: 100 }}>
      <div className="flex justify-between p-2 items-center">
        <div className="flex gap-2 ml-5 font-bold">
          <Link href="/" className={path == "/" ? "text-blue-400" : ""}>
            Home
          </Link>
          <Link href="/books" className={path == "/books" ? "text-blue-400" : ""}>
            Books
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="https://github.com/CrazyLeaf69/books-and-reviews">
            <GitHubIcon sx={{ mr: 2 }} />
          </Link>
          <ToggleColorMode />
        </div>
      </div>
      <Divider className="divider" />
    </header>
  );
};

export default Header;
