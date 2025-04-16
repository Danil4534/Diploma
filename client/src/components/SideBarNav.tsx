import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Sidebar, SidebarBody } from "./ui/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import EventCalendar from "./EventCalendar";
import { RadialChart } from "./ui/RadialChart";
import BigCalendar from "./BigCalendar";
import { SideBarContent } from "./SideBarContent";
import Events from "./Events";

export const SideBarNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const routeData = ["group", "user", "subject", "teacher"];

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-row overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <SideBarContent open={open} />
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md: dark:border-neutral-700 dark:bg-neutral-900">
          <Header />
          <div className="w-full flex flex-row-reverse">
            <div className="h-auto w-[380px] rounded-2xl border border-neutral-200 p-4 animate-rightIn">
              <EventCalendar />
              <Events />
            </div>
            <Outlet />
            {pathname == "/homepage" ? (
              <>
                <div className="w-[calc(100%-380px)] p-4">
                  <div className="flex w-full">
                    {routeData.map((item: any, index: number) => (
                      <div key={index}>
                        <RadialChart item={item} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <BigCalendar />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
