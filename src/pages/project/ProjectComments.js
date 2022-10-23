import { useState } from 'react'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../../components/avatar/Avatar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ProjectComments({ project }){
    const { updateDocument, response } = useFirestore('projects');
    const [newComment, setNewComment] = useState('')
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random() // change this later to a third library, because it can have similar id
        }
        
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        if (!response.error) {
            setNewComment('')
        }
    }

    return(
        <div className='project_comments'>
            <Typography variant="h5">Project Comments</Typography>
            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                         <Card variant="outlined">
                            <CardContent>
                                <div className='avatar_and_name'>
                                    <Avatar src={comment.photoURL} />
                                    <span>{comment.displayName}</span>
                                </div>
                                <div className='comment_date'>
                                    <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
                                </div>
                                <div className='comment_content'>
                                    <p>{comment.content}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <div className='item'>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    >
                    </textarea>
                    <Button variant="outlined" type='submit'>Add comment</Button >
                </div>
            </form>
        </div>
    )
}