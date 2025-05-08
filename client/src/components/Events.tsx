import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { NavLink, useLocation } from "react-router-dom";
import { orderBy } from "lodash";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
export type EventTypes = {
  id: string;
  title: string;
  description: String;
  start: string;
  end: string;
  status: String;
  created: Date;
  groupId: string;
};
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const dayOfMonth = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${dayOfWeek} ${dayOfMonth}, ${hours}:${minutes}`;
};

const Events: React.FC = () => {
  const [events, setEvents] = useState<EventTypes[]>([]);
  const store = useStore();
  const { pathname } = useLocation();
  const usersEvents = events.filter(
    (item: EventTypes) => item.groupId == store.currentUser?.groupId
  );

  useEffect(() => {
    const handleEvents = async () => {
      const orderBy = encodeURIComponent(JSON.stringify({ start: "desc" }));
      const response = await axios.get(
        `http://localhost:3000/event?orderBy=${orderBy}`
      );
      setEvents(response.data);
    };
    handleEvents();
  }, []);

  return (
    <>
      {pathname !== "/homepage/events" ? (
        <div className="h-full">
          <div className="flex items-center justify-between">
            <h1 className="font-k2d text-md">Events</h1>
            <NavLink
              to="events"
              className="font-k2d text-neutral-500 text-sm hover:underline cursor-pointer"
            >
              View All
            </NavLink>
          </div>
          <Accordion type="single" collapsible>
            {usersEvents.length > 0 ? (
              usersEvents.slice(0, 3).map((item: EventTypes, index: number) => (
                <AccordionItem
                  value={item.id}
                  key={index}
                  className=" border border-t-2  animate-fadeInOpacity border-b-0 border-l-0 border-r-0 border-emerald-400 rounded-md  px-2 mt-2  shadow-sm hover:shadow-md cursor-pointer transition-colors duration-200 animation-fill-forwards"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <AccordionTrigger className="font-k2d">
                    {item.title}{" "}
                    <p className="text-xs bg-red-200 px-2 py-0.5 rounded-full  lowercase text-red-500 font-k2d">
                      {" "}
                      {item.status}
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <span className="text-xs underline lowercase">Start</span>{" "}
                    {formatDate(item.start)} -{" "}
                    <span className="text-xs underline lowercase"> End</span>{" "}
                    {formatDate(item.end)}
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="flex justify-center items-center h-auto">
                <h1 className="font-k2d text-sm text-neutral-400">Empty</h1>
              </div>
            )}
          </Accordion>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Events;
