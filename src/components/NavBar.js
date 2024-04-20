import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addEventIcon = <NavLink to="/events/create">Create event</NavLink>;

  const loggedInIcons = (
    <>
      <NavLink to={`/profiles/${currentUser?.profile_id}`}>
        {currentUser?.username}
      </NavLink>
      <NavLink to="/" onClick={handleSignOut}>
        Sign out
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink to="/signin">Sign in</NavLink>
      <NavLink to="/signup">Sign up</NavLink>
    </>
  );

  return (
    <div>
      <Container>
        <Navbar
          collapseOnSelect
          expand="md"
          bg="dark"
          variant="dark"
          fixed="top"
        >
          <NavLink to="/">
            <Navbar.Brand>Innoevent</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/events">Events</NavLink>
              {currentUser && addEventIcon}
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default NavBar;
