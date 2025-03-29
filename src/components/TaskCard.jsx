import { useState } from "react";
import { Modal } from "./Modal";
import { Label } from "./Label";
import { useDispatch } from "react-redux";
import { deleteTask, patchTask } from "../redux/action";


const TaskCard = ({ sr, id, title, description, status, priority, date, handleRender }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title, description, status, priority, date });

  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateTask = (e) => {
    e.preventDefault();
    dispatch(patchTask(id, formData)).then(() => {
      handleRender();
      closeModal();
    });
  };

  const handleDelete = () => {
    dispatch(deleteTask(id)).then(() => {
      handleRender();
    });
  };

  return (
    <>
      <div className="flex flex-col items-left border-solid border-2 p-5 gap-3 rounded">
        <p>Sr. No: {sr}</p>
        <p>Title: {title}</p>
        <p>Description: {description}</p>
        <p>Status: 
          <span className={ status === 'Pending' ? "mx-2 text-red-500" : status === 'Completed' ? "mx-2 text-green-500": "mx-2 text-orange-800" }>
            {status}
          </span>
        </p>
        <p>Priority:  
          <span className={ priority === 'High' ? "mx-2 text-red-500" : priority === 'Low' ? "mx-2 text-green-500": "mx-2 text-orange-800" }>
            {priority}
          </span>
        </p>
        <p>Date: {date}</p>
        <div className="flex gap-10">
          <button onClick={openModal} className="px-4 py-2 text-white bg-green-500">Edit</button>
          <button onClick={handleDelete} className="px-4 py-2 text-white bg-red-500">Delete</button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="sm:w-90 lg:w-96 p-5">
          <h2 className="text-center text-2xl text-red-500">Update Task</h2>
          <form className="max-w-sm mx-auto" onSubmit={updateTask}>
            
            <Label>Update Title</Label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              required 
            />

            <Label>Update Description</Label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              required 
            ></textarea>

            <Label>Update Status</Label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange} 
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            >
              <option value='Pending'>Pending</option>
              <option value="In-Process">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <Label>Priority</Label>
            <select 
              name="priority" 
              value={formData.priority} 
              onChange={handleChange} 
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <Label>Date</Label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              required 
            />
            
            <input 
              type="submit" 
              value="Submit" 
              className="block p-2.5 w-full text-sm text-white bg-green-500 rounded mt-5 cursor-pointer" 
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export { TaskCard };
