import React, { useState, useEffect, useRef, useReducer } from "react";
import useLocalStorage from "use-local-storage";
import Alert from "../alert/Alert";
import Confirm from "../confirm/Confirm";
import Task from "./Task";
import "./TaskManager.css";
import { taskReducer } from "../taskManager/taskReducer";

const TaskManagerReducer = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  //

  const initialState = {
    tasks,
    taskID: null,
    isEditing: false,
    isAlertOpen: false,
    alertContent: "This is an alert",
    alertClass: "success",
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    modalTitle: "delte Task",
    modalMsg: "uou about to delte task",
    modalActionText: "ok",
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
    if (name && date && state.isEditing) {
      const updateTask = {
        id: state.taskID,
        name,
        date,
        complete: false,
      };
      dispatch({
        type: "UPDATE_TASK",
        payload: updateTask,
      });
      setName("");
      setDate("");
      setTasks(
        tasks.map((task) => {
          if (task.id === updateTask.id) {
            return {
              ...task,
              name,
              date,
              complete: false,
            };
          }
          return task;
        })
      );
      return;
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

  const openEditModal = (id) => {
    dispatch({
      type: "OPEN_EDIT_MODAL",
      payload: id,
    });
  };

  const editTask = () => {
    const id = state.taskID;
    dispatch({
      type: "EDIT_TASK",
      payload: id,
    });
    const thisTask = state.tasks.find((task) => task.id === id);
    setName(thisTask.name);
    setDate(thisTask.date);
    closeModal();
  };

  const openDeleteModal = (id) => {
    dispatch({
      type: "OPED_DELETE_MODAL",
      payload: id,
    });
  };

  const deleteTask = () => {
    const id = state.taskID;
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const completeTask = (id) => {
    dispatch({
      type: "COMPLETE_TASK",
      payload: id,
    });
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: true,
          };
        }
        return tasks;
      })
    );
  };

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
    });
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
      {state.isEditModalOpen && (
        <Confirm
          modalTitle={state.modalTitle}
          modalMsg={state.modalMsg}
          modalActionText={state.modalActionText}
          modalAction={editTask}
          onCloseModal={closeModal}
        />
      )}
      {state.isDeleteModalOpen && (
        <Confirm
          modalTitle={state.modalTitle}
          modalMsg={state.modalMsg}
          modalActionText={state.modalActionText}
          modalAction={deleteTask}
          onCloseModal={closeModal}
        />
      )}

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
                    editTask={openEditModal}
                    deleteTask={openDeleteModal}
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
