import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";
import { debounce } from "lodash";
import { CiSearch } from "react-icons/ci";
import { Input } from "../components/ui/Input";
import { Image } from "../components/ui/Image";
import LogoIcon from "../assets/icons/LogoIconBlack.svg";

const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(teachers);
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
  useEffect(() => {
    fetchTeachers(searchTerm);
  }, [searchTerm]);
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex justify-end mb-2">
        <h1 className="font-k2d text-6xl">All Teachers</h1>
      </div>
      <div className="w-full h-screen gap-4  border shadow-sm border-neutral-200 rounded-2xl p-4">
        <div className="flex items-center justify-between p-4">
          <Breadcrumbs />
          <div className="relative w-1/6">
            <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder=" Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="caret-[#34d399]"
            />
          </div>
        </div>
        <div className="flex gap-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((item: any, index: number) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 200}ms` }}
                className="flex justify-between border border-t-2  animate-fadeInOpacity border-b-0 border-l-0 border-r-0 border-emerald-400 rounded-md py-2 px-2 mt-2 shadow-sm hover:shadow-md cursor-pointer transition-colors duration-200 animation-fill-forwards"
              >
                <div className="w-auto h-full rounded-2xl bg-white p-2 sm:p-2">
                  <a href="#" className="flex gap-2">
                    <div className="flex flex-col gap-2">
                      {item.img ? (
                        <Image
                          src={item.img}
                          className={
                            item.activeStatus == "Online"
                              ? "border border-green-300 p-1 rounded-full"
                              : "border-2 border-neutral-400 p-1 rounded-full w-16 h-16"
                          }
                        />
                      ) : (
                        <div className="border border-neutral-600-300 rounded-full w-16 h-16 items-center flex justify-center">
                          <Image src={LogoIcon} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <h3 className="mt-0.5 text-lg font-k2d font-medium text-gray-900 flex gap-2">
                        {item.name}
                        <span> </span>
                        {item.surname}
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
                    </div>
                  </a>
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
