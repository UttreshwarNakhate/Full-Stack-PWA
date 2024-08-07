import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Users from "./components/Users";
import ProfileDetails from "./components/ProfileDetails";
import ProfileFill from "./components/Profile";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import { useEffect } from "react";
import { messaging, getToken } from './firebase';


function App() {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, { vapidKey: 'BB56iy2JjSGmRUAb3zNk84aJubxLCdM92NNz_GnwbzL6UuOYCJLGpt3DZsB-U5H2i6LICtNQENpKpxxKWQT7mLw' });
          console.log("FCM token:", token);
        } else {
          console.error("Permission not granted for Notification");
        }
      } catch (err) {
        console.error("Error getting token", err);
      }
    };

    requestPermission();
  }, []);


  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Navbar bg="primary" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to={"/"}>Home</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"users"}>Users</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"about"}>About</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"profileFill"}>Apply</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"profileDetails"}>Details</Link>
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Routes>
            <Route Component={Home} path="/" />
            <Route Component={Users} path="/users" />
            <Route Component={About} path="/about" />
            <Route Component={ProfileFill} path="/ProfileFill" />
            <Route Component={ProfileDetails} path="/ProfileDetails" />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
