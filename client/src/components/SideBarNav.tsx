import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Sidebar, SidebarBody } from "./ui/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import EventCalendar from "./EventCalendar";
import { RadialChart } from "./ui/RadialChart";
import BigCalendar from "./BigCalendar/BigCalendar";
import { SideBarContent } from "./SideBarContent";
import Events from "./Events";
import axios from "axios";
import { Sheet } from "lucide-react";
type RadialChartData = {
  label: string;
  count: number;
};
export const SideBarNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [data, setData] = useState<RadialChartData[]>([]);
  const handleGroups = async () => {
    const response = await axios.get(`http://localhost:3000/group`);
    return { label: "Group", count: response.data.length };
  };
  const handleUsers = async () => {
    const response = await axios.get(`http://localhost:3000/user`);
    return { label: "Users", count: response.data.length };
  };
  const handleTeachers = async () => {
    const where = encodeURIComponent(
      JSON.stringify({ roles: { has: "Teacher" } })
    );
    const response = await axios.get(
      `http://localhost:3000/user?where=${where}`
    );
    return { label: "Teachers", count: response.data.length };
  };
  const handleStudents = async () => {
    const where = encodeURIComponent(
      JSON.stringify({
        roles: { has: "Student" },
      })
    );
    const response = await axios.get(
      `http://localhost:3000/user?where=${where}`
    );
    return { label: "Students", count: response.data.length };
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all([
          handleGroups(),
          handleUsers(),
          handleTeachers(),
          handleStudents(),
        ]);
        setData(results);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

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
        <div className="flex h-full w-full flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-2 md: dark:border-neutral-700 dark:bg-neutral-900">
          <Header />
          <div className="w-full flex flex-row-reverse gap-4">
            <div className="flex flex-col gap-4">
              <div className="h-full w-[380px] rounded-2xl border border-neutral-200 dark:border-neutral-600 p-4 animate-rightIn ">
                <EventCalendar />
                <Events />
              </div>
              <div className="h-full w-[380px] rounded-2xl border border-neutral-200 dark:border-neutral-600 p-4 animate-rightIn"></div>
            </div>
            <Outlet />
            {pathname == "/homepage" ? (
              <div className="w-full h-screen border border-neutral-200 dark:border-neutral-600 rounded-2xl justify-center items-center p-4">
                <div className="w-full flex justify-between gap-10">
                  <BigCalendar className="w-2/3 animate-topIn" />
                  <div className="grid grid-cols-2 w-1/3 h-full gap-0 place-items-center justify-items-center">
                    {data.map((item: any, index: number) => (
                      <div key={index}>
                        <RadialChart
                          count={item.count}
                          label={item.label}
                          className="p-0 m-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
