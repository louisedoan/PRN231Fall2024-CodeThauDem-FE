"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import { CgArrowsExchangeAltV } from "react-icons/cg";

const Modal = ({
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  return (
    <>
      <div className="">
        <div className="relative max-w-[450px]  my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/*----------------------MODAL CONTENT HERE-------------------*/}
          <div>
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-secondary outline-none focus:outline-none ">
              {/*----------MODAL HEADER HERE----------------------*/}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <div className="text-2xl font-semibold text-white">{title}</div>
              </div>
              {/*----------------MODAL BODY HERE----------------*/}
              <div className="relative p-6 flex-auto">
                <div className="absolute top-52 left-0 p-1 ">
                  <CgArrowsExchangeAltV size={25} />
                </div>

                {body}
              </div>
              {/*----------------MODAL FOOTER HERE----------------*/}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && <Button />}

                  <Button />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
