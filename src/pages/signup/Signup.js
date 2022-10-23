import './Signup.css'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const [imgData, setImgData] = useState(null);
    const { signup, isPending, error } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName, thumbnail)
    }

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);

        if(!selected) {
            setThumbnailError('Please select a file')
            return
        }
        if(!selected.type.includes('image')){
            setThumbnailError('Selected file must be an image')
            return
        }
        if(selected.size > 300000){
            setThumbnailError('Image file size is to big')
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
        console.log('thumbnail updated')
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <div className='title'>
                <h2>Sign up</h2>
            </div>
            <div className="item">
                <TextField 
                    required
                    type="email"
                    label="Email" 
                    variant="outlined" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className='item'>
                <TextField 
                    required
                    type="password"
                    label="Password" 
                    variant="outlined" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div className='item'>
                <TextField 
                    required
                    type="text" 
                    label="Display Name" 
                    variant="outlined" 
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </div>
            <div className='item profile'>
            {thumbnailError && <div className='error'>{thumbnailError}</div>}
            <IconButton color="primary" aria-label="upload picture" component="label">
                {thumbnail && <Avatar src={imgData} alt={thumbnail.name}/>}
                <input hidden type="file" onChange={handleFileChange} />
                <PhotoCamera />
            </IconButton>
            </div>
            <div className='submit_form'>
                {!isPending && 
                    <Button 
                        type="submit" 
                        variant="contained">
                        Create account
                    </Button>
                }
                {isPending &&  
                    <Button loading variant="outlined">
                        Loading
                    </Button>
                }
            </div>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}