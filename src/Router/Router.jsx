import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
// import AddTaskManager from "../Pages/AddTaskManager";
// import AllTask from "../Pages/AllTask";
// import UpdateTask from "../Pages/UpdateTask";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Tasks from "../Pages/Tasks";
import AddTask from "../Pages/AddTask";
import UpdateNewTask from "../Pages/UpdateNewTask";
import PrivateRoute from "./PrivateRoute";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },        
        {
            path: '/newTask',
            element: <PrivateRoute><Tasks/></PrivateRoute>,            
        },
        {
            path: '/addTasksAnother',
            element: <PrivateRoute><AddTask/></PrivateRoute>,            
        },
        {
            path: '/updateNewTask/:id',
            element: <PrivateRoute><UpdateNewTask/></PrivateRoute>,            
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