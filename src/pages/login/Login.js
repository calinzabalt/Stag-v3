import './Login.css'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isPending, error } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password)
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <div className='title'>
                <h2>Login</h2>
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
            <div className='submit_form'>
                {!isPending && 
                    <Button 
                        type="submit" 
                        variant="contained">
                        Login
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