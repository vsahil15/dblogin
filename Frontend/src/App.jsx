import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Navigate replace to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='*'
            element={
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Page not found</h2>
                <p>
                  The page you are looking for does not exist. Go to{' '}
                  <a href='/login'>Login</a> or <a href='/register'>Register</a>.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
