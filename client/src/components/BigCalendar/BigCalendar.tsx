import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../store/store";
import { cn } from "../../lib/utils";
import "./calendar-custom.css";
const localizer = momentLocalizer(moment);
type EventTypes = {
  title: string;
  description: String;
  start: Date;
  end: Date;
  status: String;
  created: Date;
  groupId: string;
};
function BigCalendar({ className }: { className: string }) {
  const store = useStore();
  const [events, setEvents] = useState<EventTypes[]>([]);

  const userEvents = events.filter(
    (item: EventTypes) => item.groupId == store.currentUser?.groupId
  );
  useEffect(() => {
    try {
      const handleEvents = async () => {
        const response = await axios.get("http://localhost:3000/event");
        const formattedEvents = response.data.map((event: EventTypes) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          created: new Date(event.created),
        }));
        setEvents(formattedEvents);
      };
      handleEvents();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className={cn(className)}>
      <h1 className="font-k2d text-2xl mb-2">Schedule</h1>
      {userEvents ? (
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          events={userEvents}
          views={["month", "day", "week"]}
          defaultView="month"
        />
      ) : null}
    </div>
  );
}

export default BigCalendar;
