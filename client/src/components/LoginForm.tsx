import Button from "./ui/Button";
import { Label } from "./ui/Label";
import { Image } from "./ui/Image";
import LogoIconBlack from "../assets/icons/LogoIconBlack.svg";
import { LabelInputContainer } from "./ui/LabelInputContainer";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useStore } from "../store/store";
import { FormikInput } from "./ui/FormikInput";
import axios from "axios";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const store = useStore();

  const validationSchemaLogin = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "At least 6 characters").required("Required"),
  });

  const validationSchemaOtp = Yup.object({
    otpCode: Yup.number().min(6),
  });

  const handleSubmitLoginForm = async (values: any) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: values.email,
        password: values.password,
      });
      if (response.status === 201) {
        const { accessToken } = response.data;
        document.cookie = `accessToken=${accessToken}; path=/`;
        store.setCurrentUser();
        store.setActiveOtpForm();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitOtpForm = async (values: any) => {
    try {
      const userId = store.currentUser.id;
      if (userId) {
        const response = await axios.post(
          `http://localhost:3000/auth/verify-otp/${userId}/${values.otpCode}`
        );
        console.log(response.data);
        if (response.data == "Success") {
          navigate("/homepage");
        }
      }
    } catch (e) {
      console.log(e);
    }
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
        <Image src={LogoIconBlack} className={"mr-2 animate-rotate"} />
        Sign in
      </h1>{" "}
      {!store.activeOtp ? (
        <Formik
          initialValues={store.initialValuesLogin}
          validationSchema={validationSchemaLogin}
          onSubmit={(values) => handleSubmitLoginForm(values)}
        >
          <Form className="mt-8 justify-items-center items-center animate-fadeIn">
            <div className="mb-4 flex-col w-full  md:flex-row md:space-y-0 ">
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <FormikInput
                  name="email"
                  placeholder="testmail@gmail.com"
                  type="email"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-2">
                <Label htmlFor="password">Password</Label>
                <FormikInput
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </LabelInputContainer>
            </div>
            <div className="w-[150px] h-0.5 mt-[76px] bg-slate-500"></div>
            <div className="justify-items-center">
              <Button
                content={"Sign in"}
                type="submit"
                className=" w-[382px] mt-4 font-k2d text-xl"
              />
              <p className="font-medium">
                Don`t have an account?
                <span className="font-normal mx-1">
                  <Link to="/register">Sign up</Link>
                </span>
              </p>
            </div>
          </Form>
        </Formik>
      ) : (
        <Formik
          initialValues={store.initialValuesOtp}
          validationSchema={validationSchemaOtp}
          onSubmit={(values) => handleSubmitOtpForm(values)}
        >
          <Form className="mt-8 justify-items-center items-center ">
            <div className="flex-col w-full  md:flex-row md:space-y-0 justify-items-center animate-fadeIn ">
              <LabelInputContainer className="mb-2 ">
                <Label htmlFor="password" className="text-center">
                  Your Verification Code
                </Label>
                <FormikInput
                  name="otpCode"
                  placeholder="4-digit code"
                  type="text"
                  className="text-center text-xl"
                />
              </LabelInputContainer>
              <Button
                content={"Sign in securely"}
                type="submit"
                className=" w-[382px] mt-4 font-k2d text-xl"
              />
              <p
                className="font-k2d pt-4 cursor-pointer hover:underline"
                onClick={() => store.setDisActiveOtpForm()}
              >
                Cancel
              </p>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default LoginForm;
