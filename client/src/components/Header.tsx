import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { useStore } from "../store/store";
import { Image } from "./ui/Image";

const Header: React.FC = () => {
  const store = useStore();
  console.log(store.currentUser);
  return (
    <header className="w-full h-24 bg-white px-10 py-2 flex justify-between items-center">
      <div>
        <h1 className="text-black font-k2d text-2xl ">
          Welcome back, {store.currentUser.name}
        </h1>
        <p className="text-neutral-400 font-k2d text-base">
          Welcome back to Unichub
        </p>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <div className="">
          <h1 className="text-black font-k2d text-base">
            {store.currentUser.name} {store.currentUser.surname}
          </h1>
          <p className="text-neutral-400 font-k2d text-sm">
            {store.currentUser.roles}
          </p>
        </div>
        <div>
          <Image
            src={store.currentUser.img}
            className="w-[45px] h-[45px] bg-red-400 rounded-full"
          />
        </div>
        <IoNotificationsOutline size={20} color="A6A6A6" />
        <AiOutlineMessage size={20} color="A6A6A6" />
      </div>
    </header>
  );
};

export default Header;
