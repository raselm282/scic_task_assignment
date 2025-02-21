import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import AddTaskManager from "../Pages/AddTaskManager";
import AllTask from "../Pages/AllTask";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import UpdateTask from "../Pages/UpdateTask";
import Tasks from "../Pages/Tasks";
import AddTask from "../Pages/AddTask";
import UpdateNewTask from "../Pages/UpdateNewTask";
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
        {
            path: '/tasksAnother',
            element: <Tasks/>,            
        },
        {
            path: '/addTasksAnother',
            element: <AddTask/>,            
        },
        {
            path: '/updateNewTask/:id',
            element: <UpdateNewTask/>,            
        },
        {
            path: '/updateTask/:id',
            element: <UpdateTask/>,            
        },
        {
            path: '/register',
            element: <Register/>,            
        },
        {
            path: '/login',
            element: <Login/>,            
        },
      ]
    },
  ]);