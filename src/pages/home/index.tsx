import React, { useEffect, useState } from "react";
import Nav from "../../layouts/Nav";
import { Button, Col, Container, Row } from "react-bootstrap";

// import "./home.css";
import Task from "../../components/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchTasks } from "../../store/slices/taskSlice";
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
            <Button size="sm" variant="primary" onClick={() => setShow(true)}>
              Add Task
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col
            md="6"
            className="mt-lg-0 mt-md-4 mt-sm-4 h-100"
            style={{ overflowY: "scroll" }}
          >
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
          <Col
            md="6"
            className="mt-lg-0 mt-md-4 mt-sm-4"
            style={{ overflowY: "auto" }}
          >
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
      <AddEdit
        showModal={show}
        hideModal={() => setShow(false)}
        taskState={taskState}
      />
    </>
  );
};

export default Home;
