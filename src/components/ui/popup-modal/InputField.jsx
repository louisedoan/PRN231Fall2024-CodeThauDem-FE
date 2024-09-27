
import { BiDollar } from "react-icons/bi";

const InputField = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  domain,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
            
            ${formatPrice ? "pl-9" : "pl-4"}
            ${errors[id] ? "border-rose-500" : "border-neutral-300"}
            ${
              errors[id]
                ? "focus:border-rose-500"
                : "focus:border-neutral-black"
            }
            `}
      />
      {domain && (
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-700">
          {domain}
        </span>
      )}

      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] 
        
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-rose-500" : "text-zinc-400"}  
        `}
      >
        {label}
      </label>
    </div>
  );
};
export default InputField;
