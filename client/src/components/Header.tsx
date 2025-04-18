import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { useStore } from "../store/store";
import { Image } from "./ui/Image";
import Button from "./ui/Button";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useEffect } from "react";
import { Switch } from "./ui/switch";

const Header: React.FC = () => {
  const store = useStore();
  console.log(store.theme);
  const navigate = useNavigate();
  const LogoutUser = async () => {
    try {
      await axios.post(
        `http://localhost:3000/auth/logout/${store.currentUser.id}`
      );
      store.setActiveLoginForm();
      navigate("/login");
      store.clearCookie();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    store.setCurrentUser();
  }, []);
  return (
    <header className="w-full h-24 bg-white px-10 py-1 flex justify-between items-center animate-topIn shadow-sm">
      <div className="flex items-center gap-20">
        <div>
          <h1 className="text-black font-k2d text-2xl ">
            Welcome back, {store.currentUser?.name}
          </h1>
          <p className="text-neutral-400 font-k2d text-base">
            Welcome back to Unichub
          </p>
        </div>
        <div>
          <SearchInput />
        </div>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <div>
          <Switch onCheckedChange={() => store.setTheme()} />
        </div>
        <NavLink to={"profile"}>
          <h1 className="text-black font-k2d text-base">
            {store.currentUser?.name} {store.currentUser?.surname}
          </h1>
          <div className="flex w-full">
            {store.currentUser?.roles.map((item: string, index: number) => (
              <div key={index}>
                <p className="font-k2d text-sm bg-slate-300 rounded-2xl py-0.5 px-1 text-white">
                  {item.toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </NavLink>
        <div>
          <Image
            src={store.currentUser?.img}
            className="w-[45px] h-[45px] bg-red-400 rounded-full"
          />
        </div>
        <IoNotificationsOutline size={20} color="A6A6A6" />
        <AiOutlineMessage size={20} color="A6A6A6" />
        <Button type="button" content={"Logout"} action={() => LogoutUser()} />
      </div>
    </header>
  );
};

export default Header;
