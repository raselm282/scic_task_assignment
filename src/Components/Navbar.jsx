/* eslint-disable no-unused-vars */
import "./Navbar.css";
import { BiSolidLogInCircle, BiSolidLogOutCircle } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import {
  // useContext,
  useEffect,
  useState,
} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();
  // console.log(user?.email, user?.displayName,user?.photoURL);
  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  // const linkss = (
  //   <>
  //     <li>
  //       <NavLink to={"/"}>Home</NavLink>
  //     </li>
  //     <li>
  //       <NavLink to={"/addTask"}>Add Task</NavLink>
  //     </li>
  //     <li>
  //       <NavLink to={"/allTask"}>All Task</NavLink>
  //     </li>
  //     <li>
  //       <NavLink to={"/register"}>Register</NavLink>
  //     </li>
  //     {/* { user && <><li><NavLink to={'/dashboard'}>Dashboard</NavLink></li></>} */}
  //     <li>
  //       <NavLink to={"/tasksAnother"}>Tasks</NavLink>
  //     </li>
  //     <li>
  //       <NavLink to={"/addTasksAnother"}>Add Tasks</NavLink>
  //     </li>
  //   </>
  // );
  const links = (
    <>
      <NavLink
        className="border border-neutral-300 hover:bg-neutral hover:text-white rounded-md px-4 py-2 flex gap-2 items-center"
        to={"/"}
      >
        <FaHome className="text-xl" /> <span>Home</span>
      </NavLink>
      <NavLink
        className="border border-neutral-300 hover:bg-neutral hover:text-white rounded-md px-4 py-2 flex gap-2 items-center"
        to="/newTask"
      >
        <FaTasks className="text-xl" /> <span>Tasks</span>
      </NavLink>
      <NavLink
        className="border border-neutral-300 hover:bg-neutral hover:text-white rounded-md px-4 py-2 flex gap-2 items-center"
        to="/addTasksAnother"
      >
        <IoMdAddCircle className="text-xl" /> <span>Add Task</span>
      </NavLink>
      {/* <NavLink
        className="border border-neutral-300 hover:bg-neutral hover:text-white rounded-md px-4 py-2 flex gap-2 items-center"
        to="/manage-tasks"
      >
        <MdMenuBook className="text-xl" /> <span>Manage Tasks</span>
      </NavLink> */}
    </>
  );

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="sticky left-0 top-0 py-2  backdrop-blur-md w-full z-50 dark:text-white/60 bg-gradient-to-r from-yellow-400/80 to-yellow-600/80 dark:from-yellow-400/50 dark:to-yellow-600/50 mx-auto">
      <div className="navbar max-w-[90%] mx-auto p-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="gap-3 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {user && links}
            </ul>
          </div>
          {/* <p>{user?.email}</p> */}
          <div className="flex  items-center justify-center">
            {/* <img
            src="task-flow-logo.webp"
            className="w-10 h-10 rounded-md"
            referrerPolicy="no-referrer"
            alt="Logo of task flow"
          /> */}
            <MdMenuBook className="text-3xl" />
            <Link to={"/"}>
              <p className="btn btn-ghost lg:text-3xl text-xl p-2 flex gap-0 items-center font-bold">
                <span>Task</span>{" "}
                <span className="text-indigo-600">Manager</span>
              </p>
            </Link>
          </div>
          {/* <Link
            to="/"
            className="flex gap-2 items-center bg-orange-200 dark:bg-orange-200/20 dark:text-white p-2 rounded-lg"
          >
            <img className='w-auto h-7 rounded-md' src={news_logo} alt='' />
            <span>Task</span> <span className="text-indigo-600">Flow</span>
          </Link> */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3">{user && links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex gap-2 items-center">
              <figure className="w-12 h-12 avatar avatar-online">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-full h-full border-4 border-indigo-500 rounded-full"
                  referrerPolicy="no-referrer"
                />
              </figure>

              <button
                onClick={handleLogOut}
                className="bg-rose-500 cursor-pointer py-2 px-5 text-white hover:bg-rose-700 rounded-md font-bold flex gap-1 items-center"
              >
                <BiSolidLogOutCircle className="text-2xl" />
                <span className="text-base">Log Out</span>
              </button>
            </div>
          ) : (
            <>
              <button className="bg-indigo-500 py-2 px-5 text-white hover:bg-indigo-700 rounded-md font-bold">
                <Link to="/login" className="flex gap-1 items-center">
                  <span className="text-base">Login</span>
                  <BiSolidLogInCircle className="text-xl" />
                </Link>
              </button>
            </>
          )}
          {/* <Link to={"/login"} className="btn">
            Login
          </Link>
          <Link to={"/register"} className="btn">
            Register
          </Link> */}
        </div>
        {/* <button
          onClick={toggleTheme}
          className="p-3 text-2xl  rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
        >
          {isDarkMode ? "Light" : "dark"}
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
