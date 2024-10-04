import React, { useState } from 'react';
import './TaskModal.css';

function TaskModal({ closeModal, addNewTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low'); // Default priority is "Low"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      addNewTask({ text: title, priority }); // Add task with title and priority
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Priority:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit" className="add-task">Add Task</button>
            <button type="button" className="close-modal" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
