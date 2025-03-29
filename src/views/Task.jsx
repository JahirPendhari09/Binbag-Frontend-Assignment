import { useEffect, useState } from "react";
import { TaskCard } from "../components/TaskCard";
import "../App.css";
import { Modal } from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, postTasks } from "../redux/action";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Label } from "../components/Label";

export const initialStateTask = {
    id: 1,
    title: '',
    description: '',
    date: '',
    priority: '',
    status: 'Pending'
};

const Task = () => {
    const tasks = useSelector(store => store.tasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(initialStateTask);
    const dispatch = useDispatch();
    const [render, setRender] = useState(false);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        dispatch(getTasks());
    }, [render]);

    useEffect(() => {
        setTaskList(tasks);
    }, [tasks]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const submitNewTodo = (e) => {
        e.preventDefault();
        if (formData.title === "") {
            alert("Please enter your title");
        } else {
            dispatch(postTasks(formData));
            setFormData(initialStateTask);
            closeModal();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRender = () => setRender(!render);
    const handleOpenModal = () => openModal();

    const filteredTasks = taskList.filter(task => filter === '' || task.status === filter);
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sort === 'date') return new Date(a.date) - new Date(b.date);
        if (sort === 'priority') {
            const priorityOrder = { Low: 1, Medium: 2, High: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return 0;
    });

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const updatedTasks = Array.from(sortedTasks);
        const [reorderedItem] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, reorderedItem);
        setTaskList(updatedTasks);
    };

    const handleFilter = (e) => {
        setFilter(e.target.value)
        setSort('')
    }

    const handleSortValue = (value) => {
        setSort(value)
        setFilter('')
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 mt-5">Task Management</h1>
            <div className="w-11/12 m-auto">
                <div className="mb-5 flex flex-col sm:flex-col md:flex-row gap-2">
                    <button onClick={handleOpenModal} className="text-white bg-green-500 p-2 rounded">Create new Task</button>
                    <button onClick={() => handleSortValue('date')} className="text-white bg-blue-500 p-2 rounded">Sort by Date</button>
                    <button onClick={() => handleSortValue('priority')} className="text-white bg-yellow-500 p-2 rounded">Sort by Priority</button>
                    <select onChange={handleFilter} className="p-2 rounded border">
                        <option value="">Filter by Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                                {sortedTasks.length > 0 ? (
                                    sortedTasks.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <TaskCard sr={index + 1} handleRender={handleRender} {...item} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                ) : (
                                    <p>No tasks available</p>
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="sm:w-90 lg:w-96 p-5">
                    <h2 className="text-center text-2xl text-orange-400">Add New Task</h2>
                    <form className="max-w-sm mx-auto" onSubmit={submitNewTodo}>
                        <Label>Your Title</Label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="p-2 w-full border rounded"/>
                        <Label>Your Description</Label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required className="p-2 w-full border rounded"/>
                        <Label>Due Date</Label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="p-2 w-full border rounded"/>
                        <Label>Priority</Label>
                        <select name="priority" value={formData.priority} onChange={handleChange} required className="p-2 w-full border rounded">
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <Label>Status</Label>
                        <select name="status" value={formData.status} onChange={handleChange} required className="p-2 w-full border rounded">
                            <option value="Pending">Pending</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <input type="submit" value="Submit" className="p-2 w-full bg-green-500 text-white rounded mt-5 cursor-pointer"/>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export { Task };
