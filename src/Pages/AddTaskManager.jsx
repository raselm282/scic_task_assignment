/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
// import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
// import useAuth from "../Hooks/useAuth";

const AddTaskManager = () => {
    const navigate = useNavigate()
    // const {user} = useAuth()
    const [createdAt, setCreatedAt] = useState(new Date())

    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        
        const categorized = form.categorized.value
        
        const description = form.description.value
        const formData = {
          title,
        //   buyer: {
        //     email: user?.email,
        //     name: user?.displayName,
        //     photo: user?.photoURL,
        //   },
          categorized,
          createdAt,
          description,
          
        }
        // const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/add-mara`, formData)
        // cons(data);
        try {
          // 1. make a post request
          await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, formData)
          // 2. Reset form
          form.reset()
          // 3. Show toast and navigate
          alert('Marathon Added Successfully!!!')
          navigate('/allTask')
        } catch (err) {
          alert(err.message)
        }
      }
  return (
    <div className="flex justify-center items-center my-12 w-full dark:bg-gray-900 dark:text-white/60">
      {/* <HelmetProvider>
        <Helmet>
          <title>Dashboard | Add Marathon</title>
        </Helmet>
      </HelmetProvider> */}

      <div className="dark:bg-gray-900 dark:text-white/60 p-12 w-[90%] mx-auto bg-[#F4F3F0] rounded-md shadow-md ">
        <h2 className="text-3xl pb-5 font-bold dark:text-white/60 text-gray-700 capitalize text-center">
          Post a Task
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 dark:bg-gray-900 dark:text-white/60">
            <div>
              <label
                className="text-gray-700 dark:text-white/60"
                htmlFor="job_title"
              >
                 Title
              </label>
              <input
                id="title"
                name="title"
                placeholder="Enter Title"
                type="text"
                className="block w-full dark:bg-gray-900 dark:text-white/60 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

           
            <div className="flex flex-col gap-2  dark:bg-gray-900 dark:text-white/60">
              <label
                className="text-gray-700 dark:text-white/60"
                htmlFor="category"
              >
                Categorized
              </label>
              <select
                name="categorized"
                id="categorized"
                defaultValue={"categorized"}
                className="border dark:bg-gray-900 dark:text-white/60 p-2 rounded-md"
              >
                <option disabled>Categorized</option>
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            

            {/* Image URL
            <div className=" dark:bg-gray-900 dark:text-white/60">
              <label className="dark:text-white/60">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                name="photo"
                // value={formData?.imageUrl}
                // onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full dark:bg-gray-900 dark:text-white/60 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                required
              />
            </div> */}
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label
              className="text-gray-700 dark:text-white/60 "
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="block w-full dark:bg-gray-900 dark:text-white/60 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              id="description"
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 dark:bg-[#ff5722]/50 dark:text-white/60 dark:hover:bg-[#ec3c06]/50 bg-[#ff5722] hover:bg-[#ec3c06] rounded-md focus:outline-none focus:bg-gray-600">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskManager;
