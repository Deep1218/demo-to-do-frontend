import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./login.css";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
const LoginPage: React.FC = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center p-4 login-container"
    >
      <Row className="rounded">
        <Col xs={12}>
          <Card className="p-4 login-card">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="d-flex align-items-center justify-content-start mb-5">
                    <FontAwesomeIcon
                      className="fa-2x me-3 brand-color"
                      icon={faClipboardList}
                    />
                    <h4 className="fs-4 fw-bold m-0">
                      ToDo <span className="">Notion</span>
                    </h4>
                  </div>
                  {/* Login text and sub-text */}
                  <Col md={8}>
                    <h3 className="fs-2 fw-bold text-uppercase login-title">
                      login
                    </h3>
                    <h3 className="fs-2 fw-bold text-uppercase login-subtitle">
                      to your account
                    </h3>
                    {/* Login form */}
                    <Form className="mt-4">
                      <Form.Group className="mb-3 pe-5">
                        <Form.Control type="email" placeholder="Email" />
                      </Form.Group>
                      <Form.Group className="mb-5 pe-5">
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      {/* Login button and link */}
                      <div className="d-flex align-items-center justify-content-between pe-5">
                        <Button
                          className="fw-bold rounded-pill text-uppercase"
                          style={{ backgroundColor: "#060c1c" }}
                        >
                          Login
                        </Button>
                        <a href="">forgot password?</a>
                      </div>
                    </Form>
                  </Col>
                </Col>
                <Col md={6} className="px-4">
                  <div className="h-100 w-100 d-flex justify-content-center align-items-center illustration" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
