import { AiOutlineMessage } from "react-icons/ai";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useStore } from "../store/store";
import axios from "axios";
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

  const socketRef = useRef<Socket>(null);
  const store = useStore();

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;
    socket.on("connect", () => {
      console.log("Connected");
      socket.emit("getChats", store.currentUser.id);
    });
    socket.on("chatsUpdated", (data: Chat[]) => {
      console.log("Received chats:", data);
      setChats(data);
    });

    socket.on("messages", (msgs: Message[]) => {
      setMessages(msgs);
    });

    const handleUser = async (userId2: string) => {
      const response = await axios.get(`http://locahost:3000/${userId2}`);
      return response.data;
    };
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        {trigger ?? <AiOutlineMessage size={20} color="A6A6A6" />}
      </SheetTrigger>
      <SheetContent side={"right"} className="p-0">
        <SheetHeader>
          <div className="p-4">
            <>
              <div>
                <h2 className="text-lg font-bold mb-2">Your Chats</h2>
                <ul className="space-y-2">
                  {chats.map((chat) => (
                    <div
                      className="w-full h-20 shadow-sm border-t-2 border-emerald-300 rounded-md"
                      key={chat.id}
                    ></div>
                  ))}
                </ul>
              </div>
            </>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
