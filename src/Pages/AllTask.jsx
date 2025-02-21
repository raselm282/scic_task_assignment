import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AllTask = () => {
  const [allTask, setAllTask] = useState([]);
  const navigate = useNavigate();
  //   const [sort, setSort] = useState('')
  useEffect(() => {
    fetchAllData();
  }, []);
  const fetchAllData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
    setAllTask(data);
  };
  console.log(allTask);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`
      );
      toast.success("Data Deleted Successfully!!!");
      fetchAllData();
    } catch (err) {
      toast.error(err.message);
    }
  };
  const modernDelete = (id) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="p-6 bg-sky-100">
        <h1 className="text-2xl font-bold mb-6 text-center">TODO</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTask.map((task, i) => (
            <div
              key={i}
              className=" dark:bg-gray-900 dark:text-white/60 bg-white shadow-md  overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-4">
                <div className=" flex justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold mb-2">{task.title}</h2>
                    <p className="text-gray-600 mb-2">
                      {/* <span className="font-semibold">Description:</span>{" "} */}
                      {task?.description}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-600 mb-2">
                      {/* <span className="font-semibold">Category:</span>{" "} */}
                      {task?.categorized}
                    </p>
                    {task.createdAt && (
                      <p className="text-gray-600 mb-2">
                        {/* <span className="font-semibold">createdAt:</span>{" "} */}
                        {format(new Date(task?.createdAt), "PP")}
                        {/* {task?.createdAt} */}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/updateTask/${task._id}`)}
                  className="mt-3 px-4 py-2 dark:bg-[#ff5722]/50 dark:text-white/60 dark:hover:bg-[#ec3c06]/50 bg-slate-300 hover:bg-slate-500  rounded-lg transition-colors mr-3"
                >
                  ✏️
                </button>
                <button
                onClick={() => modernDelete(task._id)}
                  // onClick={() => modernDelete(task._id)}
                  className="mt-3 px-4 py-2 dark:bg-white/50 dark:text-white/60 dark:hover:bg-[#ec3c06]/50 bg-slate-300 hover:bg-slate-500  rounded-lg transition-colors"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTask;
