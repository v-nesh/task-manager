import React, { useState, useEffect, useRef, useReducer } from "react";
import useLocalStorage from "use-local-storage";
import Alert from "../alert/Alert";
import Confirm from "../confirm/Confirm";
import Task from "./Task";
import "./TaskManager.css";

const taskReducer = (state, action) => {
  //
  if (action.type === "EMPTY_FIELD") {
    return {
      ...state,
      isAlertOpen: true,
      alertContent: "Please Enter the Name And Date",
      alertClass: "danger",
    };
  }
  if (action.type === "CLOSE_ALERT") {
    return { ...state, isAlertOpen: false };
  }
  if (action.type === "ADD_TASK") {
    const allTasks = [...state.tasks, action.payload];
    return {
      ...state,
      tasks: allTasks,
      isAlertOpen: true,
      alertContent: "Task added Successfully",
      alertClass: "success",
    };
  }
  return state;
};

const TaskManagerReducer = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const [taskId, setTaskId] = useState(null);

  //

  const initialState = {
    tasks,
    taskId: null,
    isEditing: false,
    isAlertOpen: false,
    alertContent: "This is an alert",
    alertClass: "success",
  };

  //
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    //
    if (!name || !date) {
      dispatch({
        type: "EMPTY_FIELD",
      });
    }
    if (name && date) {
      const newTask = {
        id: Date.now(),
        name,
        date,
        complete: false,
      };
      dispatch({
        type: "ADD_TASK",
        payload: newTask,
      });
      setName("");
      setDate("");
      setTasks([...tasks, newTask]);
    }
  };

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const handleEditTask = (id) => {
    //
  };

  const deleteTask = (id) => {
    //
  };

  const completeTask = (id) => {
    //
  };

  const closeAlert = () => {
    //
    dispatch({
      type: "CLOSE_ALERT",
    });
  };

  return (
    <div className="--bg-primary">
      {state.isAlertOpen && (
        <Alert
          alertContent={state.alertContent}
          alertClass={state.alertClass}
          onCloseAlert={closeAlert}
        />
      )}

      {/* <Confirm /> */}
      <h1 className="--text-center --text-light">Task Manager Reducer</h1>
      <div className="--flex-center --p">
        <div className="--card --bg-light --width-500px --p --flex-center">
          <form className="form --form-control" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Task</label>
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Task Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                placeholder="Task Name"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button className="--btn --btn-success --btn-block">
              {state.isEditing ? "Edit Task" : "Save Task"}
            </button>
          </form>
        </div>
      </div>
      {/* task */}
      <article className="--flex-center --my2">
        <div className="--width-500px --p">
          <h2 className="--text-light">Task list</h2>
          <hr style={{ backGround: "#fff" }} />
          {state.tasks.length === 0 ? (
            <p className="--text-light">No task added</p>
          ) : (
            <div>
              {state.tasks.map((task) => {
                return (
                  <Task
                    {...task}
                    editTask={handleEditTask}
                    deleteTask={deleteTask}
                    completeTask={completeTask}
                  />
                );
              })}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default TaskManagerReducer;
