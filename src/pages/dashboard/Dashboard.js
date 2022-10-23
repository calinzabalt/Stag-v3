import { useState } from "react"
import './Dashboard.css'

import ProjectList from '../../components/projectList/ProjectList'

import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from "../../hooks/useAuthContext";
import ProjectFilter from './ProjectFilter';

export default function Dashboard() {
    const { user } = useAuthContext()
    const [currentFilter, setCurrentFilter] = useState('all')
    const { documents, error } = useCollection('projects')

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const projects = documents ? documents.filter((document) => {
        switch (currentFilter) {
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach((u) => {
                    if (user.uid === u.id) {
                        assignedToMe = true
                    } 
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'copyright':
                console.log(document.category, currentFilter)
                return document.category === currentFilter
            default:
                return true
        }
    }) : null
    
    return (
        <div>
            {/*<CreateProject/>*/}
            { /* 
            {error &
                <Stack sx={{ width: '500px', paddingBottom: '20px', paddingTop: '20px' }} spacing={2}>
                    <Alert severity="error">
                        {error}
                    </Alert>
                </Stack>
            } */}
            {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
            {projects && <ProjectList projects={projects}/>}
        </div>
    )
}