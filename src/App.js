import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";

function App() {
  const { authIsReady } = useAuth();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <PrivateSidebar />
          <div className="container">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<PrivateDashboard />}>
                <Route element={<Dashboard />} />
              </Route>
              <Route path="/create" element={<PrivateCreate />}>
                <Route element={<Create />} />
              </Route>
              <Route path="/project/:id" element={<PrivateProject />}>
                <Route element={<Project />} />
              </Route>
              <Route path="/login" element={<PrivateLogin />}>
                <Route element={<Login />} />
              </Route>
              <Route path="/signup" element={<PrivateRegister />}>
                <Route element={<Signup />} />
              </Route>
            </Routes>
          </div>
          <PrivateOnlineUsers />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

function PrivateSidebar() {
  const { user } = useAuth();
  return user ? <Sidebar /> : null;
}

function PrivateDashboard() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <Navigate to="/login" />;
}

function PrivateCreate() {
  const { user } = useAuth();
  return user ? <Create /> : <Navigate to="/login" />;
}

function PrivateProject() {
  const { user } = useAuth();
  return user ? <Project /> : <Navigate to="/login" />;
}

function PrivateRegister() {
  const { user } = useAuth();
  return user && user.displayName ? <Navigate to="/" /> : <Signup />;
}

function PrivateLogin() {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Login />;
}

function PrivateOnlineUsers() {
  const { user } = useAuth();
  return user ? <OnlineUsers /> : null;
}
