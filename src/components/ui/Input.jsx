const Input = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  icon,
  isShowOnly,
  fixedPassenger,
  date
}) => {
  return (
    <div className="w-full flex overflow-hidden border-2 border-black relative bg-white rounded-2xl">
      <div className="flex items-center w-full">
        {/* Icon on the left */}
        {icon && (
          <div className="pl-4 flex items-center justify-center">
            <div className="icon">{icon}</div>
          </div>
        )}

        <input
          id={id}
          disabled={disabled}
          readOnly={isShowOnly}
          {...register(id)}
          placeholder=" "
          type={type}
          className={`peer w-full p-4 pt-6 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
            
            `}
        />
        <label
          className={`absolute text-md font-semibold duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ml-10
        
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        `}
        >
          {label}
        </label>
      </div>

      
      <button className="flex p-2 items-center border-l-2 border-grey-300 flex-row justify-start pr-14">
        <div className="flex ml-[10px] flex-shrink-0 font-semibold">{date}</div>
      </button>
    </div>
  );
};
export default Input;
