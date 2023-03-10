import React, { useEffect, useState } from 'react';
import "./OnlineUsers.css"

import { useCollection } from "../../hooks/useCollection"

import Avatar from '../../components/avatar/Avatar'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import firebase from 'firebase/app';
import 'firebase/firestore';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    }
  }));

export default function OnlineUsers(){
    const { error, documents } = useCollection('users')
    const user = firebase.auth().currentUser
    const userRef = firebase.firestore().collection('users').doc(user.uid)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        userRef.onSnapshot(doc => {
          setUserData(doc.data());
        });
      }, []);
        
    const [state, setState] = useState({
        right: false
    })

    const toggleDrawer = (anchor, open) => (event) => {
        if (
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
          className="padding_top"
        >
            <List>
                <ListItem>
                    <ListItemText>
                        {error && <div className="error">{error}</div>}
                        {documents && documents.map(user => {
                            if (user && user.invitations && userData && userData.invitations) {
                                if (userData.invitations.some(invitation => invitation.team === user.invitations[0].team && user.invitations[0].options.accept === 'yes')) {
                                return (
                                    <div key={user.id} className="user_item">
                                    {!user.online &&
                                        <Avatar src={user.photoURL} />
                                    }
                                    {user.online &&
                                        <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                        >
                                        <Avatar src={user.photoURL} />
                                        </StyledBadge>
                                    }
                                    <span className="user_name">{user.displayName}</span>
                                    </div>
                                )
                                }
                            }
                            return null;
                        })}
                    </ListItemText>
                </ListItem>
            </List>
        </Box>
      );

    return (
        <>
            {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
                <Button className="absolute_position" onClick={toggleDrawer(anchor, true)}></Button>
                <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                >
                {list(anchor)}
                </Drawer>
            </React.Fragment>
            ))}
        </>
    )
}