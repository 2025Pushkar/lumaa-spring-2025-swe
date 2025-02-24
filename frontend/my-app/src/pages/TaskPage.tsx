import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Form, Button, Alert, ListGroup, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Theme constants
const THEME = {
  binghamtonGreen: '#004333',
  subtitleGreen: '#005A43',
  textGreen: '#3c4c4c',
  linkGreen: '#007541',
  boldGreen: '#007541',
  offWhite: '#fefefe',
  footerWhite: '#CCCCCC',
  pureWhite: '#FFFFFF',
  darkGrey: '#303c39'
};

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

const TaskPage: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  // Wrap fetchTasks with useCallback to ensure a stable reference
  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/tasks`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddOrUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = editTaskId 
        ? `${baseUrl}/tasks/${editTaskId}` 
        : `${baseUrl}/tasks`;
      const method = editTaskId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, description, isComplete })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save task");
      }
      setTitle("");
      setDescription("");
      setIsComplete(false);
      setEditTaskId(null);
      setSuccess("Task saved successfully");
      fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/tasks/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete task");
      }
      setSuccess("Task deleted successfully");
      fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setIsComplete(task.isComplete);
  };

  const handleClear = () => {
    setEditTaskId(null);
    setTitle("");
    setDescription("");
    setIsComplete(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Filter tasks by completion status
  const incompleteTasks = tasks.filter(task => !task.isComplete);
  const completedTasks = tasks.filter(task => task.isComplete);

  // Reusable TaskList component
  const TaskList = ({ tasks, header }: { tasks: Task[]; header: string }) => (
    <div className="task-list-container" style={{ 
      backgroundColor: THEME.offWhite, 
      padding: '1.5rem', 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }}>
      <h4 className="mb-3" style={{ color: THEME.subtitleGreen }}>{header}</h4>
      <ListGroup>
        {tasks.map(task => (
          <ListGroup.Item
            key={task.id}
            className="mb-2"
            style={{
              backgroundColor: THEME.pureWhite,
              borderLeft: `4px solid ${task.isComplete ? THEME.boldGreen : THEME.textGreen}`,
              borderRadius: '4px',
              padding: '1rem',
              border: `1px solid ${THEME.footerWhite}`
            }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div style={{ flex: 1 }}>
                <h5 style={{ 
                  color: THEME.binghamtonGreen, 
                  marginBottom: '0.5rem',
                  fontWeight: 500 
                }}>{task.title}</h5>
                <p style={{ 
                  color: THEME.textGreen, 
                  marginBottom: '0.5rem' 
                }}>{task.description}</p>
              </div>
              <div className="d-flex gap-2">
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={() => handleEditTask(task)}
                  style={{
                    color: THEME.boldGreen,
                    borderColor: THEME.boldGreen,
                    backgroundColor: 'transparent'
                  }}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => handleDeleteTask(task.id)}
                  style={{
                    borderColor: '#dc3545',
                    color: '#dc3545'
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );

  return (
    <Container className="py-5" style={{ backgroundColor: THEME.pureWhite, minHeight: '100vh' }}>
      <Row className="align-items-center mb-4">
        <Col>
          <h2 style={{ color: THEME.binghamtonGreen, fontWeight: 'bold' }}>Task Manager</h2>
        </Col>
        <Col className="text-end">
          <Button 
            variant="outline-danger" 
            onClick={handleLogout}
            style={{ borderColor: '#dc3545', color: '#dc3545' }}
          >
            Logout
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}

      <Form onSubmit={handleAddOrUpdateTask} className="p-4 mb-5" style={{ 
        backgroundColor: THEME.offWhite, 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <Form.Group className="mb-3" controlId="formTaskTitle">
          <Form.Label style={{ color: THEME.textGreen, fontWeight: 500 }}>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            style={{ 
              borderColor: THEME.footerWhite,
              color: THEME.textGreen
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTaskDescription">
          <Form.Label style={{ color: THEME.textGreen, fontWeight: 500 }}>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            style={{ 
              borderColor: THEME.footerWhite,
              color: THEME.textGreen
            }}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formTaskComplete">
          <Form.Check
            type="checkbox"
            label="Mark as complete"
            checked={isComplete}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsComplete(e.target.checked)}
            style={{ color: THEME.textGreen }}
          />
        </Form.Group>

        <div className="d-flex justify-content-between gap-3">
          <Button 
            variant="outline-secondary" 
            onClick={handleClear}
            style={{ 
              color: THEME.darkGrey, 
              borderColor: THEME.darkGrey 
            }}
          >
            Clear
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            style={{
              backgroundColor: THEME.boldGreen,
              borderColor: THEME.boldGreen,
              color: THEME.pureWhite
            }}
          >
            {editTaskId ? "Update Task" : "Add Task"}
          </Button>
        </div>
      </Form>

      <Row className="mt-4 g-4">
        <Col md={6}>
          <TaskList tasks={incompleteTasks} header="Tasks To Do" />
        </Col>
        <Col md={6}>
          <TaskList tasks={completedTasks} header="Completed Tasks" />
        </Col>
      </Row>
    </Container>
  );
};

export default TaskPage;
