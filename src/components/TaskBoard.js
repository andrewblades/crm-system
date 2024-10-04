import React, { useState } from 'react';
import Column from './Column';
import TaskModal from './TaskModal';
import './TaskBoard.css';
import { generateUniqueId } from './utils';

const initialTasks = {
  todo: [
    { id: generateUniqueId(), text: 'Task 1', priority: 'High' },
    { id: generateUniqueId(), text: 'Task 2', priority: 'Medium' },
  ],
  inProgress: [{ id: generateUniqueId(), text: 'Task 3', priority: 'Low' }],
  done: [{ id: generateUniqueId(), text: 'Task 4', priority: 'High' }],
};

function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState(null); // Keep track of the selected priority filter

  // Function to open the modal
  const openModal = () => setShowModal(true);

  // Function to close the modal
  const closeModal = () => setShowModal(false);

  // Function to handle task submission from the modal
  const addNewTask = (task) => {
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, { id: generateUniqueId(), ...task }],
    }));
    closeModal();
  };

  const handleDragStart = (event, task, column) => {
    event.dataTransfer.setData('task', JSON.stringify({ task, column }));
  };

  const handleDrop = (event, newColumn) => {
    event.preventDefault();
    const { task, column } = JSON.parse(event.dataTransfer.getData('task'));

    setTasks((prev) => {
      const updatedTasks = { ...prev };

      if (column === newColumn) {
        updatedTasks[column] = updatedTasks[column].filter((t) => t.id !== task.id);
        updatedTasks[column] = [...updatedTasks[column], task];
      } else {
        updatedTasks[column] = updatedTasks[column].filter((t) => t.id !== task.id);
        updatedTasks[newColumn] = [...updatedTasks[newColumn], task];
      }

      return updatedTasks;
    });
  };

  // Function to filter tasks by priority
  const filterTasks = (columnTasks) => {
    if (!filter) return columnTasks; // If no filter is selected, show all tasks
    return columnTasks.filter((task) => task.priority === filter);
  };

  return (
    <div className="task-board">
      <Column
        title="To Do"
        tasks={filterTasks(tasks.todo)} // Apply filtering
        onDragStart={(event, task) => handleDragStart(event, task, 'todo')}
        onDrop={(event) => handleDrop(event, 'todo')}
        openModal={openModal}
        setFilter={setFilter} // Pass down filter function
      />
      <Column
        title="In Progress"
        tasks={filterTasks(tasks.inProgress)} // Apply filtering
        onDragStart={(event, task) => handleDragStart(event, task, 'inProgress')}
        onDrop={(event) => handleDrop(event, 'inProgress')}
        setFilter={setFilter}
      />
      <Column
        title="Done"
        tasks={filterTasks(tasks.done)} // Apply filtering
        onDragStart={(event, task) => handleDragStart(event, task, 'done')}
        onDrop={(event) => handleDrop(event, 'done')}
        setFilter={setFilter}
      />

      {/* Render the modal */}
      {showModal && <TaskModal closeModal={closeModal} addNewTask={addNewTask} />}
    </div>
  );
}

export default TaskBoard;





