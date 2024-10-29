import { useCallback, useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import * as yup from "yup";

import useLoginModal from "../../components/hooks/useLoginModal";

import Button from "../../components/ui/Button";
import Logo from "../../components/layout/navbar/Logo";
import { BackgroundLines } from "./components/BackgroundLine";
import InputField from "../../components/ui/popup-modal/InputField";
import { resetPassword } from "../../lib/api/Authen";

const PasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const schema = yup.object().shape({
    token: yup.string().notRequired(),
    newPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
      token: "",
    },
  });

  useEffect(() => {
    const token = searchParams.get("token");

    // If both email and token are found, set them as the default values
    if (token) {
      setValue("token", token);
    }
  }, [searchParams, setValue]);

  const onSubmit = useCallback(
    async (data) => {
      try {
        setIsLoading(true);
        const result = await resetPassword(data.token, data.newPassword);
        console.log(result);

        setIsLoading(false);
        console.log(data.token);
        console.log(data.newPassword);
        if (result.message) {
          toast.success(result.message);
          navigate("/");
          loginModal.onOpen();
        } else {
          toast.error(result.message || "Something went wrong");
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, loginModal]
  );

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
                Reset Password
              </h2>
              <div className="flex flex-col gap-3">
                {/* <Input
                  id="email"
                  placeholder=""
                  type="email"
                  label="Email của bạn"
                  disabled={true}
                  register={register}
                  errors={errors}
                  required
                /> */}
                <InputField
                  id="newPassword"
                  placeholder=""
                  type="password"
                  label="New password"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                {errors.newPassword && (
                  <p className="text-red-500">{errors.newPassword.message}</p>
                )}
                <InputField
                  id="confirmNewPassword"
                  placeholder=""
                  type="password"
                  label="Confirm new password"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                {errors.confirmNewPassword && (
                  <p className="text-red-500">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </div>

              <div className="my-10 flex justify-center">
                <Button
                  label="Change Password"
                  containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-secondary transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                    hover:text-black hover:border-primary
                    active:border-primary active:text-black
                    w-full text-white cursor-pointer bg-black"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ClipLoader size={24} color="#fff" />
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
};

export default PasswordReset;
