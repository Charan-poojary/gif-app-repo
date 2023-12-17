import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase'; 
import { useRouter } from 'next/router';

export default function Register() {
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log('Data received:', data);
    const { email, password } = data;
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to the dashboard after successful registration
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setError(`Registration failed: ${error.message}`);
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="text" {...register('name')} required placeholder='name' autoFocus />

        <input type="email" {...register('email')} required placeholder='email' />

        <input type="password" {...register('password')} required placeholder='password'/>

        <input type="password" {...register('cpassword')} required placeholder='confirm password'/>


        <button type="submit">Register</button>

         <p>
            Already a user? <a href="/auth/login">Login</a>
          </p>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
    </div>
  );
}
