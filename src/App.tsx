import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { VoterRegistration } from './components/VoterRegistration';
import { CandidateEnrollment } from './components/CandidateEnrollment';
import { ObserverAccreditation } from './components/ObserverAccreditation';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginPage } from './components/LoginPage';
import { Toaster } from 'sonner@2.0.3';

export type UserRole = 'voter' | 'candidate' | 'observer' | 'admin' | null;

export interface User {
  id: string;
  role: UserRole;
  name: string;
  authenticated: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'voter' | 'candidate' | 'observer' | 'admin' | 'login'>('landing');
  const [user, setUser] = useState<User | null>(null);

  const handleNavigate = (page: typeof currentPage) => {
    setCurrentPage(page);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === 'admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('landing');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      <Toaster position="top-right" richColors />
      
      {currentPage === 'landing' && (
        <LandingPage 
          onNavigate={handleNavigate} 
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'login' && (
        <LoginPage 
          onLogin={handleLogin}
          onBack={() => setCurrentPage('landing')}
        />
      )}
      
      {currentPage === 'voter' && (
        <VoterRegistration 
          onBack={() => setCurrentPage('landing')}
          user={user}
        />
      )}
      
      {currentPage === 'candidate' && (
        <CandidateEnrollment 
          onBack={() => setCurrentPage('landing')}
          user={user}
        />
      )}
      
      {currentPage === 'observer' && (
        <ObserverAccreditation 
          onBack={() => setCurrentPage('landing')}
          user={user}
        />
      )}
      
      {currentPage === 'admin' && user?.role === 'admin' && (
        <AdminDashboard 
          onBack={() => setCurrentPage('landing')}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
