import { Image } from "./ui/Image";
import { SidebarLink } from "./ui/SideBar";
import HomeIcon from "../assets/icons/icon _Home_.svg";
import TeacherIcon from "../assets/icons/icon _teacher_.svg";
import UsersIcon from "../assets/icons/icon _Users_.svg";
import BooksIcon from "../assets/icons/ImBooks.svg";
import LogoIconBlack from "../assets/icons/LogoIconBlack.svg";
import MessageIcon from "../assets/icons/Message.svg";
import EventsIcon from "../assets/icons/Events.svg";
import { Logo, LogoIcon } from "./Logo";

type SideBarContentProps = {
  open: boolean;
};

export const SideBarContent: React.FC<SideBarContentProps> = ({ open }) => {
  const links = [
    {
      label: "Home",
      href: "/homepage",
      icon: <Image src={HomeIcon} className="w-4" />,
    },
    {
      label: "Groups",
      href: "groups",
      icon: <Image src={LogoIconBlack} className="w-4 " />,
    },
    {
      label: "Teachers",
      href: "teachers",
      icon: <Image src={TeacherIcon} className="w-4" />,
    },
    {
      label: "Students",
      href: "students",
      icon: <Image src={UsersIcon} className="w-4" />,
    },
    {
      label: "Subjects",
      href: "subjects",
      icon: <Image src={BooksIcon} className="w-4" />,
    },
    {
      label: "Tasks",
      href: "groups",
      icon: <Image src={BooksIcon} className="w-4 " />,
    },

    {
      label: "Events",
      href: "events",
      icon: <Image src={EventsIcon} className="w-4" />,
    },
    {
      label: "Messages",
      href: "messages",
      icon: <Image src={MessageIcon} className="w-4" />,
    },
  ];
  return (
    <>
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
    </>
  );
};
