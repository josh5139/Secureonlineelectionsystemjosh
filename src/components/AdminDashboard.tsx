import { useState } from 'react';
import { ArrowLeft, Users, Vote, Eye, Shield, Activity, CheckCircle2, Clock, XCircle, AlertTriangle, Download, Search, Filter } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  onBack: () => void;
  onLogout: () => void;
}

export function AdminDashboard({ onBack, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'voters' | 'candidates' | 'observers' | 'security'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for charts
  const registrationTrend = [
    { date: 'Nov 1', voters: 45000, candidates: 120, observers: 250 },
    { date: 'Nov 8', voters: 89000, candidates: 340, observers: 480 },
    { date: 'Nov 15', voters: 145000, candidates: 560, observers: 780 },
    { date: 'Nov 22', voters: 212000, candidates: 890, observers: 1200 },
    { date: 'Nov 29', voters: 487000, candidates: 1050, observers: 2100 },
    { date: 'Dec 5', voters: 2847392, candidates: 1284, observers: 3456 },
  ];

  const regionData = [
    { region: 'Oromia', voters: 890234, candidates: 342 },
    { region: 'Amhara', voters: 654123, candidates: 298 },
    { region: 'SNNP', voters: 456789, candidates: 187 },
    { region: 'Tigray', voters: 298456, candidates: 156 },
    { region: 'Addis Ababa', voters: 234567, candidates: 143 },
    { region: 'Somali', voters: 187432, candidates: 89 },
    { region: 'Other', voters: 125791, candidates: 69 },
  ];

  const statusData = [
    { name: 'Approved', value: 2456789, color: '#16a34a' },
    { name: 'Pending', value: 345678, color: '#f59e0b' },
    { name: 'Under Review', value: 34567, color: '#3b82f6' },
    { name: 'Rejected', value: 10358, color: '#ef4444' },
  ];

  const securityEvents = [
    { id: 1, type: 'Login Attempt', severity: 'low', timestamp: '2025-12-05 14:23:45', details: 'Multiple successful logins from same IP', status: 'Resolved' },
    { id: 2, type: 'Data Access', severity: 'medium', timestamp: '2025-12-05 13:45:12', details: 'Unusual bulk data query detected', status: 'Investigating' },
    { id: 3, type: 'Failed Auth', severity: 'high', timestamp: '2025-12-05 12:30:00', details: '15 failed login attempts from foreign IP', status: 'Blocked' },
    { id: 4, type: 'System Update', severity: 'low', timestamp: '2025-12-05 10:15:30', details: 'Security patch applied successfully', status: 'Completed' },
  ];

  const recentApplications = [
    { id: 'V-2024-45678', type: 'Voter', name: 'Abebe Kebede', status: 'pending', date: '2025-12-05' },
    { id: 'C-2024-01234', type: 'Candidate', name: 'Tigist Assefa', status: 'approved', date: '2025-12-05' },
    { id: 'O-2024-08765', type: 'Observer', name: 'Ethiopian CSO Network', status: 'review', date: '2025-12-05' },
    { id: 'V-2024-45679', type: 'Voter', name: 'Mohammed Ali', status: 'approved', date: '2025-12-05' },
    { id: 'C-2024-01235', type: 'Candidate', name: 'Hanna Tesfaye', status: 'review', date: '2025-12-04' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-700 bg-green-100';
      case 'pending': return 'text-yellow-700 bg-yellow-100';
      case 'review': return 'text-blue-700 bg-blue-100';
      case 'rejected': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'medium': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'low': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">National Election Board of Ethiopia</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                <span>Overview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('voters')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'voters'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Voters</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'candidates'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Vote className="w-5 h-5" />
                <span>Candidates</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('observers')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'observers'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>Observers</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'security'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Security</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm text-green-600">+12,483 today</span>
                </div>
                <div className="text-3xl text-gray-900 mb-1">2,847,392</div>
                <div className="text-sm text-gray-600">Registered Voters</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Vote className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-sm text-yellow-600">+23 today</span>
                </div>
                <div className="text-3xl text-gray-900 mb-1">1,284</div>
                <div className="text-sm text-gray-600">Candidates</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-sm text-red-600">+67 today</span>
                </div>
                <div className="text-3xl text-gray-900 mb-1">3,456</div>
                <div className="text-sm text-gray-600">Accredited Observers</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-blue-600">All clear</span>
                </div>
                <div className="text-3xl text-gray-900 mb-1">99.9%</div>
                <div className="text-sm text-gray-600">System Uptime</div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Registration Trend */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg text-gray-900 mb-4">Registration Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={registrationTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="voters" stackId="1" stroke="#16a34a" fill="#16a34a" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="candidates" stackId="2" stroke="#eab308" fill="#eab308" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="observers" stackId="3" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Regional Distribution */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg text-gray-900 mb-4">Voter Registration by Region</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="voters" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Application Status & Recent Applications */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Status Distribution */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg text-gray-900 mb-4">Application Status Distribution</h3>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-gray-900">Recent Applications</h3>
                  <button className="text-green-600 hover:text-green-700 text-sm">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">{app.name}</div>
                        <div className="text-xs text-gray-500">{app.id} • {app.date}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Voters Tab */}
        {activeTab === 'voters' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-gray-900">Voter Registrations</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
              </div>

              {/* Search and Filters */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, ID, or region..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* Stats Summary */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl text-green-900 mb-1">2,456,789</div>
                  <div className="text-sm text-green-700">Approved</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl text-yellow-900 mb-1">345,678</div>
                  <div className="text-sm text-yellow-700">Pending Review</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl text-blue-900 mb-1">34,567</div>
                  <div className="text-sm text-blue-700">Under Verification</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl text-red-900 mb-1">10,358</div>
                  <div className="text-sm text-red-700">Rejected</div>
                </div>
              </div>

              <p className="text-gray-600 text-center py-8">
                Detailed voter registry table would appear here with filtering, sorting, and approval actions.
              </p>
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-gray-900">Candidate Applications</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl text-green-900 mb-1">987</div>
                  <div className="text-sm text-green-700">Approved Candidates</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl text-yellow-900 mb-1">234</div>
                  <div className="text-sm text-yellow-700">Under Review</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl text-red-900 mb-1">63</div>
                  <div className="text-sm text-red-700">Rejected</div>
                </div>
              </div>

              <p className="text-gray-600 text-center py-8">
                Detailed candidate applications table with document review and approval workflow.
              </p>
            </div>
          </div>
        )}

        {/* Observers Tab */}
        {activeTab === 'observers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-gray-900">Observer Accreditations</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl text-green-900 mb-1">2,893</div>
                  <div className="text-sm text-green-700">Accredited Observers</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl text-yellow-900 mb-1">456</div>
                  <div className="text-sm text-yellow-700">Pending Review</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl text-blue-900 mb-1">107</div>
                  <div className="text-sm text-blue-700">Organizations</div>
                </div>
              </div>

              <p className="text-gray-600 text-center py-8">
                Observer credential management with assignment tracking and reporting tools.
              </p>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl text-gray-900">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl text-gray-900">2,847,392</div>
                    <div className="text-sm text-gray-600">Encrypted Records</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl text-gray-900">3</div>
                    <div className="text-sm text-gray-600">Active Alerts</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl text-gray-900">147</div>
                    <div className="text-sm text-gray-600">Blocked Attempts</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl text-gray-900 mb-6">Recent Security Events</h3>
              <div className="space-y-3">
                {securityEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>{getSeverityIcon(event.severity)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-gray-900">{event.type}</span>
                        <span className="text-xs text-gray-500">{event.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600">{event.details}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      event.status === 'Resolved' || event.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      event.status === 'Blocked' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl text-gray-900 mb-4">Security Measures Active</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-900 mb-1">End-to-End Encryption</h4>
                    <p className="text-sm text-green-700">All data transmissions are encrypted using AES-256</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-900 mb-1">Multi-Factor Authentication</h4>
                    <p className="text-sm text-green-700">MFA enabled for all user accounts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-900 mb-1">Tamper-Proof Audit Logs</h4>
                    <p className="text-sm text-green-700">Blockchain-based logging of all system actions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-900 mb-1">Data Redundancy</h4>
                    <p className="text-sm text-green-700">Real-time backup across multiple secure locations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
