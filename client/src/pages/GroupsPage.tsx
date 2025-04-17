import axios from "axios";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { Image } from "../components/ui/Image";
import Breadcrumbs from "../components/Breadcrumbs";
import { CiSearch } from "react-icons/ci";
import { Input } from "../components/ui/Input";
import LogoIcon from "../assets/icons/LogoIconBlack.svg";

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchGroups = debounce(async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/group`);
      console.log(response);
      setGroups(response.data);
    } catch (e) {
      console.log(e);
    }
  });
  const filteredResults = groups.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredResults);
  useEffect(() => {
    fetchGroups(searchTerm);
  }, [searchTerm]);
  return (
    <div className="flex flex-col w-full ">
      <div className="w-full flex justify-end mb-2">
        <h1 className="font-k2d text-6xl">All Groups</h1>
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
                  <a href="#" className="flex gap-2 flex-col">
                    <div className="flex items-start justify-between">
                      <h3 className="mt-0.5 text-lg font-k2d font-medium text-gray-900 flex gap-2">
                        Group
                      </h3>
                      <h3 className="mt-0.5 text-lg font-k2d font-medium text-gray-900 flex gap-2">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex justify-center gap-4 ">
                      <div className="flex flex-col gap-2">
                        <div className="w-20 flex-col-reverse h-20 border border-neutral-200 flex justify-center items-center font-k2d font-medium rounded-xl">
                          <h3 className="font-sm">Students</h3>
                          <p className="font-k2d text-2xl">
                            {item.students.length}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-20 flex-col-reverse h-20 border border-neutral-200 flex justify-center items-center font-k2d font-medium rounded-xl">
                          <h3 className="font-sm">Subjects</h3>
                          <p className="font-k2d text-2xl">
                            {item.subjects.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <>Empty</>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
