import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase'; // Import the auth instance
import { useRouter } from 'next/router';

export default function Register() {
  const [error, setError] = useState(null); // State to handle registration errors
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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input type="email" {...register('email')} required />

        <label>Password:</label>
        <input type="password" {...register('password')} required />

        <button type="submit">Register</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
