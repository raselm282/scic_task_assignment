import axios from "axios";
import { useContext } from "react";
import { FaCalendarWeek } from "react-icons/fa";
import { MdDescription, MdTitle } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import Loading from "../../components/Loading/Loading";
import AuthContext from "../AuthContext/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    data: tasks = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["tasks", user?.uid],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/anotherTasks?uid=${user?.uid}`
      );
      return response.data;
    },
  });

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedTasks = [...tasks];

    // Find the moved task
    const movedTask = updatedTasks[source.index];

    // Remove the task from its original position
    updatedTasks.splice(source.index, 1);

    // Insert the task at its new position
    updatedTasks.splice(destination.index, 0, movedTask);

    // Update the task's category and index
    movedTask.Category = destination.droppableId;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/newTasks/${movedTask._id}`,
        {
          Category: movedTask.Category,
          newIndex: destination.index, // Send the new position to backend
        }
      );

      if (response.data.modifiedCount > 0) {
        toast.success("Task Moved Successfully");

        // Refetch tasks from the backend to reflect the correct order
        refetch();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/deleteTasks/${id}`);
      toast.success("Data Deleted Successfully!!!");
      refetch();
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

  if (isPending) return <p className="text-5xl">Loading...</p>;

  return (
    <div className="lg:w-[90%] w-11/12 mx-auto bg-gradient-to-r from-yellow-400/80 to-yellow-600/80 dark:from-yellow-400/50 dark:to-yellow-600/50">
      <h1 className="md:text-4xl text-3xl text-center text-black py-5 font-bold mb-3">
        Task Board
      </h1>

      {/* Task Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="card bg-yellow-400/20 shadow-md p-4 rounded-md"
                >
                  <h2 className="text-xl font-bold text-black">{category}</h2>
                  <div>
                    {tasks
                      .filter((task) => task?.Category === category)
                      .map((task, index) => (
                        <Draggable
                          key={task?._id}
                          draggableId={task?._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card-body space-y-1 bg-indigo-600/40   mt-4 border border-neutral-300 hover:scale-105 hover:shadow-xl rounded-md p-3"
                            >
                              <div className="flex justify-between items-center mb-1">
                                <img
                                  src={user?.photoURL}
                                  alt={user?.displayName}
                                  className="w-10 h-10 rounded-full avatar border-4 border-indigo-500"
                                  referrerPolicy="no-referrer"
                                />

                                <h4 className="text-base text-black/90 font-semibold">
                                  {user?.displayName}
                                </h4>
                              </div>
                              <h3 className="text-black/90 font-bold flex gap-2 items-center">
                                <MdTitle className="text-lg" />{" "}
                                <span className="text-black">{task?.Title}</span>
                              </h3>
                              <p className="text-black/80 font-semibold flex gap-2 items-center">
                                <MdDescription className="text-lg" />
                                <span className="text-sm">
                                  {task?.Description}
                                </span>
                              </p>

                              <p className="flex gap-2 items-center font-semibold text-black/80">
                                <FaCalendarWeek className="text-base" />{" "}
                                <span className="text-sm">
                                  {new Date(task?.TimeStamp).toLocaleString(
                                    "en-UK"
                                  )}
                                </span>
                              </p>
                              <div className="text-right">
                                <button
                                  onClick={() =>
                                    navigate(`/updateNewTask/${task._id}`)
                                  }
                                  className="mt-3 p-2 dark:bg-[#ff5722]/50 dark:text-white/60 dark:hover:bg-[#ec3c06]/50 hover:bg-white/50  rounded-lg transition-colors mr-3"
                                >
                                  ✏️
                                </button>
                                <button
                                  onClick={() => modernDelete(task._id)}
                                  // onClick={() => modernDelete(task._id)}
                                  className="mt-3 p-2 dark:bg-white/50 dark:text-white/60 dark:hover:bg-[#ec3c06]/50 hover:bg-white/50  rounded-lg transition-colors"
                                >
                                  ❌
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
