import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "./Heading";
import { ClipLoader } from "react-spinners";
import RouteInput from "./RouteInput";
import { IoAirplaneSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import PassengerControl from "../PassengerControl";
import Button from "../Button";

const InputModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //   const onSubmit = useCallback(
  //     async (data) => {
  //       try{
  //       }
  //   );

  {
    /*----------------RENDER INSIDE MODAL COMPONENT WITH PROPS---------*/
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome ! " subtitle="Pick your trip options" />
      <RouteInput
        id="email"
        label="Departure airport"
        icon={<IoAirplaneSharp size={25} />}
        register={register}
        date="Departing"
      />

      <RouteInput
        id="password"
        label="Arrival airport"
        icon={
          <IoAirplaneSharp size={25} style={{ transform: "rotate(-180deg)" }} />
        }
        register={register}
        date="Returning"
      />

      <PassengerControl
        id="Passenger"
        label="Hành khách"
        passenger="1 người lớn"
        icon={<FaUser size={25} />}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3 ">
      <Button
        label="Find Flight"
        containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-primary transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
    hover:text-black hover:border-primary
    active:border-primary active:text-black
    w-full text-white cursor-pointer bg-black"
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      title="Buy your ticket"
      actionLabel={
        isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Login"
      }
      //   onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default InputModal;
