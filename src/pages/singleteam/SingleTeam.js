import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import firebase from 'firebase'
import { useCollection } from '../../hooks/useCollection'

import './SingleTeam.css'
import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { projectFirestore } from '../../firebase/config'


export default function Team() {
    const { id } = useParams()
    const { error, document } = useDocument('teams', id)
    const [ email , setEmail ] = useState('')
    const { documents } = useCollection('users')

    const form = useRef()

    async function sendEmail (e) {
        e.preventDefault();
    
        const userSnapshot = await projectFirestore.collection('users').where('email', '==', email).get()
        const userId = userSnapshot.docs[0].id

        const newInvitation = {
            team: document.team,
            options: {
            accept: "no",
            decline: 'no'
            }
        }

        projectFirestore.collection('users').doc(userId).update({
            invitations: firebase.firestore.FieldValue.arrayUnion(newInvitation)
        })

        emailjs.sendForm('service_nc2hpln', 'template_16cp9m6', form.current, '142eDodK_idzSVtiq')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        
        
        setEmail('')
    }

    return(
        <div className='Single_team'>
            {document && 
                <div className='details'>
                    <div className='item'>
                        <label>Team name:</label>
                        {document.team}
                    </div>
                    <div className='item'>
                        <label>Created By:</label>
                        {document.createdBy.displayName}
                    </div>

                    <div className='members'>
                        <label>Members:</label>
                        <ul>
                            {documents && documents.map(member => {
                                const filterUsersTeam = member.invitations
                                return (
                                    <>
                                        {filterUsersTeam && filterUsersTeam.map(filteruser =>{
                                            if(filteruser.team === document.team && filteruser.options.accept === 'yes'){
                                                return(
                                                    <li>
                                                        {member.displayName}
                                                    </li>
                                                )
                                            }
                                        })}
                                    </>
                                )
                            })}
                        </ul>
                    </div>

                    <div className='invite_people'>
                        <div className='title'>
                            <h4>Invite users to join the team:</h4>
                        </div>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className='item'>
                                <TextField 
                                    onChange={event => setEmail(event.target.value)}
                                    value={email}
                                    required
                                    type="email"
                                    label="ex: test@gmail.com" 
                                    name="email"
                                />
                            </div>
                            <div className='submit'>
                                <Button 
                                    type="submit" 
                                    variant="contained">
                                    Send Invite
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}