// TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, Checkbox, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    axios.get('http://localhost:8080/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskStatusChange = (taskId, completed) => {
    axios.put(`http://localhost:8080/tasks/${taskId}/complete`, { completed })
      .then(response => {
        // Handle successful status change
        console.log('Task status changed:', response.data);
        // Update the task list with the modified task
        setTasks(tasks.map(task => (task.id === taskId ? { ...task, completed } : task)));
      })
      .catch(error => console.error('Error changing task status:', error));
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:8080/tasks/${taskId}`)
      .then(() => {
        // Handle successful deletion
        console.log('Task deleted successfully');
        // Refresh the task list or update state accordingly
        fetchTasks();
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <Container mt={5}>
      <Typography variant="h4" mb={4}  marginTop='20px' borderBottom='2px solid'>Task List</Typography>
      <List>
        {tasks.map(task => (
          <ListItem
            key={task.id}
            divider
            sx={{
              backgroundColor: task.completed ? '#e6ffe6' : 'inherit',
              marginTop: '8px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <ListItemText
              primary={task.title}
              secondary={
                <React.Fragment>
                  {task.description && `${task.description} | `}
                  {task.dueDate && `Due Date: ${new Date(task.dueDate).toLocaleDateString()}`}
                </React.Fragment>
              }
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'green' : 'inherit',
              }}
            />
            <ListItemSecondaryAction>
              <Checkbox
                checked={task.completed}
                onChange={() => handleTaskStatusChange(task.id, !task.completed)}
              />
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskList;
