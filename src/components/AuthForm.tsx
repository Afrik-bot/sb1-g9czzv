import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EmailForm from './auth/EmailForm';
import PhoneForm from './auth/PhoneForm';

type AuthMethod = 'email' | 'phone';

export default function AuthForm() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup, resetPassword } = useAuth();

  const handleEmailSubmit = async (email: string, password: string, rememberMe: boolean) => {
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password, rememberMe);
      } else {
        await signup(email, password);
      }
      navigate('/');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }

    setLoading(false);
  };

  const handlePhoneSubmit = async (phone: string) => {
    setError('');
    setLoading(true);

    try {
      // Phone auth logic will be implemented here
      console.log('Phone auth:', phone);
      navigate('/');
    } catch (err) {
      setError('Phone authentication failed. Please try again.');
    }

    setLoading(false);
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      await resetPassword(email);
      setError('Check your email for password reset instructions');
    } catch (err) {
      setError('Failed to reset password');
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800">
      <div className="flex rounded-lg bg-gray-800/30 p-1">
        <button
          onClick={() => setAuthMethod('email')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            authMethod === 'email' 
              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Email
        </button>
        <button
          onClick={() => setAuthMethod('phone')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            authMethod === 'phone' 
              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Phone
        </button>
      </div>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      {authMethod === 'email' ? (
        <EmailForm
          isLogin={isLogin}
          onSubmit={handleEmailSubmit}
          onForgotPassword={handleForgotPassword}
          loading={loading}
        />
      ) : (
        <PhoneForm
          onSubmit={handlePhoneSubmit}
          loading={loading}
        />
      )}
      
      {authMethod === 'email' && (
        <div className="text-sm text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-gray-400 hover:text-gray-300 transition-colors duration-200"
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <span className="text-purple-400 hover:text-purple-300">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}