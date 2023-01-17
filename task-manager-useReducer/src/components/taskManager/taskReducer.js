export const taskReducer = (state, action) => {
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
  if (action.type === "OPEN_EDIT_MODAL") {
    console.log(action.payload);
    return {
      ...state,
      taskID: action.payload,
      isEditModalOpen: true,
      modalTitle: "Edit Task",
      modalMsg: "you about to edit this task ",
      modalActionText: "Edit",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
    };
  }

  if (action.type === "EDIT_TASK") {
    return {
      ...state,
      isEditing: true,
    };
  }
  if (action.type === "UPDATE_TASK") {
    const updatedTask = action.payload;
    const id = action.payload.id;
    //find Task index
    const taskIndex = state.tasks.findIndex((task) => {
      return task.id === id;
    });
    if (taskIndex !== -1) {
      state.tasks[taskIndex] = updatedTask;
    }
    return {
      ...state,
      isEditing: false,
      isAlertOpen: true,
      alertContent: "Task Edited Successfully",
      alertClass: "success",
    };
  }
  if (action.type === "OPED_DELETE_MODAL") {
    return {
      ...state,
      taskID: action.payload,
      isDeleteModalOpen: true,
      modalTitle: "Delete Task",
      modalMsg: "You about to delete this task",
      modalActionText: "Delete",
    };
  }
  if (action.type === "DELETE_TASK") {
    const id = action.payload;
    const newTasks = state.tasks.filter((task) => task.id !== id);
    return {
      ...state,
      tasks: newTasks,
      isAlertOpen: true,
      alertContent: "Task deleted successfully",
      alertClass: "success",
      isDeleteModalOpen: false,
    };
  }
  if (action.type === "COMPLETE_TASK") {
    const id = action.payload;
    const taskIndex = state.tasks.findIndex((task) => {
      return task.id === id;
    });
    let updatedTask = {
      id,
      name: state.tasks[taskIndex].name,
      date: state.tasks[taskIndex].date,
      complete: true,
    };
    if (taskIndex !== -1) {
      state.tasks[taskIndex] = updatedTask;
    }
    return {
      ...state,
      isAlertOpen: true,
      alertContent: "Task Completed",
      alertClass: "success",
    };
  }

  return state;
};
