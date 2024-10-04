import React from 'react';
import './TaskCard.css';

function TaskCard({ task, onDragStart }) {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      style={{
        backgroundColor: task.priority === 'High' ? 'red' : 
                        task.priority === 'Medium' ? 'orange' : 
                        'white',
        color: task.priority === 'High' || task.priority === 'Medium' ? 'white' : 'black',
      }}
    >
      <p>{task.text}</p>
    </div>
  );
}

export default TaskCard;

