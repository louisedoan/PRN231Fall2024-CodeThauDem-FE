
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useRegisterModal from "../../hooks/useRegisterModal";
import PopUpModal from "./PopupModal";
import ModalHead from "./ModalHead";
import InputField from "./InputField";
import toast from "react-hot-toast";
import useLoginModal from "../../hooks/useLoginModal";
import { ClipLoader } from "react-spinners";
import { registerUser } from "../../../lib/api/Authen";

const emailUsernameRegex = /^[a-zA-Z0-9.]+$/;

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      emailUsernameRegex,
      "Email is invalid. Only letters (a-z), numbers (0-9), and periods (.) are allowed."
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValue: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        setIsLoading(true);
        const emailWithDomain = `${data.email}@gmail.com`;
        await registerUser(emailWithDomain, data.password);
        setIsLoading(false);
        registerModal.onClose();
        toast.success("User registered successfuly!");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("Email already exist!");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [registerModal]
  );

  const toogle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  {
    /*----------------RENDER INSIDE MODAL COMPONENT WITH PROPS---------*/
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ModalHead
        title="Welcome to FlightEase ! "
        subtitle="Let's create an account and travel with us"
      />

      <InputField
        id="email"
        label="Email"
        domain="@gmail.com"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <InputField
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <InputField
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword.message}</p>
      )}
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3 ">
      <hr />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toogle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PopUpModal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel={
        isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Continue"
      }
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
