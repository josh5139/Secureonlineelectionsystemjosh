import { Vote, UserCheck, Eye, Shield, Globe, BarChart3, Lock, CheckCircle2, LogIn, LogOut } from 'lucide-react';
import { User } from '../App';

interface LandingPageProps {
  onNavigate: (page: 'voter' | 'candidate' | 'observer' | 'admin' | 'login') => void;
  user: User | null;
  onLogout: () => void;
}

export function LandingPage({ onNavigate, user, onLogout }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Vote className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-green-900">National Election Board of Ethiopia</h1>
                  <p className="text-sm text-gray-600">Digital Electoral System</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-700 transition-colors">
                <Globe className="w-5 h-5" />
                <span>English</span>
              </button>
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-gray-700">Welcome, {user.name}</span>
                  <button 
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => onNavigate('login')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl mb-4">Secure Digital Election System</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Empowering democracy through secure, transparent, and accessible digital electoral services
              for the 7th National Election
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5" />
                <span>End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Lock className="w-5 h-5" />
                <span>Multi-Factor Authentication</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span>Tamper-Proof Logs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-gray-900 mb-4">Digital Electoral Services</h3>
            <p className="text-xl text-gray-600">Choose a service to get started</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Voter Registration */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                <UserCheck className="w-12 h-12 text-white mb-4" />
                <h4 className="text-2xl text-white mb-2">Voter Registration</h4>
                <p className="text-green-100">Register to exercise your democratic right</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Secure online registration</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Instant verification process</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Digital voter ID card</span>
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('voter')}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Register as Voter
                </button>
              </div>
            </div>

            {/* Candidate Enrollment */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-6">
                <Vote className="w-12 h-12 text-white mb-4" />
                <h4 className="text-2xl text-white mb-2">Candidate Enrollment</h4>
                <p className="text-yellow-100">Submit your candidacy digitally</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Streamlined application process</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Digital document submission</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Real-time status updates</span>
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('candidate')}
                  className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Enroll as Candidate
                </button>
              </div>
            </div>

            {/* Observer Accreditation */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
                <Eye className="w-12 h-12 text-white mb-4" />
                <h4 className="text-2xl text-white mb-2">Observer Accreditation</h4>
                <p className="text-red-100">Register as an election observer</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>CSO & individual registration</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Digital credential management</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Access to observation tools</span>
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('observer')}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Register as Observer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public Statistics Dashboard */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BarChart3 className="w-8 h-8 text-green-600" />
              <h3 className="text-3xl text-gray-900">Live Registration Statistics</h3>
            </div>
            <p className="text-xl text-gray-600">Real-time transparency in electoral participation</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-700">Total Voters</span>
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl text-green-900 mb-1">2,847,392</div>
              <div className="text-sm text-green-600">+12,483 today</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-yellow-700">Candidates</span>
                <Vote className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-3xl text-yellow-900 mb-1">1,284</div>
              <div className="text-sm text-yellow-600">+23 today</div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-700">Observers</span>
                <Eye className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-3xl text-red-900 mb-1">3,456</div>
              <div className="text-sm text-red-600">+67 today</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-700">Security Events</span>
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl text-blue-900 mb-1">0</div>
              <div className="text-sm text-blue-600">System secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-gray-900 mb-4">Security & Trust</h3>
            <p className="text-xl text-gray-600">Multiple layers of protection for your data</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Shield className="w-10 h-10 text-green-600 mb-4" />
              <h4 className="text-lg text-gray-900 mb-2">End-to-End Encryption</h4>
              <p className="text-gray-600">All data is encrypted during transmission and storage</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Lock className="w-10 h-10 text-green-600 mb-4" />
              <h4 className="text-lg text-gray-900 mb-2">Multi-Factor Auth</h4>
              <p className="text-gray-600">Multiple verification methods protect your account</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-green-600 mb-4" />
              <h4 className="text-lg text-gray-900 mb-2">Audit Logs</h4>
              <p className="text-gray-600">Every action is logged and monitored for security</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <BarChart3 className="w-10 h-10 text-green-600 mb-4" />
              <h4 className="text-lg text-gray-900 mb-2">Data Redundancy</h4>
              <p className="text-gray-600">Secure backup systems prevent data loss</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="mb-4">About NEBE</h4>
              <p className="text-gray-400">
                The National Election Board of Ethiopia ensures free, fair, and credible elections
                through digital innovation and transparency.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Election Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@nebe.org.et</li>
                <li>Hotline: +251-11-XXX-XXXX</li>
                <li>Address: Addis Ababa, Ethiopia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 National Election Board of Ethiopia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
