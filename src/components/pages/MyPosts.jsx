import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const MyPosts = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const handleLogout = () => {
    axios
      .get("https://lobster-app-2-2vuam.ondigitalocean.app/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        setUser();
        navigate("/auth/login");
      });
  };
  axios.defaults.withCredentials = true;

  useEffect(() => {
    let isMounted = true;

    axios
      .get("https://lobster-app-2-2vuam.ondigitalocean.app/dashboard/", {
        withCredentials: true,
      })
      .then((res) => {
        if (isMounted) {
          console.log(res.data);
          if (res.data.user === null) {
            alert(res);
            navigate("/auth/login");
          }

          setUser(res.data.user);
          if (isMounted) {
            axios
              .get(
                "https://lobster-app-2-2vuam.ondigitalocean.app/dashboard/myposts",
                { withCredentials: true }
              )
              .then((res) => {
                setPosts(res.data.posts);
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.log(err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Navbar
        bg="secondary"
        variant="dark"
        style={{
          padding: 10,
        }}>
        <Navbar.Brand>My Posts</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => navigate("/dashboard")}>Dashboard</Nav.Link>
          <Nav.Link onClick={() => navigate("/dashboard/discover")}>
            Discover
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/dashboard/savedposts")}>
            Saved Posts
          </Nav.Link>

          <Nav.Link onClick={() => navigate("/dashboard/upload")}>
            Add Post
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar>
      <h1 className="mb-5">Discover</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "start",
        }}>
        {posts &&
          posts.map((post) => {
            return (
              <Card
                sx={{
                  maxWidth: 345,
                  marginLeft: "1%",
                  marginRight: "1%",
                  marginBottom: "1%",
                }}
                key={post.id}>
                <CardActionArea
                  onClick={() =>
                    navigate("/dashboard/post/" + post.id, { state: { post } })
                  }>
                  <CardMedia
                    component="img"
                    height="140"
                    image={post.imageUrl}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.caption}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default MyPosts;
