import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Container from '@mui/material/Container'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Create from './pages/create/Create'
import Navbar from './components/navigation/Navbar'
import OnlineUsers from './components/onlineUsers/OnlineUsers'
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Navbar/>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Container>
                  <Switch>
                    <Route exact path="/dashboard">
                      {!user && <Redirect to="/login"/>}
                      {user && <Dashboard/>}
                    </Route>
                    <Route path="/login">
                      {user && <Redirect to="/dashboard"/>}
                      {!user && <Login/>}
                    </Route>
                    <Route path="/signup">
                      {user && <Redirect to="/dashboard"/>}
                      {!user && <Signup/>}
                    </Route>
                    <Route path="/projects/:id">
                      {!user && <Redirect to="/login"/>}
                      {user && <Project/>}
                    </Route>
                    <Route path="/create">
                      {!user && <Redirect to="/login"/>}
                      {user && <Create/>}
                    </Route>
                  </Switch>
                </Container>
              </Box>
            </Box>
          {user && <OnlineUsers/>}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
