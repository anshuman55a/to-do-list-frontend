import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(2),
    alignItems: 'center',
  },
}));

const TaskForm = () => {
  const classes = useStyles();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  const handleTaskCreate = () => {
    axios.post('http://localhost:8080/tasks', {
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
    })
      .then(response => {
        console.log('Task created successfully:', response.data);
        setTaskTitle('');
        setTaskDescription('');
        setTaskDueDate('');
      })
      .catch(error => console.error('Error creating task:', error));
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography variant="h4" align="center">Create Task</Typography>
      <TextField
        className={classes.textField}
        label="Task Title"
        variant="outlined"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Task Description"
        variant="outlined"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Due Date"
        type="date"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleTaskCreate}
      >
        Create Task
      </Button>
    </Container>
  );
};

export default TaskForm;
