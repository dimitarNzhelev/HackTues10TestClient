import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DashboardComponent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    let isMounted = true; // add this line

    axios
      .get("https://lobster-app-2-2vuam.ondigitalocean.app/dashboard/")
      .then((res) => {
        if (isMounted) {
          // add this line
          if (res.data.user === null) {
            navigate("/auth/login");
          }

          setUser(res.data.user);
          console.log(res.data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          // add this line
          console.log(err);
        }
      });

    return () => {
      isMounted = false;
    }; // add this line
  }, []);

  const handleLogout = () => {
    axios
      .get("https://lobster-app-2-2vuam.ondigitalocean.app/auth/logout")
      .then((res) => {
        setUser();
        navigate("/auth/login");
      });
  };

  return (
    <>
      <Navbar
        bg="secondary"
        variant="dark"
        style={{
          padding: 10,
        }}>
        <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => navigate("/dashboard/discover")}>
            Discover Posts
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/dashboard/savedposts")}>
            Saved Posts
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/dashboard/myposts")}>
            My Posts
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/dashboard/upload")}>
            Add Post
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar>
      <Container className=" py-3 text-white m-0" style={{ width: "100%" }}>
        <h1 className="mb-5">Welcome to the Dashboard</h1>
        <p>Hello {user && user.name}</p>
        <p>Email: {user && user.email}</p>
        <p>User identification number: {user && user.id}</p>
      </Container>
    </>
  );
};

export default DashboardComponent;
