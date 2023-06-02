import React, { useState } from 'react';
import './Avancement.css';

function Dashboard() {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: []
    });

    const addTask = () => {
        const taskInput = document.getElementById("task-input");
        const task = taskInput.value.trim();
        if (!task) {
            alert("Please enter a task!");
            return;
        }
        setTasks((prevState) => ({
            ...prevState,
            todo: [...prevState.todo, task]
        }));
        taskInput.value = "";
    };

    const moveTask = (task, fromColumn, toColumn) => {
        setTasks((prevState) => {
            const updatedTasks = { ...prevState };
            updatedTasks[fromColumn] = prevState[fromColumn].filter((t) => t !== task);
            updatedTasks[toColumn] = [...prevState[toColumn], task];
            return updatedTasks;
        });
    };

    return (
        <div className="container">
            <h1>Visualiser l'avancement de l'etudiant</h1>

            <div id="board">
                <div className="column todo-column">
                    <h2>To Do</h2>
                    <div id="todo" className="task-list">
                        {tasks.todo.map((task, index) => (
                            <div className="task" key={index} onClick={() => moveTask(task, "todo", "inProgress")}>
                                <div className="task-header">
                                    <div className="task-title">{task}</div>
                                    <div className="task-status">To Do</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="column in-progress-column">
                    <h2>In Progress</h2>
                    <div id="in-progress" className="task-list">
                        {tasks.inProgress.map((task, index) => (
                            <div className="task" key={index} onClick={() => moveTask(task, "inProgress", "done")}>
                                <div className="task-header">
                                    <div className="task-title">{task}</div>
                                    <div className="task-status">In Progress</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="column done-column">
                    <h2>Done</h2>
                    <div id="done" className="task-list">
                        {tasks.done.map((task, index) => (
                            <div className="task" key={index}>
                                <div className="task-header">
                                    <div className="task-title">{task}</div>
                                    <div className="task-status">Done</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div id="add-task-form">
                <label htmlFor="task-input">Nouvelle tâche :</label>
                <input type="text" id="task-input" />
                <button id="add-task-button" onClick={addTask}>Ajouter</button>
            </div>
        </div>
    );
}

export default Dashboard;
