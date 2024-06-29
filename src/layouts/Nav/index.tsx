// import PropTypes from "prop-types";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, NavDropdown, Navbar } from "react-bootstrap";
import {
  faClipboardList,
  faCircleUser,
  faKey,
  faRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Nav: React.FunctionComponent<any> = () => {
  const [isLogedIn, setIsLoggedIn] = useState(true);
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand>
          <FontAwesomeIcon className="me-3" icon={faClipboardList} />
          To Do
        </Navbar.Brand>
        <Navbar.Toggle />
        {isLogedIn && (
          <Navbar.Collapse className="justify-content-end">
            <FontAwesomeIcon className="me-2" icon={faCircleUser} />
            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <FontAwesomeIcon className="me-3" icon={faKey} />
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Item>
                <FontAwesomeIcon className="me-3" icon={faTrash} />
                Delete Account
              </NavDropdown.Item>
              <NavDropdown.Item>
                <FontAwesomeIcon className="me-3" icon={faRightFromBracket} />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};
export default Nav;
