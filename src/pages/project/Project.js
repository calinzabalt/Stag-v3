import './Project.css'
import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments';

export default function Project() {
    const { id } = useParams()
    const { error, document } = useDocument('projects', id)

    if (error) { 
        return (
            <Stack sx={{ width: '500px', paddingBottom: '20px', paddingTop: '20px' }} spacing={2}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Stack>
        )
    }
    if(!document){
        return <div className='loading'>Loading...</div>
    }

    return (
        <div className='project_details'>
            <ProjectSummary project={document}/>
            <ProjectComments project={document}/>
        </div>
    )
}