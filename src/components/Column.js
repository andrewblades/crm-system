import React from 'react';
import TaskCard from './TaskCard';
import './Column.css';

function Column({ title, tasks, onDragStart, onDrop, openModal, setFilter }) {
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e)}
    >
      <div className="column-header">
        <h2>{title}</h2>
        {title === "To Do" && (
          <button className="add-task-button" onClick={openModal}>+</button>
        )}
      </div>

      {/* Filter buttons for task priority */}
      <div className="filter-buttons">
        <button className="filter-button red" onClick={() => setFilter('High')}></button>
        <button className="filter-button orange" onClick={() => setFilter('Medium')}></button>
        <button className="filter-button white" onClick={() => setFilter('Low')}></button>
        <button className="filter-button reset" onClick={() => setFilter(null)}>All</button>
      </div>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDragStart={(e) => onDragStart(e, task)}
        />
      ))}
    </div>
  );
}

export default Column;



