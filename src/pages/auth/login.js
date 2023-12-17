import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function Login() {
  const [error, setError] = useState(null); 
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the dashboard after successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Invalid email or password');
    }
  };

  return (
<div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="email" {...register('email')} required placeholder='email' autoFocus/>

          <input type="password" {...register('password')} required placeholder='password' />

          <button type="submit">Login</button>
          <p>
            Are you a new user? <a href="/auth/register">Register</a>
          </p>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}
