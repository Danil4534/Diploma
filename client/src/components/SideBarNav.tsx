import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/SideBar";
import { Link } from "react-router-dom";
import LogoIconBlack from "../assets/icons/LogoIconBlack.svg";
import { Image } from "./ui/Image";
import { Dashboard } from "../pages/DashBoard";
import HomeIcon from "../assets/icons/icon _Home_.svg";
import TeacherIcon from "../assets/icons/icon _teacher_.svg";
import UsersIcon from "../assets/icons/icon _Users_.svg";
import BooksIcon from "../assets/icons/ImBooks.svg";
export function SidebarDemo() {
  const links = [
    {
      label: "Home",
      href: "/homepage",
      icon: <Image src={HomeIcon} className="w-4" />,
    },
    {
      label: "Teachers",
      href: "/teachers",
      icon: <Image src={TeacherIcon} className="w-4" />,
    },
    {
      label: "Students",
      href: "/students",
      icon: <Image src={UsersIcon} className="w-4" />,
    },
    {
      label: "Groups",
      href: "/groups",
      icon: <Image src={LogoIconBlack} className="w-4 " />,
    },
    {
      label: "Subjects",
      href: "/subjects",
      icon: <Image src={BooksIcon} className="w-4" />,
    },
    {
      label: "Events",
      href: "/events",
      icon: <Image src={HomeIcon} className="w-4" />,
    },
    {
      label: "Messages",
      href: "/Messages",
      icon: <Image src={HomeIcon} className="w-4" />,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div
              className={
                open
                  ? "mt-4 flex flex-col gap-2 items-left"
                  : "mt-4 flex flex-col gap-2 items-center"
              }
            >
              <p>MENU</p>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div></div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      to="/homepage"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image src={LogoIconBlack} className="animate-rotate" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl whitespace-pre text-black dark:text-white font-k2d"
      >
        UNICHUB
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image src={LogoIconBlack} className="animate-rotate" />
    </Link>
  );
};
