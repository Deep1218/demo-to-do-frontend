import React from "react";
import Nav from "../../layouts/Nav";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";

import "./home.css";
import Task from "../../components/Task";

const home: React.FC = () => {
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
          <Col sm="6">
            <h4>Remaining tasks</h4>
            <Task
              id="1"
              title="Testing"
              description="Test is working"
              status="pending"
              onCompleted={handleCompleted}
            ></Task>
          </Col>
          <Col sm="6">
            <h4>Completed tasks</h4>
          </Col>
        </Row>
      </Container>
      <div></div>
    </>
  );
};

export default home;
