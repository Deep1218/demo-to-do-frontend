import React, { useEffect, useState } from "react";
import Nav from "../../layouts/Nav";
import { Button, Col, Container, Row } from "react-bootstrap";

import "./home.css";
import Task from "../../components/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchTasks } from "../../store/slices/taskSlice";

const Home: React.FC<any> = () => {
  const dispatch = useDispatch<any>();
  const taskState = useSelector((state: RootState) => state.taskReducer);
  const [completedTasks, setCompletedTasks] = useState<any>([]);
  const [pendingTasks, setPendingTasks] = useState<any>([]);
  useEffect(() => {
    dispatch(fetchTasks());
    setCompletedTasks(
      taskState.tasks.filter((task) => task.status === "completed")
    );
    setPendingTasks(
      taskState.tasks.filter((task) => task.status !== "completed")
    );
  }, []);

  const handleCompleted = () => {
    console.log("Clicked on box");
  };
  return (
    <>
      <Nav />
      <Container className="mt-5">
        <Row>
          <Col>
            <h3>List of tasks</h3>
          </Col>
          <Col>
            <Button variant="primary">Add Task</Button>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <h4>Remaining tasks</h4>
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
                    ></Task>
                  );
                }
              })
            ) : (
              <p>No task found</p>
            )}
          </Col>
          <Col md="6">
            <h4>Completed tasks</h4>
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
      <div></div>
    </>
  );
};

export default Home;
