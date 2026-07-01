import API from '../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [authError, setAuthError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const verifyEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handlelogin = async (e) => {
        e.preventDefault();
        const email = userEmail.trim().toLowerCase();
        const password = userPass;

        if (email === '' || !verifyEmail(email)) {
            setAuthError('Please enter a valid email address');
            return;
        }

        if (password.length < 5) {
            setAuthError('Password must be at least 5 characters.');
            return;
        }

        try {
            const response = await API.post('/api/v1/auth/login', { email, password });
            setSuccessMessage(response.data?.message || 'Login successful');
            setAuthError('');
        } catch (err) {
            setAuthError(err.response?.data?.message || err.message || 'Server connection failed. Try again later.');
        }
    };

    return (
        <div className='app'>
            <div className='auth-card'>
                <h2>Welcome back!</h2>
                <p className='subtitle'>Sign in to access your account and manage your app data securely.</p>
                <form className='auth-form' onSubmit={handlelogin}>
                    <input
                        className='auth-input'
                        type='email'
                        placeholder='Email address'
                        id='user_email'
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <input
                        className='auth-input'
                        type='password'
                        placeholder='Password'
                        id='user_pass'
                        value={userPass}
                        onChange={(e) => setUserPass(e.target.value)}
                    />
                    <button className='auth-button' type='submit'>Login</button>
                    {authError && <p className='auth-error'>{authError}</p>}
                    {successMessage && <p className='auth-success'>{successMessage}</p>}
                </form>
                <div className='auth-footer'>
                    New here? <button className='auth-link-button' onClick={() => navigate('/register')}>Create an account</button>
                </div>
            </div>
        </div>
    );
}



export default Login

