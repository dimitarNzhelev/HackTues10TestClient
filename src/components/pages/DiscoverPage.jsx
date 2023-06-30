import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Discover = () => {
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

    const fetchPosts = async () => {
      try {
        const postsResponse = await axios.get(
          "https://lobster-app-2-2vuam.ondigitalocean.app/dashboard/posts",
          { withCredentials: true }
        );

        if (!isMounted) {
          return;
        }

        console.log(postsResponse.data);

        if (postsResponse.data.posts == null) {
          navigate("/auth/login");
          return;
        }

        setPosts(postsResponse.data.posts);
      } catch (error) {
        if (isMounted) {
          console.error(error);
        }
      }
    };

    fetchPosts();

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
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>

          <Navbar.Brand onClick={() => navigate("/dashboard/discover")}>
            Discover Posts
          </Navbar.Brand>
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
                    <Typography gutterBottom variant="h6" component="div">
                      Author: {post.author}
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

export default Discover;
