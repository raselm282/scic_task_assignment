import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import AddTaskManager from "../Pages/AddTaskManager";
import AllTask from "../Pages/AllTask";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
            path: "/",
            element: <Home/>,
            
        },
        {
            path: "/addTask",
            element: <AddTaskManager/>
        },
        {
            path: '/allTask',
            element: <AllTask/>,            
        },
      ]
    },
  ]);