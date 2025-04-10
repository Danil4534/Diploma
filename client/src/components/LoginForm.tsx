import { cn } from "../lib/utils";
import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Image } from "./ui/Image";
import LogoIconBlack from "../assets/icons/LogoIconBlack.svg";
import { LabelInputContainer } from "./ui/LabelInputContainer";
import { Link } from "react-router-dom";
const LoginForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="animate-fadeIn border border-solid border-emerald-400 shadow-input mx-auto w-[450px] max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-white light:bg-white ">
      <h2 className="text-xl font-bold font-k2d text-neutral-800 dark:text-black">
        Welcome to UNICHUB
      </h2>
      <p className=" max-w-sm text-sm text-neutral-400 dark:text-neutral-400">
        university platform
      </p>
      <h1 className="font-k2d text-3xl mt-6 flex items-end ">
        <Image src={LogoIconBlack} className={"mr-2"} />
        Sign in
      </h1>
      <form
        className="mt-8 justify-items-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex-col w-full  md:flex-row md:space-y-0 ">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="testmail@gmail.com" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Password" type="password" />
          </LabelInputContainer>
        </div>
        <div className="w-[150px] h-0.5 mt-[76px] bg-slate-500"></div>
        <div className="justify-items-center">
          <Button
            content={"Sing in"}
            type="submit"
            className=" w-[382px] mt-4"
          />
          <p className="font-medium">
            Don`t have an account?
            <span className="font-normal mx-1">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
