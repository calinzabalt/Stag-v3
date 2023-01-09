import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Container from '@mui/material/Container'

import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Create from './pages/create/Create'
import Teams from './pages/teams/team'
import SingleTeam from './pages/singleteam/SingleTeam'
import Navbar from './components/navigation/Navbar'
import OnlineUsers from './components/onlineUsers/OnlineUsers'
import Landing from './pages/landingpage/landing'
import Invitations from './pages/userProfile/Invitation'
import Terms from './pages/terms/terms'
import Privacy from './pages/privacy/privacy'

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
            {user && window.location.pathname === '/presentation' ? null : <Navbar />}
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Container>
                  <Switch>
                    <Route exact path="/">
                      {!user && <Redirect to="/login"/>}
                      {user && <Dashboard/>}
                    </Route>
                    <Route path="/login">
                      {user && <Redirect to="/"/>}
                      {!user && <Login/>}
                    </Route>
                    <Route path="/signup">
                      {user && <Redirect to="/"/>}
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
                    <Route path="/teams">
                      {!user && <Redirect to="/login"/>}
                      {user && <Teams/>}
                    </Route>
                    <Route path="/team/:id">
                      {!user && <Redirect to="/login"/>}
                      {user && <SingleTeam/>}
                    </Route>
                    <Route path="/invitations">
                      {!user && <Redirect to="/login"/>}
                      {user && <Invitations/>}
                    </Route>
                    <Route path="/terms">
                      <Terms/>
                    </Route>
                    <Route path="/privacy">
                      <Privacy/>
                    </Route>
                  </Switch>
                </Container>
              </Box>
              {user && <OnlineUsers/>}
            </Box>
            <Route path="/presentation">
              <Landing/>
            </Route>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
