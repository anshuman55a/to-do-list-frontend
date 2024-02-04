import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  navLinks: {
    textDecoration: 'none',
    color: 'inherit',
    marginRight: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Task Manager
            </Typography>
            <Button color="inherit" component={Link} to="/" className={classes.navLinks}>
              Task List
            </Button>
            <Button color="inherit" component={Link} to="/create" className={classes.navLinks}>
              Create Task
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
