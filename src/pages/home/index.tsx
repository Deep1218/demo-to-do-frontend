import React, { useEffect, useState } from "react";
import Nav from "../../layouts/Nav";
import { Button, Col, Container, Row } from "react-bootstrap";

import "./home.css";
import Task from "../../components/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  clearTask,
  deleteTask,
  fetchTaskById,
  fetchTasks,
  updateTask,
} from "../../store/slices/taskSlice";
import AddEdit from "./addEditTask";

const Home: React.FC<any> = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<any>();
  const taskState = useSelector((state: RootState) => state.taskReducer);
  const [completedTasks, setCompletedTasks] = useState<any>([]);
  const [pendingTasks, setPendingTasks] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  useEffect(() => {
    setCompletedTasks(
      taskState.tasks.filter((task) => task.status === "completed")
    );
    setPendingTasks(
      taskState.tasks.filter((task) => task.status !== "completed")
    );
  }, [taskState.tasks]);

  const handleCompleted = (e: any, id: string) => {
    console.log(e?.target?.checked, id);
    if (e?.target?.checked) {
      dispatch(updateTask({ id, data: { status: "completed" } }));
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <>
      <Nav />
      <Container className="border border-2 container my-3 px-5 py-4 rounded-3 shadow-sm task-container">
        <div className="d-flex justify-content-evenly align-items-center">
          <h3>Tasks</h3>
          <Button size="sm" variant="primary" onClick={() => setShow(true)}>
            Add Task
          </Button>
        </div>
        <Row className="mt-4">
          <Col md="6" className="mt-lg-0 mt-4 list">
            <h4>Pending</h4>
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task: any) => {
                if (task.status !== "completed") {
                  return (
                    <Task
                      key={task.id}
                      id={task._id}
                      title={task.title}
                      description={task.description}
                      status={task.status}
                      date={task.date}
                      onCompleted={handleCompleted}
                      onDelete={handleDelete}
                      onEdit={(id: string) => {
                        setShow(true);
                        dispatch(fetchTaskById(id));
                      }}
                    ></Task>
                  );
                }
              })
            ) : (
              <p>No task found</p>
            )}
          </Col>
          <Col md="6" className="mt-lg-0 mt-4 list">
            <h4>Completed</h4>
            {completedTasks.length > 0 ? (
              completedTasks.map((task: any) => {
                if (task.status === "completed") {
                  return (
                    <Task
                      key={task.id}
                      id={task._id}
                      title={task.title}
                      description={task.description}
                      status={task.status}
                      date={task.date}
                      onCompleted={handleCompleted}
                      onDelete={handleDelete}
                    ></Task>
                  );
                }
              })
            ) : (
              <p>No completed task found</p>
            )}
          </Col>
        </Row>
      </Container>
      <AddEdit
        showModal={show}
        hideModal={() => {
          setShow(false);
          if (taskState.task) {
            dispatch(clearTask());
          }
        }}
        taskState={taskState}
      />
    </>
  );
};

export default Home;
