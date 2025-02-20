import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllTask = () => {
    const [allTask, setAllTask] = useState([]);
  const navigate = useNavigate()
//   const [sort, setSort] = useState('')
  useEffect(() => {
    fetchAllData();
  }, []);
  const fetchAllData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/tasks`
    );
    setAllTask(data);
  };
  console.log(allTask);
  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">All allTask</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTask.map((task, i) => (
            <div
              key={i}
              className=" dark:bg-gray-900 dark:text-white/60 bg-white shadow-md  overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{task.title}</h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {task?.description}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {task?.categorized}
                </p>
                
                
                {task.createdAt && (
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">createdAt:</span>{" "}
                    {format(new Date(task?.createdAt), "PP")}
                    {/* {task?.createdAt} */}
                  </p>
                )}
                <button
                  onClick={() => navigate(`/allTask/${task._id}`)}
                  className="mt-3 px-4 py-2 dark:bg-[#ff5722]/50 dark:text-white/60 dark:hover:bg-[#ec3c06]/50 bg-[#ff5722] hover:bg-[#ec3c06] text-white rounded-lg transition-colors"
                >
                  See Details
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
