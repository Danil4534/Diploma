import React from "react";
import { AlertDialogCancel, AlertDialogTitle } from "../ui/alert-dialog";
import { IoMdClose } from "react-icons/io";
import { useStore } from "../../store/store";
import LogoIconLight from "../../assets/icons/LogoIconLight.svg";
import LogoIconBlack from "../../assets/icons/LogoIconBlack.svg";
import { Image } from "../ui/Image";
type InviteStudentModalProps = {
  group: any;
};

export const InviteStudentModal: React.FC<InviteStudentModalProps> = ({
  group,
}) => {
  const store = useStore();

  return (
    <>
      <AlertDialogTitle>
        <div className="w-full font-k2d text-4xl flex gap-2">
          {store.theme === "dark" ? (
            <Image src={LogoIconLight} className="animate-rotate size-10" />
          ) : (
            <Image src={LogoIconBlack} className="animate-rotate size-10" />
          )}
          Invite Student
        </div>
      </AlertDialogTitle>
      <AlertDialogCancel className="absolute top-4 right-4">
        <IoMdClose />
      </AlertDialogCancel>
    </>
  );
};
