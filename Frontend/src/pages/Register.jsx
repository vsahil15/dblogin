import API from '../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register(){
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPass, setNewUserPass] = useState('');
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();

    const verifyEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleRegister = async(e) =>{
      e.preventDefault();
      const email = newUserEmail.trim().toLowerCase();
      const password = newUserPass;

      if (email === '' || !verifyEmail(email)) {
        setAuthError('Please enter a valid email address');
        return;
      }
      if (password.length < 5) {
        setAuthError('Password must be at least 5 characters.');
        return;
      }

      try {
        const response = await API.post('/api/v1/auth/register', { email, password });
        console.log(response.data);
        setAuthError('');
        navigate('/login');
      } catch (err) {
        setAuthError(err.response?.data?.message || err.message || 'Server connection failed. Try again later.');
      }
    }

    return (
        <div className='app'>
            <div className='auth-card'>
                <h2>Create your account</h2>
                <p className='subtitle'>Register a new account to start using the secure login system.</p>
                <form className='auth-form' onSubmit={handleRegister}>
                    <input
                        className='auth-input'
                        type='email'
                        placeholder='Email address'
                        id='user_email'
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                    />
                    <input
                        className='auth-input'
                        type='password'
                        placeholder='Password'
                        id='user_pass'
                        value={newUserPass}
                        onChange={(e) => setNewUserPass(e.target.value)}
                    />
                    <button className='auth-button' type='submit'>Register</button>
                    {authError && <p className='auth-error'>{authError}</p>}
                </form>
                <div className='auth-footer'>
                    Already have an account? <button className='auth-link-button' onClick={() => navigate('/login')}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
