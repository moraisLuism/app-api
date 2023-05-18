import { BsFillCartFill } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="fixed h-16 w-full bg-sky-600 bottom-0 flex justify-evenly items-center">
      <div className="flex items-center gap-2">
        <BsFillCartFill className="text-2xl text-white" />
        <span className="text-xl font-semibold text-white">
          Ecommerce devCamp
        </span>
      </div>
    </div>
  );
};

export default Footer;
