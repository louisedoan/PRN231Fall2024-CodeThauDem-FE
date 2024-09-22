import { OptionBtn } from "./OptionBtn";

const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-3xl font-bold text-white ">{title}</div>
      <div className="font-semibold text-white mt-2">{subtitle}</div>
      <OptionBtn/>
    </div>
  );
};

export default Heading;
