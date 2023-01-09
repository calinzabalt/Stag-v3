import './Invitation.css'
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import firebase from 'firebase/app';
import 'firebase/firestore';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

export default function Invitation(){
    const [expanded, setExpanded] = React.useState('panel1')
    const [userData, setUserData] = useState(null)
    const user = firebase.auth().currentUser
    const userRef = firebase.firestore().collection('users').doc(user.uid)

    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
      userRef.onSnapshot(doc => {
        setUserData(doc.data());
        setInvitations(doc.data().invitations);
      });
    }, []);

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    const onAccept = (invitation, e) => {
      e.preventDefault()
      invitation.options.accept = 'yes'

      const index = invitations.findIndex(inv => inv.id === invitation.id)
      firebase.firestore().collection('users').doc(user.uid).update({
        invitations: invitations
      });
    }

    const onDecline = (invitation, e) => {
      e.preventDefault()
      invitation.options.decline = 'yes'

      const index = invitations.findIndex(inv => inv.id === invitation.id)
      firebase.firestore().collection('users').doc(user.uid).update({
        invitations: invitations
      });
    }
  
    return (
      <div className='user_invitations'>
        <div className='title'>
            <h2>Invitations</h2>
        </div>

        {invitations && invitations.map(invitation => {
          return (
            <Accordion className={invitation.options.accept === 'yes' || invitation.options.decline === 'yes' ? 'hide' : ''} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>{invitation.team}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                    You've been invited to join team "{invitation.team}" <br/>
                    accept: {invitation.options.accept} <br/>
                    decline: {invitation.options.decline}
                </Typography>
                <br/>
                <Stack spacing={2} direction="row">
                <Button onClick={(e) => onAccept(invitation, e)} id={invitation.id} variant="contained" color="success">
                    Accept
                </Button>
                <Button onClick={(e) => onDecline(invitation, e)} id={invitation.id} variant="contained" color="error">
                    Decline
                </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>
            )
        })}
  
      </div>
    )
}