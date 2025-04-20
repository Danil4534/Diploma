import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";
import { debounce } from "lodash";
import { CiSearch } from "react-icons/ci";
import { Input } from "../components/ui/Input";
import { Image } from "../components/ui/Image";
import LogoIcon from "../assets/icons/LogoIconBlack.svg";
import { AiOutlineSortAscending } from "react-icons/ai";
import { io } from "socket.io-client";
import { useStore } from "../store/store";

const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const store = useStore();

  const fetchTeachers = debounce(async (query: string) => {
    const where = encodeURIComponent(
      JSON.stringify({ roles: { has: "Teacher" } })
    );
    try {
      const response = await axios.get(
        `http://localhost:3000/user?where=${where}`
      );
      setTeachers(response.data);
    } catch (e) {
      console.log(e);
    }
  });
  const filteredResults = teachers.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function formatNameSurname(name: string, surname: string) {
    return `${name} ${surname}`;
  }
  const handleCreateNewChat = (currentUserId: string, userId: string) => {
    if (!socket) return;
    socket.emit("createChat", { userId1: currentUserId, userId2: userId });
  };
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    fetchTeachers(searchTerm);
  }, [searchTerm]);
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex justify-end mb-2">
        <h1 className="font-k2d text-6xl">All Students</h1>
      </div>
      <div className="w-full h-screen gap-4  border shadow-sm border-neutral-800 rounded-2xl p-2">
        <div className="flex items-center justify-between p-4 ">
          <Breadcrumbs />
          <div className="flex w-full gap-2 justify-end">
            <div className="relative w-1/5">
              <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder=" Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="caret-[#34d399]"
              />
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex justify-center items-center cursor-pointer">
              <AiOutlineSortAscending color="white" size={24} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 overflow-y-auto h-2/3 w-full p-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((item: any, index: number) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 200}ms` }}
                className="h-40 opacity-0 animate-fadeInOpacity hover:animate-background cursor-pointer rounded-2xl border-t-2 shadow-md border-emerald-400 hover:bg-[length:400%_400%] hover:shadow-xl animate-fill-forwards dark:bg-neutral-800"
              >
                <div className="w-auto h-full rounded-2xl bg-white p-2 sm:p-2 dark:bg-neutral-800">
                  <div className="flex gap-2 h-full">
                    <div className="flex flex-col gap-2">
                      {item.img ? (
                        <Image
                          src={item.img}
                          className={
                            item.activeStatus == "Online"
                              ? "border-2 border-green-300 p-1 rounded-full w-16 h-16"
                              : "border-2 border-neutral-400 p-1 rounded-full w-16 h-16"
                          }
                        />
                      ) : (
                        <div className="border border-neutral-600-300 rounded-full w-16 h-16 items-center flex justify-center">
                          <Image src={LogoIcon} className="w-1/2" />
                        </div>
                      )}
                    </div>
                    <div className="flex h-full w-full flex-col justify-start items-start relative">
                      <h3 className="mt-0.5 text-lg font-k2d font-medium text-gray-900 flex gap-2">
                        {formatNameSurname(item.name, item.surname)}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.roles.map((item: any, index: number) => (
                          <span
                            key={index}
                            className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() =>
                          handleCreateNewChat(store.currentUser.id, item.id)
                        }
                        className=" absolute right-1 bottom-1 mt-2 rounded-xl bg-slate-800 text-white px-4 py-2 text-sm hover:bg-emerald-600 transition"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;
