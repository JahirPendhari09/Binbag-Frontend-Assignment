import { DELETE_TASK, ERROR, GET_TASKS, LOADING, PATCH_TASK, POST_TASKS } from "./actionTypes";

// Helper function to get tasks from localStorage
const getLocalStorageTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

// Helper function to save tasks to localStorage
const saveLocalStorageTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// GET TASKS
export const getTasks = () => (dispatch) => {
    dispatch({ type: LOADING });

    return new Promise((resolve, reject) => {
        try {
            const tasks = getLocalStorageTasks();
            dispatch({ type: GET_TASKS, payload: tasks });
            resolve(tasks);
        } catch (err) {
            dispatch({ type: ERROR });
            reject(err);
        }
    });
};

// ADD TASK
export const postTasks = (newTask) => (dispatch) => {
    dispatch({ type: LOADING });

    return new Promise((resolve, reject) => {
        try {
            const tasks = getLocalStorageTasks();
            const updatedTask = { ...newTask, id: Date.now() };
            const updatedTasks = [...tasks, updatedTask];
            saveLocalStorageTasks(updatedTasks);

            dispatch({ type: POST_TASKS, payload: updatedTasks }); 
            alert("New Task Added");
            resolve(updatedTask);
        } catch (err) {
            dispatch({ type: ERROR });
            reject(err);
        }
    });
};

// UPDATE TASK
export const patchTask = (id, updatedTask) => (dispatch) => {
    dispatch({ type: LOADING });

    return new Promise((resolve, reject) => {
        try {
            let tasks = getLocalStorageTasks();
            let taskToUpdate = null;

            tasks = tasks.map((task) => {
                if (task.id === id) {
                    taskToUpdate = { ...task, ...updatedTask };
                    return taskToUpdate;
                }
                return task;
            });

            if (!taskToUpdate) throw new Error("Task not found");

            saveLocalStorageTasks(tasks);
            dispatch({ type: PATCH_TASK, payload: taskToUpdate });
            alert("Task Updated Successfully");
            resolve(taskToUpdate);
        } catch (err) {
            dispatch({ type: ERROR });
            reject(err);
        }
    });
};

// DELETE TASK
export const deleteTask = (id) => (dispatch) => {
    dispatch({ type: LOADING });

    return new Promise((resolve, reject) => {
        try {
            let tasks = getLocalStorageTasks();
            const updatedTasks = tasks.filter((task) => task.id !== id);

            saveLocalStorageTasks(updatedTasks);
            dispatch({ type: DELETE_TASK, payload: updatedTasks }); 

            alert("Task has been deleted successfully");
            resolve();
        } catch (err) {
            dispatch({ type: ERROR });
            reject(err);
        }
    });
};
