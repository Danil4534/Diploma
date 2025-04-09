import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";

const localizer = momentLocalizer(moment);

function BigCalendar() {
  const [events, setEvents] = useState();

  console.log(events);
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
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        events={events}
      />
    </div>
  );
}

export default BigCalendar;
