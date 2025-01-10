import { Link } from "react-router";
import { FaGithub } from "react-icons/fa";
import { RiMenuFill } from "react-icons/ri";
import { GoChevronDown } from "react-icons/go";

const Navbar = () => {
  return (
    <div
      className="fixed w-full justify-between items-center h-20 flex z-20 bg-[#F9F7EE] 
             bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]
     text-neutral-950 hover:text-neutral-800 px-4 md:px-8 lg:px-16 opacity-100"
    >
      {/* <Background /> */}
      <Link to="/" className="text-3xl font-bold">
        Graphique
      </Link>

      <div className=" flex-row items-center gap-6 hidden lg:flex">
        <div className="flex-row items-center flex gap-4  text-lg">
          <Link to="/" className="p-3">
            Home
          </Link>
          <Link to="#" className="p-3">
            <Features />
          </Link>
          <Link to="/main" className="p-3">
            {" "}
            Main{" "}
          </Link>
        </div>

        <div className="flex items-center gap-3"></div>
      </div>
      <div className="flex items-center gap-3">
        <button className="h-9 w-9 hidden lg:flex sm:w-fit font-medium sm:scale-100 sm:py-5 sm:px-2.5  justify-center items-center rounded-3xl bg-slate-50 border hover:bg-slate-950 hover:text-slate-50 ">
          {" "}
          <FaGithub /> &nbsp; <span className="hidden sm:block">
            {" "}
            Github
          </span>{" "}
        </button>
        <button className="h-9 w-9 hidden lg:flex sm:w-fit font-medium sm:scale-100 sm:py-5 sm:px-2.5 justify-center items-center rounded-3xl bg-slate-50 border hover:bg-slate-950 hover:text-slate-50">
          &nbsp; <span className="hidden sm:block">Log in</span>
        </button>
        <span className="text-3xl block lg:hidden">
          <RiMenuFill />
        </span>
      </div>
    </div>
  );
};

export default Navbar;

function Features() {
  return (
    <div className="flex items-center">Features &nbsp; <GoChevronDown /> </div>
  );
}
