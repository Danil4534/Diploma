import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Image } from "./ui/Image";
import LogoIconBlack from "../assets/icons/LogoIconBlack.svg";
import { LabelInputContainer } from "./ui/LabelInputContainer";
import { UploadFile } from "./ui/UploadFile";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="animate-fadeIn border border-solid border-emerald-400 shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-white light:bg-white">
      <h2 className="text-xl font-bold font-k2d text-neutral-800 dark:text-black">
        Welcome to UNICHUB
      </h2>
      <p className=" max-w-sm text-sm text-neutral-400 dark:text-neutral-400">
        university platform
      </p>
      <div className="flex justify-around items-center">
        <h1 className="font-k2d text-3xl mt-6 flex items-end ">
          <Image src={LogoIconBlack} className={"mr-2 animate-rotate"} />
          Sign up
        </h1>
        <div className="w-1/2 z-10 h-auto">
          <UploadFile />
        </div>
      </div>
      <form
        className="mt-8 justify-items-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-2 flex gap-2 ">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">First Name</Label>
            <Input id="name" placeholder="John" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-2">
            <Label htmlFor="surname">Surname</Label>
            <Input id="surname" placeholder="Doe" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="example@example.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+380....." type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="Password" type="password" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-2">
          <Label htmlFor="info">Sex</Label>
          <Input id="info" placeholder="Male" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-2">
          <Label htmlFor="info">Info</Label>
          <Input id="info" placeholder="Senior Lecturer" type="text" />
        </LabelInputContainer>
        <div className="w-[150px] h-0.5 mt-[20px] bg-slate-500"></div>
        <div className="justify-items-center">
          <Button
            content={"Sign in"}
            type="submit"
            className=" w-[382px] mt-4 font-k2d text-xl"
          />
          <p className="font-medium">
            Already have an account?
            <span className="font-normal mx-1">
              <Link to="/login">Sign in</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
