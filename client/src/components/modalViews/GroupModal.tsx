import { AlertDialogCancel } from "../ui/alert-dialog";
import { IoMdClose } from "react-icons/io";
import { RadialChart } from "../ui/RadialChart";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";
import { Image } from "../ui/Image";
import LogoIcon from "../../assets/icons/LogoIconBlack.svg";
import { FaRegEdit } from "react-icons/fa";
import { LiaTrashAltSolid } from "react-icons/lia";
import { useStore } from "../../store/store";
import { Input } from "../ui/Input";
import { CiSearch } from "react-icons/ci";

type GroupModalProps = {
  group: any;
};

export const GroupModal: React.FC<GroupModalProps> = ({ group }) => {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const store = useStore();
  useEffect(() => {
    setSubjects(group.subjects);
    setStudents(group.students);
  }, []);
  return (
    <>
      <div className="w-full outline-none">
        <div className="flex justify-between items-start">
          <AlertDialogTitle>
            <div className="font-k2d text-6xl flex gap-2">
              <Image src={LogoIcon} className="animate-rotate" />
              {group.name}
            </div>
          </AlertDialogTitle>
          <div className="flex  justify-end">
            <RadialChart
              count={group.subjects.length}
              label={"Subjects"}
              className={`scale-90 p-0`}
            />

            <RadialChart
              count={group.students.length}
              label={"Students"}
              className={`scale-90 p-0`}
            />
          </div>
        </div>

        <Tabs defaultValue="Subjects">
          <TabsList>
            <TabsTrigger value="Subjects">Subjects</TabsTrigger>
            <TabsTrigger value="Students">Students</TabsTrigger>
            <TabsTrigger value="Events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="Subjects">
            <div className="outline-none flex justify-between items-center p-0 my-2">
              {store.currentUser.roles.includes("Admin") ||
              store.currentUser.roles.includes("Teacher") ? (
                <div>
                  <p className="w-[120px] flex justify-center items-center text-sm text-center p-1.5 font-k2d bg-white rounded-lg border-2 border-neutral-200 hover:shadow-md cursor-pointer dark:bg-neutral-800 dark:border-neutral-400">
                    Add Subject
                  </p>
                </div>
              ) : (
                <></>
              )}
              <div className="relative">
                <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder=" Search..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="caret-[#34d399] dark:bg-neutral-800 dark:placeholder:text-white"
                />
              </div>
            </div>
            <div className="w-full overflow-y-auto h-1/3 flex flex-col gap-2 ">
              {subjects.length > 0 &&
                subjects.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex w-auto justify-between border border-t-2  animate-fadeInOpacity border-b-0 border-l-0 border-r-0 border-emerald-400 rounded-md py-2 px-2  shadow-sm hover:shadow-md cursor-pointer transition-colors duration-200 animation-fill-forwards dark:bg-neutral-800"
                  >
                    <div className="flex gap-4 font-k2d">
                      <Image src={LogoIcon} className="w-4" />
                      {item.name}
                      <div className="bg-emerald-200 rounded-xl text-emerald-500 px-1.5 text-xs flex justify-center items-center">
                        {item.status.toLowerCase()}
                      </div>
                    </div>
                    {store.currentUser.roles.includes("Admin") && (
                      <div className="flex gap-1">
                        <div>
                          <p className="w-12 flex justify-center items-center  h-7 text-sm text-center p-1.5 font-k2d bg-white rounded-lg border-2 border-neutral-200 hover:shadow-md cursor-pointer hover:border-emerald-400 transition-colors duration-75">
                            <FaRegEdit />
                          </p>
                        </div>
                        <div>
                          <p className="w-12 flex justify-center items-center  h-7 text-sm text-center p-1.5 font-k2d bg-white rounded-lg border-2 border-neutral-200 hover:shadow-md cursor-pointer hover:border-red-400 transition-colors duration-75">
                            <LiaTrashAltSolid size={20} />
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="Students">
            <div className="outline-none flex justify-between items-center p-0 my-2">
              {store.currentUser.roles.includes("Admin") ||
              store.currentUser.roles.includes("Teacher") ? (
                <div>
                  <p className="w-[120px] flex justify-center items-center text-sm text-center p-1.5 font-k2d bg-white rounded-lg border-2 border-neutral-200 hover:shadow-md cursor-pointer dark:bg-neutral-800 dark:border-neutral-400">
                    Invite Student
                  </p>
                </div>
              ) : (
                <></>
              )}
              <div className="relative">
                <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder=" Search..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="caret-[#34d399]"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-96 w-full rounded-md grid grid-cols-2 gap-4 pr-4">
              {students.length > 0 &&
                students.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between border border-t-2 dark:bg-neutral-800 animate-fadeInOpacity border-b-0 border-l-0 border-r-0 border-emerald-400 rounded-md p-4  shadow-sm hover:shadow-md cursor-pointer transition-colors duration-200 animation-fill-forwards"
                  >
                    <div className="flex gap-4 font-k2d">
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
                      <div>
                        <p>{item.name}</p>
                        <p>{item.surname}</p>
                        <p>{item.email}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {item.roles.map((item: any, index: number) => (
                          <span
                            key={index}
                            className="whitespace-nowrap flex items-center rounded-full bg-purple-100 px-2.5 py-0.2 text-xs text-purple-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      {store.currentUser.roles.includes("Admin") ||
                      store.currentUser.roles.includes("Teacher") ? (
                        <div className="flex flex-col gap-2">
                          <div>
                            <p className="w-auto flex justify-center items-center  h-7 text-sm text-center p-1.5 font-k2d bg-white rounded-lg border-2 border-neutral-200 hover:shadow-md cursor-pointer hover:border-red-400 transition-colors duration-75 hover:text-red-400">
                              Disconnect
                            </p>
                          </div>
                          <div>
                            <p className="w-auto flex justify-center items-center  h-7 text-sm text-center p-1.5 font-k2d bg-white rounded-lg border-2 border-neutral-200 hover:shadow-md cursor-pointer hover:border-orange-400 transition-colors duration-75 hover:text-red-400">
                              Ban
                            </p>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
        <AlertDialogCancel className="absolute top-4 right-4">
          <IoMdClose />
        </AlertDialogCancel>
      </div>
    </>
  );
};
