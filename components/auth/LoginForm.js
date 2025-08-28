'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { FaXTwitter } from 'react-icons/fa6';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMessage(error.message);
    } else {
      window.location.href = '/dashboard'; // Redirect to dashboard on success
    }

    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the confirmation link!');
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <FaXTwitter className="w-10 h-10 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-center">Sign in to X</h1>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2 px-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition duration-200"
          >
            {loading ? 'Processing...' : 'Sign in with Google'}
          </button>
          <button
            disabled
            className="w-full py-2 px-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition duration-200 opacity-50 cursor-not-allowed"
          >
            Sign in with Apple
          </button>
        </div>
        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Phone, email, or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-black border border-gray-700 rounded-md"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition duration-200"
          >
            {loading ? 'Processing...' : 'Next'}
          </button>
        </form>
        <button
          disabled
          className="w-full py-3 bg-black border border-gray-700 text-white rounded-full font-bold hover:bg-gray-800 transition duration-200"
        >
          Forgot password?
        </button>
        <p className="text-center text-gray-500">
          Don&apos;t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}