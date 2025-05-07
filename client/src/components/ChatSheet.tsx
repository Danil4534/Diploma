import { AiOutlineMessage } from "react-icons/ai";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useStore } from "../store/store";
import LogoIconLight from "../assets/icons/LogoIconLight.svg";
import LogoIconBlack from "../assets/icons/LogoIconBlack.svg";
import { Image } from "./ui/Image";
import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/Input";
import { RiUnpinLine } from "react-icons/ri";
import { TiPinOutline } from "react-icons/ti";
import ChatItem from "./ChatItem";
type ChatSheetProps = {
  trigger?: React.ReactNode;
};

type Chat = {
  id: string;
  userId1: string;
  userId2: string;
};

type Message = {
  id: string;
  content: string;
  userId: string;
  chatId: string;
  created: string;
};

export const ChatSheet: React.FC<ChatSheetProps> = ({ trigger }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pinnedChats, setPinnedChats] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const socketRef = useRef<Socket>(null);
  const store = useStore();

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;
    const currentUser = store.setCurrentUser();
    socket.on("connect", () => {
      socket.emit("getAllChats");
      socket.emit("getUserChats", currentUser.id);
    });
    socket.on("userChats", (chats: Chat[]) => {
      setChats(chats);
      console.log(chats);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const filteredResults = chats
    .filter((chat: any) =>
      chat.user2.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (chat: any) =>
        !pinnedChats.some((pinnedChat) => pinnedChat.id === chat.id)
    );

  const handlePinnedChat = (chat: any) => {
    setPinnedChats((prevPinnedChats) => {
      const isPinned = prevPinnedChats.some(
        (pinnedChat) => pinnedChat.id === chat.id
      );
      if (isPinned) {
        return prevPinnedChats.filter(
          (pinnedChat) => pinnedChat.id !== chat.id
        );
      } else {
        return [...prevPinnedChats, chat];
      }
    });
  };
  return (
    <Sheet>
      <SheetTrigger>
        {trigger ?? <AiOutlineMessage size={20} color="A6A6A6" />}
      </SheetTrigger>
      <SheetContent side={"right"} className="p-0">
        <SheetHeader>
          <div className="p-2 py-4 h-screen">
            <h2 className="text-lg font-k2d mb-2">Chats</h2>

            <div className="py-4 h-screen">
              <div className="flex flex-col gap-2 ">
                <h1 className="my-2 flex gap-1 font-k2d  items-center">
                  <TiPinOutline className="text-neutral-400" />
                  Pinned
                </h1>
                {pinnedChats.map((chat: any, index: number) => (
                  <ChatItem
                    chat={chat}
                    index={index}
                    pinnedChats={pinnedChats}
                    handlePinnedChat={handlePinnedChat}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center">
                <h1 className="my-4 flex gap-1 items-center">
                  <RiUnpinLine className="text-neutral-500" />
                  All Chats
                </h1>
                <div className="relative w-3/6">
                  <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder=" Search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="caret-[#34d399] dark:bg-neutral-800 dark:placeholder:text-neutral-400"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto w-full h-screen p-2">
                {filteredResults.map((chat: any, index: number) => (
                  <ChatItem
                    chat={chat}
                    index={index}
                    pinnedChats={pinnedChats}
                    handlePinnedChat={handlePinnedChat}
                  />
                ))}
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
