// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, NavDropdown, Navbar } from "react-bootstrap";
import {
  faClipboardList,
  faCircleUser,
  faKey,
  faRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Nav: React.FunctionComponent<any> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const authState = useSelector((state: RootState) => state.authReducer);

  // const handleClickOnIcon = ()=>{
  //   document.
  // }
  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigate("/login");
    }
  }, [authState.isLoggedIn]);
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>
          <FontAwesomeIcon
            className="me-3 brand-color"
            icon={faClipboardList}
          />
          To Do <span className="brand-color">Notion</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        {authState.isLoggedIn && (
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown title={authState.user.name}>
              <NavDropdown.Item>
                <FontAwesomeIcon className="me-3" icon={faKey} />
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => dispatch(logout({ isDelete: true }))}
              >
                <FontAwesomeIcon className="me-3" icon={faTrash} />
                Delete Account
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => dispatch(logout({ isDelete: false }))}
              >
                <FontAwesomeIcon className="me-3" icon={faRightFromBracket} />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <FontAwesomeIcon className="fa-2x ms-3" icon={faCircleUser} />
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};
export default Nav;
