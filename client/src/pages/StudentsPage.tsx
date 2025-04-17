import axios from "axios";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { CiSearch } from "react-icons/ci";
import { Input } from "../components/ui/Input";
import { Image } from "../components/ui/Image";
import LogoIcon from "../assets/icons/LogoIconBlack.svg";
function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchTeachers = debounce(async (query: string) => {
    const where = encodeURIComponent(
      JSON.stringify({ roles: { has: "Student" } })
    );
    try {
      const response = await axios.get(
        `http://localhost:3000/user?where=${where}`
      );
      setStudents(response.data);
    } catch (e) {
      console.log(e);
    }
  });
  const filteredResults = students.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetchTeachers(searchTerm);
  }, [searchTerm]);
  return (
    <div className="flex flex-col w-full ">
      <div className="w-full flex justify-end mb-2">
        <h1 className="font-k2d text-6xl">All Students</h1>
      </div>
      <div className="w-full h-screen gap-4  border shadow-sm border-neutral-200 rounded-2xl p-2">
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
        <div className="grid grid-cols-4 gap-4 overflow-y-auto h-2/3 w-full p-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((item: any, index: number) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 200}ms` }}
                className="h-40 opacity-0 animate-fadeInOpacity hover:animate-background cursor-pointer rounded-2xl border-t-2 shadow-md border-emerald-400 hover:bg-[length:400%_400%] hover:shadow-xl animate-fill-forwards"
              >
                <div className="w-auto h-full rounded-2xl bg-white p-2 sm:p-2">
                  <a href="#" className="flex gap-2">
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
}

export default StudentsPage;
