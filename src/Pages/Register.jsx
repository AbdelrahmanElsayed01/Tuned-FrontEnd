import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../APIs/CreateUserAPI';


function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

      const handleFullnameChange = (event) => {
        setFullname(event.target.value);
      };

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

      const handleRegister = async (e) => {
        e.preventDefault();
      
        try {
          const user = {
            name: fullname,
            username: username,
            email: email,
            password: password
          };

          const response = registerUser(user);
  
          toast.success('Registration successful!', {
          });
        } catch (error) {
          console.error('Error creating user:', error);
        }
      };
      

    return (
    <div className="container">
        <div className="logo">
            <img
             src="pictures/Tuned logo no background.png" 
             alt="Image" 
             style={{width: '350px'}}
             /> 
        </div>
        <div className="login-block">
            <h1>Register</h1>
        <input
            type="text"
            value={fullname}
            placeholder='Full Name'
            id='fullname'
            onChange={handleFullnameChange}
         />
        <input
            type="text"
            value={username}
            placeholder="username"
            id="username"
            onChange={handleUsernameChange} 
        />
        <input
            type='email'
            value={email}
            placeholder='Email'
            id='email'
            onChange={handleEmailChange}
        />
        <input
            type="password"
            value={password}
            placeholder="Password"
            id="password"
            onChange={handlePasswordChange} 
        />
            <button id='onSubmit' onClick={handleRegister}>Register</button>
            <p className="signin-link">
            Already have an account?
            <span className="signin-text">
            <Link to="/">Sign in</Link>
            </span>
            </p>
        </div>
    </div>
  );
}

export default Register;