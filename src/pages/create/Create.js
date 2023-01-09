import './Create.css'
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Select from 'react-select'

import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

import { timestamp } from '../../firebase/config'

import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

import { useHistory } from 'react-router-dom'
import heroImage from '../../assets/create_project.jpg'

import firebase from 'firebase/app'
import 'firebase/firestore'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'copyright', label: 'Copyright' },
    { value: 'marketing', label: 'Marketing' }
  ]

export default function Create() {
    const history = useHistory();
    const { addDocument, response } = useFirestore('projects');
    const { documents } = useCollection('users');
    const [users, setUsers] = useState([]);
    const { user } = useAuthContext();
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)
    const [formSuccess, setFormSuccess] = useState(null)

    const Currentuser = firebase.auth().currentUser
    const userRef = firebase.firestore().collection('users').doc(Currentuser.uid)
    const [userData, setUserData] = useState(null)

    console.log(userData)

    useEffect(() => {
        if(documents && userData){
            const options = documents.map(user => {
                if (user && user.invitations && userData && userData.invitations) {
                    if (userData.invitations.some(invitation => invitation.team === user.invitations[0].team && user.invitations[0].options.accept === 'yes') && userData.email !== user.email) {
                        return { value: user, label: user.displayName }
                    }
                }
              }).filter(Boolean);
            setUsers(options)
        }
    }, [documents, userData])

    useEffect(() => {
        userRef.onSnapshot(doc => {
          setUserData(doc.data());
        });
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError( null)

        if(!category){
            setFormError('Please select a project category')
            return
        }

        if(assignedUsers.length < 1) {
            setFormError('Please assign the project to at least 1 user')
            return
        }

        if(formError === null){
            setFormSuccess('Project added successfully')
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((usersAssigned) => {
            return {
                displayName: usersAssigned.value.displayName,
                photoURL: usersAssigned.value.photoURL,
                id: usersAssigned.value.id || user.uid
            }
        })

        const project = {
            name, 
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }

        await addDocument(project)
        if(!response.error) {
            history.push('/')
        }
        console.log(project)
    }

    return (
        <div className='create_project_wrapper'>
            <div className='image'>
                <img src={heroImage}/>
            </div>
            <div className='create_project'>
                {formError&&
                <Stack sx={{ width: '500px', paddingBottom: '20px', paddingTop: '20px' }} spacing={2}>
                    <Alert severity="error">
                        {formError}
                    </Alert>
                </Stack>
                }
                {formSuccess &&
                <Stack sx={{ width: '500px', paddingBottom: '20px', paddingTop: '20px' }} spacing={2}>
                    <Alert severity="success">{formSuccess}</Alert>
                </Stack>
                }
                <div className='title'>
                    <h2>Create a new project</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="item">
                        <TextField 
                            required
                            type="text"
                            label="Project name" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="item">
                        <TextareaAutosize
                            required
                            aria-label="minimum height"
                            placeholder="Project details"
                            onChange={(e) => setDetails(e.target.value)}
                            value={details}
                            minRows={5}
                        />
                    </div>
                    <div className='item date'>
                        <DatePicker
                            required
                            selected={dueDate}
                            //selected={startDate} 
                            onChange={(date) => setDueDate(date)}
                            value={dueDate}
                            placeholderText="Due Date"
                        />
                    </div>
                    <div className='item'>
                        <Select 
                            onChange={(option) => setCategory(option)}
                            options={categories} 
                            placeholder="Select Category"
                        />
                    </div>
                    <div className='item'>
                        {user &&
                            <Select 
                                onChange={option => setAssignedUsers(option)}
                                options={[
                                    { value: user, label: user.displayName },
                                    ...users
                                ]}
                                isMulti
                                placeholder="Select Users"
                            />
                        }
                    </div>
                    <div className='submit_form'>
                        <Button 
                            type="submit" 
                            variant="contained">
                            Add Project
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}