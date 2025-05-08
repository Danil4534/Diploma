import React from "react";
import { Image } from "./ui/Image";
import LogoIconLight from "../assets/icons/LogoIconLight.svg";
import LogoIconBlack from "../assets/icons/LogoIconBlack.svg";
import { useStore } from "../store/store";
import { RiUnpinLine } from "react-icons/ri";
import { TiPinOutline } from "react-icons/ti";
type ChatItemProps = {
  index: number;
  chat: any;
  pinnedChats: any;
  handlePinnedChat: (chat: any) => void;
};
export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  index,
  pinnedChats,
  handlePinnedChat,
}) => {
  const store = useStore();
  return (
    <div
      className="relative p-2 flex w-full h-20 gap-2 shadow-sm border-t-2 bg-white border-emerald-300  dark:bg-neutral-800 cursor-pointer hover:bg-white animate-rightIn animate-fill-forwards"
      key={index}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {chat.user2.img ? (
        <Image
          src={chat.user2.img}
          className={
            chat.user2.activeStatus == "Online"
              ? " border-2 border-green-300 p-1 rounded-full w-16 h-16  dark:border-2 dark:border-emerald-400"
              : "border-2 border-neutral-400 p-1 rounded-full w-16 h-16 dark:border-neutral-200 dark:border-2"
          }
        />
      ) : (
        <div className="border border-neutral-300 rounded-full w-14 h-14 items-center flex justify-center">
          {store.theme === "dark" ? (
            <Image src={LogoIconLight} className="animate-rotate size-5" />
          ) : (
            <Image src={LogoIconBlack} className="animate-rotate size-5" />
          )}
        </div>
      )}

      {chat.user2.name}
      <button
        onClick={() => handlePinnedChat(chat)}
        className="absolute top-2 right-2"
      >
        {pinnedChats.some(
          (pinnedChat: { id: any }) => pinnedChat.id === chat.id
        ) ? (
          <RiUnpinLine className="text-neutral-500" />
        ) : (
          <TiPinOutline className="text-neutral-400" />
        )}
      </button>
    </div>
  );
};

export default ChatItem;
