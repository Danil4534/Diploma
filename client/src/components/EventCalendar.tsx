import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function EventCalendar() {
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const [value, onChange] = useState<Value>(new Date());

  return (
    <>
      <div className="w-[380px] bg-white rounded-md p-4 flex justify-center">
        <Calendar onChange={onChange} value={value} />
      </div>
    </>
  );
}

export default EventCalendar;
