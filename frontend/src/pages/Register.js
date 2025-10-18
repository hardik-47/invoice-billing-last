import React, {  useState } from 'react';
import '../styles/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    
    try {
      const res= await axios.post('http://localhost:5000/api/auth/register',{
        username:formData.name,
        email:formData.email,
        password:formData.password
      })
      console.log(res);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
    }

  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          name="name" 
          placeholder="Your name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          name="email" 
          placeholder="you@example.com" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          name="password" 
          placeholder="••••••••" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
