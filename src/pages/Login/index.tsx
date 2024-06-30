import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import "./login.css";
import * as LoginImg from "../../assets/images/Login-pana.svg";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearAll, signIn } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Login {
  email: string;
  password: string;
}
const initialValues = {
  email: "",
  password: "",
};
const validation = Yup.object<Login>({
  email: Yup.string()
    .required()
    .matches(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, "Invalid email"),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, and be at least 8 characters long."
    ),
});
const LoginPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const nagivate = useNavigate();
  const authState = useSelector((state: RootState) => state.authReducer);
  const [showPassword, setShowPassword] = useState(false);

  const { handleChange, handleSubmit, errors, values, touched } =
    useFormik<Login>({
      initialValues,
      validationSchema: validation,
      onSubmit: () => {
        console.log(values);
        dispatch(signIn({ data: values }));
      },
    });
  useEffect(() => {
    if (authState.error && authState.message) {
      toast.error(authState.message);
    } else if (authState.success && authState.message) {
      toast.success(authState.message);
    }
    dispatch(clearAll());
  }, [authState.error, authState.success, authState.message]);
  useEffect(() => {
    if (authState.isLoggedIn) {
      nagivate("/home");
    }
  }, [authState.isLoggedIn]);
  return (
    // <Card className="rounded bo">
    //   <CardBody>
    <Container fluid>
      <Row>
        <Col sm="6">
          <div className="d-flex flex-row ps-5 pt-5">
            <FontAwesomeIcon
              className="fa-2x me-3 brand-color"
              icon={faClipboardList}
            />
            <h4 className="fs-4 fw-bold m-0">
              ToDo <span className="brand-color">Notion</span>
            </h4>
          </div>

          <div className="d-flex flex-column justify-content-center w-75 ps-5 mt-5">
            <h3 className="fs-2 fw-bold text-uppercase login-title">login</h3>
            <h3 className="fs-2 fw-bold text-uppercase login-subtitle">
              to your account
            </h3>
            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email && touched.email}
                />
                {touched.email && errors.email ? (
                  <Form.Text className="text-danger">{errors.email}</Form.Text>
                ) : null}
              </Form.Group>
              <Form.Group className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password && touched.password}
                />
                <FontAwesomeIcon
                  className="position-absolute eye-icon text-muted"
                  // className="fa-2x me-3 brand-color"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? faEyeSlash : faEye}
                />
                {touched.password && errors.password ? (
                  <Form.Text className="text-danger">
                    {errors.password}
                  </Form.Text>
                ) : null}
              </Form.Group>
              {/* <Link
                to="/forgot-password"
                className="small mt-4 pb-lg-3 w-100 text-muted"
                style={{ textDecoration: "none" }}
              >
                forgot password?
              </Link> */}
              {/* Login button and link */}
              <div className="d-flex align-items-center justify-content-between mt-4">
                <Button
                  type="submit"
                  className="fw-bold rounded-pill text-uppercase w-100"
                  style={{ backgroundColor: "#060c1c" }}
                >
                  Login
                </Button>
              </div>
            </Form>

            <div className="text-muted mt-4">
              Don't have account ?
              <Link
                to="/signup"
                className="ms-2 text-muted"
                style={{ textDecoration: "none" }}
              >
                <span>create new</span>
              </Link>
            </div>
          </div>
        </Col>
        <Col sm="6" className="d-none d-sm-block px-0">
          <img
            src={LoginImg.default}
            alt="Login image"
            className="w-100 illustration"
          />
        </Col>
      </Row>
    </Container>
    //   </CardBody>
    // </Card>
  );
};

export default LoginPage;
