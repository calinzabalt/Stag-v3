import Avatar from '../../components/avatar/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'

import Paper from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function ProjectSummary({ project }) {
    const { deleteDocument } = useFirestore('projects')
    const { user } = useAuthContext()
    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault();
        deleteDocument(project.id)
        history.push('/')
    }

    return (
        <div className='project_summary'>
            <Paper elevation={2}>
                <CardContent>
                    <div className="project_name">
                        <Typography variant="h6">{project.name}</Typography>
                    </div>
                    <div className='created_by'>
                        By { project.createdBy.displayName }
                    </div>
                    <div className="dute_date">
                        <strong>Project due:</strong> {project.dueDate.toDate().toDateString()}
                    </div>
                    <div className="details">
                        <Typography variant="body1" gutterBottom>
                            {project.details}
                        </Typography>
                    </div>
                    <div className="assigned_users">
                        <Typography variant="subtitle1">Project is assigned to:</Typography>
                        <div className='assigned_users_content'>
                            {project.assignedUsersList.map(user => (
                                <div className='item' key={user.id}>
                                    <Avatar src={user.photoURL} />
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Paper>
            {user.uid === project.createdBy.id && (
                <div className='mark_as_complete'>
                    <Button variant="contained" onClick={handleClick}>Mark as Complete</Button >
                </div>
            )}
        </div>
    )
}