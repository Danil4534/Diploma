import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../store/store";

const localizer = momentLocalizer(moment);
type EventTypes = {
  title: string;
  description: String;
  start: string;
  end: string;
  status: String;
  created: Date;
  groupId: string;
};
function BigCalendar() {
  const store = useStore();
  const [events, setEvents] = useState<EventTypes[]>([]);
  console.log(events);
  const userEvents = events.filter(
    (item: EventTypes) => item.groupId == store.currentUser?.groupId
  );
  useEffect(() => {
    try {
      const handleEvents = async () => {
        const response = await axios.get(
          "http://localhost:3000/event?where=%7B%7D&orderBy=%7B%7D&skip=0&take=10"
        );
        setEvents(response.data);
      };
      handleEvents();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="w-full">
      <h1 className="font-k2d text-2xl">Schedule</h1>
      {events ? (
        <>
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            events={userEvents}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default BigCalendar;
