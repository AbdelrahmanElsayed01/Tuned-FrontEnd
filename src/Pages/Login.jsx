import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { login } from '../APIs/LoginAPI';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
          const response = await login(username, password);

          if (response.success) {
            navigate('/home', { state: { username: username } });
          } else {
            console.log('Login failed:', response.message);
            alert("Wrong credentials, Try again")
          }
        } catch (error) {
          console.error('Error during login:', error);
          console.log('Login failed');
        }
      };
      

    return (
    <div className="container">
      <div className="logo">
        <img
          src="pictures/Tuned logo no background.png"
          alt="Image"
          style={{ width: '350px' }}
        />
      </div>
      <div className="login-block">
        <h1>Login</h1>
        <input
          type="text"
          value={username}
          placeholder="username"
          id="username"
          onChange={handleUsernameChange} 
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          id="password"
          onChange={handlePasswordChange} 
        />
        <button id='onSubmit' onClick={handleLogin}>Login</button>
        <p className="signup-link">
        No account?
        <span className="signup-text">
        <Link to="/register">Sign up</Link>    
        </span>
      </p>
      </div>
    </div>
  );
}

export default Login;
