import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import "./login.css";
import { useFormik } from "formik";

interface Login {
  email: string;
  password: string;
}
const initialValues = {
  email: "",
  password: "",
};
const validation = Yup.object<Login>({
  email: Yup.string().required(),
  password: Yup.string().required(),
});
const LoginPage: React.FC = () => {
  const { handleChange, handleSubmit, errors, values, touched } =
    useFormik<Login>({
      initialValues,
      validationSchema: validation,
      onSubmit: () => {
        console.log(values);
      },
    });
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
                    <Form className="mt-4" onSubmit={handleSubmit}>
                      <Form.Group className="mb-3 pe-5">
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email && touched.email}
                        />
                        {touched.email && errors.email ? (
                          <Form.Text className="text-danger">
                            {errors.email}
                          </Form.Text>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="mb-5 pe-5">
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password && touched.password}
                        />
                        {touched.password && errors.password ? (
                          <Form.Text className="text-danger">
                            {errors.password}
                          </Form.Text>
                        ) : null}
                      </Form.Group>
                      {/* Login button and link */}
                      <div className="d-flex align-items-center justify-content-between pe-5">
                        <Button
                          type="submit"
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
