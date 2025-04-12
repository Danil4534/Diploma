import BigCalendar from "../components/BigCalendar";
import EventCalendar from "../components/EventCalendar";
import Header from "../components/Header";
import { RadialChart } from "../components/ui/RadialChart";

export const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md: dark:border-neutral-700 dark:bg-neutral-900">
        <Header />
        <EventCalendar />
        <RadialChart />
        <BigCalendar />
      </div>
    </div>
  );
};
