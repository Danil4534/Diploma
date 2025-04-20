import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { GroupModal } from "../components/modalViews/GroupModal";
import { debounce } from "lodash";
import axios from "axios";
import Breadcrumbs from "../components/Breadcrumbs";
import { CiSearch } from "react-icons/ci";
import { Input } from "../components/ui/Input";
import { Image } from "../components/ui/Image";
import LogoIcon from "../assets/icons/LogoIconBlack.svg";
import { AiOutlineSortAscending } from "react-icons/ai";

function SubjectPage() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchGroups = debounce(async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/subject`);
      console.log(response);
      setSubjects(response.data);
    } catch (e) {
      console.log(e);
    }
  });
  const filteredResults = subjects.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredResults);
  useEffect(() => {
    fetchGroups(searchTerm);
  }, [searchTerm]);
  return (
    <div className="flex flex-col w-full ">
      <div className="w-full flex justify-end mb-2">
        <h1 className="font-k2d text-6xl">All Subjects</h1>
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
          <div className="w-10 h-10 bg-slate-800 rounded-full flex justify-center items-center cursor-pointer">
            <AiOutlineSortAscending color="white" size={24} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 overflow-y-auto h-2/3 w-full p-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((item: any, index: number) => (
              <AlertDialog>
                <AlertDialogTrigger
                  key={index}
                  style={{ animationDelay: `${index * 200}ms` }}
                  className="h-40 opacity-0 animate-fadeInOpacity hover:animate-background cursor-pointer rounded-2xl border-t-2 shadow-md border-emerald-400 hover:bg-[length:400%_400%] hover:shadow-xl animate-fill-forwards"
                >
                  <div className="w-auto h-full rounded-2xl bg-white p-4 relative">
                    <div className="absolute left-3 bottom-3">
                      <Image src={LogoIcon} className="animate-rotate" />
                    </div>
                    <div className="flex gap-2 flex-col">
                      <div className="flex items-start justify-between">
                        <h3 className=" text-lg font-k2d font-medium text-gray-900 flex gap-2">
                          Subject
                        </h3>
                        <h3 className=" text-lg font-k2d font-medium text-gray-500 flex gap-2">
                          {item.name}
                        </h3>
                      </div>
                      <div className="flex justify-end gap-4 ">
                        <div className="flex flex-col gap-2">
                          <div className="w-20 flex-col-reverse h-20 border border-neutral-200 flex justify-center items-center font-k2d font-medium rounded-xl">
                            <h3 className="font-sm">Tasks</h3>
                            <p className="font-k2d text-2xl ">
                              {item.tasks.length}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="w-20 flex-col-reverse h-20 border border-neutral-200 flex justify-center items-center font-k2d font-medium rounded-xl">
                            <h3 className="font-sm">Lessons</h3>
                            <p className="font-k2d text-2xl">
                              {item.lessons.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  {/* <GroupModal group={item} /> */}
                </AlertDialogContent>
              </AlertDialog>
            ))
          ) : (
            <>Empty</>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubjectPage;
