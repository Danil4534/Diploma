import { AlertDialogCancel, AlertDialogHeader } from "../ui/alert-dialog";
import { IoMdClose } from "react-icons/io";
import { RadialChart } from "../ui/RadialChart";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type GroupModalProps = {
  group: any;
};

export const GroupModal: React.FC<GroupModalProps> = ({ group }) => {
  console.log(group);
  return (
    <>
      <div className="w-full">
        <AlertDialogTitle>{group.name}</AlertDialogTitle>
        <div className="flex">
          <RadialChart count={group.subjects.length} label={"Subjects"} />
          <RadialChart count={group.students.length} label={"Students"} />
        </div>

        <Tabs defaultValue="Subjects">
          <TabsList>
            <TabsTrigger value="Subjects">Subjects</TabsTrigger>
            <TabsTrigger value="Students">Students</TabsTrigger>
            <TabsTrigger value="Teacher">Teacher</TabsTrigger>
          </TabsList>
          <TabsContent value="Subjects">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="Students">Change your password here.</TabsContent>
        </Tabs>
        <AlertDialogCancel className="absolute top-4 right-4">
          <IoMdClose />
        </AlertDialogCancel>
      </div>
    </>
  );
};
