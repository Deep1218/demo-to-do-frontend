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
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import "./signup.css";
import * as SignupImg from "../../assets/images/Signup-pana.svg";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearAll, signUp } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

interface Signup {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const validation = Yup.object<Signup>({
  name: Yup.string().required("full name is required field"),
  email: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required("confirm password is required field")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const nagivate = useNavigate();
  const dispatch = useDispatch<any>();
  const authState = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    if (authState.error && authState.message) {
      toast.error(authState.message);
    } else if (authState.success && authState.message) {
      toast.success(authState.message);
      nagivate("/login");
    }
    dispatch(clearAll());
  }, [authState.error, authState.success, authState.message]);

  const { handleChange, handleSubmit, errors, values, touched } =
    useFormik<Signup>({
      initialValues,
      validationSchema: validation,
      onSubmit: () => {
        console.log(values);
        const { confirmPassword, ...userDetails } = values;
        dispatch(signUp({ data: userDetails }));
      },
    });
  return (
    //   <Card>
    //     <CardBody>
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
            <h3 className="fs-2 fw-bold text-uppercase login-title">Create</h3>
            <h3 className="fs-2 fw-bold text-uppercase login-subtitle">
              your account
            </h3>
            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name && touched.name}
                />
                {touched.name && errors.name ? (
                  <Form.Text className="text-danger">{errors.name}</Form.Text>
                ) : null}
              </Form.Group>
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
              <Row>
                <Col md="6">
                  <Form.Group>
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
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      isInvalid={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                    />
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <Form.Text className="text-danger">
                        {errors.confirmPassword}
                      </Form.Text>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              {/* Login button and link */}
              <div className="d-flex align-items-center justify-content-between mt-4">
                <Button
                  type="submit"
                  className="fw-bold rounded-pill text-uppercase w-100"
                  style={{ backgroundColor: "#060c1c" }}
                >
                  Sign Up
                </Button>
              </div>
            </Form>

            <div className="text-muted mt-4">
              Already have an account ?
              <Link
                to="/login"
                className="ms-2 text-muted"
                style={{ textDecoration: "none" }}
              >
                <span>login</span>
              </Link>
            </div>
          </div>
        </Col>
        <Col sm="6" className="d-none d-sm-block px-0">
          <img
            src={SignupImg.default}
            alt="Login image"
            className="w-100 illustration"
          />
        </Col>
      </Row>
    </Container>
    //     </CardBody>
    //   </Card>
  );
};
export default SignupPage;
