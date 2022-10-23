import './ProjectList.css'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Avatar from '../avatar/Avatar'

export default function ProjectList({ projects }){
    return(
        <div className='projects_listing'>
            {projects.length === 0 && <p>No Projects yet!</p>}
            {projects.map(project => (
                <Link to={`/projects/${project.id}`} key={project.id}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {project.name}
                            </Typography>
                            <Typography className='max_height' variant="body2" color="text.secondary">
                                {project.details}
                            </Typography>
                            <Typography className='due_date' variant="body3" color="text.secondary">
                                <strong>Due by: </strong>{project.dueDate.toDate().toDateString()}
                            </Typography>
                            <div className='assigned_to'>
                                <ul>
                                    {project.assignedUsersList.map(user => (
                                        <li key={user.photoURL}>
                                            <Avatar src={user.photoURL}/>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            ))}
        </div>
    )
}