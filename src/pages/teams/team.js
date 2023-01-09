import './Team.css'
import TextField from '@mui/material/TextField'
import heroImage from '../../assets/create_team.jpg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useFirestore } from '../../hooks/useFirestore'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import firebase from 'firebase'
import { projectFirestore } from '../../firebase/config'

export default function Team(){
    const [name, setName] = useState('');
    const { addDocument, response } = useFirestore('teams')
    const { documents, error } = useCollection('teams')
    const { deleteDocument } = useFirestore('teams')
    const { user } = useAuthContext()
    const [checkTeam, setCheckTeam] = useState(false)

    const createdBy = {
        displayName: user.displayName,
        id: user.uid
    }
    
    async function handleSubmit (event) {
        event.preventDefault()
        addDocument({ team: name, createdBy})

        const userId = user.uid

        const newInvitation = {
            team: name,
            options: {
            accept: "yes",
            decline: 'no'
            }
        }

        projectFirestore.collection('users').doc(userId).update({
            invitations: firebase.firestore.FieldValue.arrayUnion(newInvitation)
        })

        setName('')


    }

    const handleClick = (id) => {
        deleteDocument(id)
    }

    useEffect(() => {
        if (documents) {
          const userIdExists = documents.some(doc => doc.createdBy.id === user.uid);
          setCheckTeam(userIdExists);
        }
      }, [documents, user]);

    return(
        <div className='team_listing'>
            {documents && documents.length > 0 && checkTeam === true &&
                <div className='all_teams'>
                    <div className='title'>
                        <h2>All Teams</h2>
                    </div>
                    <div className='flex'>
                        {documents && documents.map(team => (
                            user.uid === team.createdBy.id && (
                            <div className='team' key={team.id}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleClick(team.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    }
                                    >
                                    <Link to={`/team/${team.id}`} key={team.id}>
                                        <ListItemText primary={team.team}/>
                                    </Link>
                                </ListItem>
                            </div>
                            )
                        ))}
                    </div>
                    <div className='create_more_teams'>
                        <div className='title'>
                            <h4>Add more teams:</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='item'>
                                <TextField 
                                    required
                                    type="text"
                                    label="Team name" 
                                    onChange={event => setName(event.target.value)} 
                                    value={name} 
                                    name="name"
                                />
                            </div>
                            <div className='submit'>
                                <Button 
                                    type="submit" 
                                    variant="contained">
                                    Add Team
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
             }

            {checkTeam === false &&
                <>
                    <div className='image'>
                        <img src={heroImage}/>
                    </div>
                    <div className='create_team'>
                        <div className='title'>
                            <h2>To get started create a team:</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='item'>
                                <TextField 
                                    required
                                    type="text"
                                    label="Team name" 
                                    onChange={event => setName(event.target.value)} 
                                    value={name} 
                                    name="name"
                                />
                            </div>
                            <div className='submit'>
                                <Button 
                                    type="submit" 
                                    variant="contained">
                                    Add Team
                                </Button>
                            </div>
                        </form>
                    </div>
                </>
            }
        </div>
    )
}