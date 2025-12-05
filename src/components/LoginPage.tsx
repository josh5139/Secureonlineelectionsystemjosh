import { useState } from 'react';
import { ArrowLeft, Lock, Mail, Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { User } from '../App';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showMFA, setShowMFA] = useState(false);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    // Simulate MFA requirement
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      role: email.includes('admin') ? 'admin' : 'voter',
      name: email.split('@')[0],
      authenticated: false
    };

    setPendingUser(mockUser);
    setShowMFA(true);
    toast.success('Verification code sent to your mobile device');
  };

  const handleVerifyMFA = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) {
      toast.error('Please enter the verification code');
      return;
    }

    if (verificationCode.length !== 6) {
      toast.error('Verification code must be 6 digits');
      return;
    }

    if (pendingUser) {
      const authenticatedUser = { ...pendingUser, authenticated: true };
      onLogin(authenticatedUser);
      toast.success('Login successful!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl text-gray-900 mb-2">Secure Login</h2>
            <p className="text-gray-600">Access your electoral account</p>
          </div>

          {!showMFA ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Use 'admin@nebe.gov.et' for admin access
                </p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue to Verification
              </button>

              <div className="text-center">
                <a href="#" className="text-green-600 hover:text-green-700 text-sm">
                  Forgot your password?
                </a>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyMFA} className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-green-900 mb-1">Multi-Factor Authentication</h3>
                    <p className="text-sm text-green-700">
                      A 6-digit verification code has been sent to your registered mobile device.
                      Enter the code below to complete your login.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
                <p className="text-sm text-gray-500 mt-1 text-center">
                  Use any 6 digits for demo (e.g., 123456)
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowMFA(false);
                    setVerificationCode('');
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Verify & Login
                </button>
              </div>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => toast.success('New code sent!')}
                  className="text-green-600 hover:text-green-700 text-sm"
                >
                  Resend verification code
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>Your connection is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
