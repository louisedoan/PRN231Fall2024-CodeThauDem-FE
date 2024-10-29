import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Button from "../../components/ui/Button";
import Logo from "../../components/layout/navbar/Logo";
import { BackgroundLines } from "./components/BackgroundLine";
import InputField from "../../components/ui/popup-modal/InputField";
import { forgotPassword } from "../../lib/api/Authen";

const PasswordForgot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(async (data) => {
    try {
      setIsLoading(true);
      const result = await forgotPassword(data.email);
      console.log(result);

      setIsLoading(false);
      console.log(result);
      if (result.message) {
        toast.success(result.message);
        navigate("/");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <BackgroundLines className="pointer-events-none flex w-full flex-col items-center justify-center px-4">
      <div className="pointer-events-auto z-20 mb-12 cursor-pointer">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="pointer-events-auto z-20 w-full bg-white">
        <div className="flex flex-col items-center justify-center px-4 py-6">
          <div className="w-full max-w-md">
            <div className="rounded-3xl p-8 shadow-2xl">
              <h2 className="mb-16 text-center text-2xl font-bold text-black">
                Enter your email account
              </h2>
              <InputField
                id="email"
                placeholder=""
                type="email"
                label="Your email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <div className="my-10 flex justify-center">
                <Button
                  label={
                    isLoading ? (
                      <ClipLoader size={24} color="white" />
                    ) : (
                      "Procceed"
                    )
                  }
                  containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-secondary transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                    hover:text-black hover:border-primary
                    active:border-primary active:text-black
                    w-full text-white cursor-pointer bg-black"
                  onClick={handleSubmit(onSubmit)}
                  disable={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
};

export default PasswordForgot;
