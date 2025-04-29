import tasks from './data.js';


function dragStart(event) {
  event.dataTransfer.setData('taskId', event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function dropTask(event, newState) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData('taskId');
  const taskElement = document.getElementById(taskId);
  
  if (taskElement) {
    
    const id = parseInt(taskId.split('-')[1]);
    

    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex !== -1) {
     
      tasks[taskIndex].state = newState;
      

      taskElement.className = `task ${newState}`;
      
   
      const stateElement = taskElement.querySelector('.task-state');
      stateElement.textContent = `Status: ${newState}`;
      

      event.currentTarget.appendChild(taskElement);
    }
  }
}


const title = document.createElement('h1');
title.textContent = 'Gestor de Tareas';
title.className = 'app-title';


const root = document.getElementById('root');
root.appendChild(title);


const boardContainer = document.createElement('div');
boardContainer.className = 'board-container';
root.appendChild(boardContainer);


const columns = ['pending', 'in-progress', 'completed'];
const columnTitles = ['Pendiente', 'En Progreso', 'Completado'];

columns.forEach((columnType, index) => {
  const column = document.createElement('div');
  column.className = 'column';
  column.id = `column-${columnType}`;
  

  const columnHeader = document.createElement('h2');
  columnHeader.className = 'column-header';
  columnHeader.textContent = columnTitles[index];
  column.appendChild(columnHeader);
  

  const tasksContainer = document.createElement('div');
  tasksContainer.className = 'tasks-container';
  tasksContainer.id = `tasks-${columnType}`;
  

  tasksContainer.addEventListener('dragover', allowDrop);
  tasksContainer.addEventListener('drop', (event) => dropTask(event, columnType));
  
  column.appendChild(tasksContainer);
  boardContainer.appendChild(column);
});


tasks.forEach((task) => {
  const taskElement = document.createElement('div');
  taskElement.className = `task ${task.state}`;
  taskElement.id = `task-${task.id}`;
  taskElement.draggable = true;
  taskElement.addEventListener('dragstart', dragStart);
  
 
  taskElement.innerHTML = `
    <h2>${task.name}</h2>
    <p>${task.description}</p>
    <p class="task-state">Status: ${task.state}</p>
  `;
  
 
  const targetColumn = document.getElementById(`tasks-${task.state}`);
  targetColumn.appendChild(taskElement);
});
