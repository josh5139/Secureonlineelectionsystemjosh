import { useState } from 'react';
import { ArrowLeft, Vote, Upload, CheckCircle2, Users, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { User } from '../App';

interface CandidateEnrollmentProps {
  onBack: () => void;
  user: User | null;
}

type Step = 1 | 2 | 3;

export function CandidateEnrollment({ onBack }: CandidateEnrollmentProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationalId: '',
    education: '',
    politicalParty: '',
    independentCandidate: false,
    constituency: '',
    position: '',
    biography: '',
    platform: '',
    criminalRecord: 'no',
    phoneNumber: '',
    email: '',
    photoDocument: null as File | null,
    educationCertificate: null as File | null,
    clearanceCertificate: null as File | null,
    supportLetters: null as File | null,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof typeof formData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.dateOfBirth || !formData.nationalId || !formData.education) {
          toast.error('Please fill in all required personal information');
          return false;
        }
        return true;
      case 2:
        if (!formData.position || !formData.constituency || (!formData.politicalParty && !formData.independentCandidate)) {
          toast.error('Please fill in all required candidacy information');
          return false;
        }
        if (!formData.biography || !formData.platform) {
          toast.error('Please provide your biography and platform statement');
          return false;
        }
        return true;
      case 3:
        if (!formData.photoDocument || !formData.educationCertificate || !formData.clearanceCertificate) {
          toast.error('Please upload all required documents');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep((currentStep + 1) as Step);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      toast.success('Candidate enrollment submitted successfully! Your application will be reviewed within 5-7 business days.');
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

  const positions = [
    'Member of Parliament',
    'Regional Council Member',
    'Woreda Council Member',
    'Mayor',
  ];

  const politicalParties = [
    'Prosperity Party',
    'Ethiopian Citizens for Social Justice',
    'Oromo Federalist Congress',
    'Arena Tigray',
    'Ethiopian Democratic Party',
    'National Movement of Amhara',
    'Other',
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Vote className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl">Candidate Enrollment</h2>
                <p className="text-yellow-100">Submit your candidacy for the 7th National Election</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mt-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step ? 'bg-white text-yellow-600' : 'bg-white/20 text-white'
                    }`}>
                      {currentStep > step ? <CheckCircle2 className="w-6 h-6" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`h-1 w-full mx-2 ${
                        currentStep > step ? 'bg-white' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={currentStep >= 1 ? 'text-white' : 'text-white/60'}>Personal Details</span>
              <span className={currentStep >= 2 ? 'text-white' : 'text-white/60'}>Candidacy Info</span>
              <span className={currentStep >= 3 ? 'text-white' : 'text-white/60'}>Documentation</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-900">Personal Information</h3>
                
                <div>
                  <label className="block text-gray-700 mb-2">
                    Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your full legal name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 25)).toISOString().split('T')[0]}
                    />
                    <p className="text-sm text-gray-500 mt-1">Must be 25 years or older</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">
                      National ID Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.nationalId}
                      onChange={(e) => handleInputChange('nationalId', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="National ID"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Highest Education Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select education level</option>
                    <option value="primary">Primary Education</option>
                    <option value="secondary">Secondary Education</option>
                    <option value="diploma">Diploma</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="doctorate">Doctorate</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="+251 9XX XXX XXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Criminal Record Declaration <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.criminalRecord}
                    onChange={(e) => handleInputChange('criminalRecord', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="no">No criminal record</option>
                    <option value="yes">I have a criminal record</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    Certain criminal convictions may disqualify candidacy
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Candidacy Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-900">Candidacy Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Position Sought <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">Select position</option>
                      {positions.map((position) => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Constituency <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.constituency}
                      onChange={(e) => handleInputChange('constituency', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter constituency name"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      checked={formData.independentCandidate}
                      onChange={(e) => handleInputChange('independentCandidate', e.target.checked)}
                      className="w-4 h-4 text-yellow-600 rounded focus:ring-2 focus:ring-yellow-500"
                    />
                    <span className="text-gray-700">I am running as an independent candidate</span>
                  </label>

                  {!formData.independentCandidate && (
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Political Party <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.politicalParty}
                        onChange={(e) => handleInputChange('politicalParty', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      >
                        <option value="">Select political party</option>
                        {politicalParties.map((party) => (
                          <option key={party} value={party}>{party}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Biography <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.biography}
                    onChange={(e) => handleInputChange('biography', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows={4}
                    placeholder="Provide a brief biography including your experience and qualifications (max 500 words)"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.biography.split(' ').filter(w => w).length} / 500 words
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Platform Statement <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.platform}
                    onChange={(e) => handleInputChange('platform', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows={6}
                    placeholder="Describe your political platform and key policy proposals (max 1000 words)"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.platform.split(' ').filter(w => w).length} / 1000 words
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Documentation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-900">Required Documentation</h3>
                
                <div>
                  <label className="block text-gray-700 mb-2">
                    Passport Photo <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Professional headshot photo</p>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange('photoDocument', e.target.files?.[0] || null)}
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="inline-block mt-2 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 cursor-pointer transition-colors"
                    >
                      Select File
                    </label>
                    {formData.photoDocument && (
                      <div className="mt-3 flex items-center justify-center gap-2 text-yellow-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{formData.photoDocument.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Education Certificate <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Certified copy of highest education certificate</p>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange('educationCertificate', e.target.files?.[0] || null)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="education-upload"
                    />
                    <label
                      htmlFor="education-upload"
                      className="inline-block mt-2 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 cursor-pointer transition-colors"
                    >
                      Select File
                    </label>
                    {formData.educationCertificate && (
                      <div className="mt-3 flex items-center justify-center gap-2 text-yellow-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{formData.educationCertificate.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Police Clearance Certificate <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
                    <CheckCircle2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Recent police clearance (issued within 3 months)</p>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange('clearanceCertificate', e.target.files?.[0] || null)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="clearance-upload"
                    />
                    <label
                      htmlFor="clearance-upload"
                      className="inline-block mt-2 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 cursor-pointer transition-colors"
                    >
                      Select File
                    </label>
                    {formData.clearanceCertificate && (
                      <div className="mt-3 flex items-center justify-center gap-2 text-yellow-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{formData.clearanceCertificate.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Support Letters (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Letters of support from constituents or party</p>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange('supportLetters', e.target.files?.[0] || null)}
                      accept=".pdf"
                      className="hidden"
                      id="support-upload"
                    />
                    <label
                      htmlFor="support-upload"
                      className="inline-block mt-2 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 cursor-pointer transition-colors"
                    >
                      Select File
                    </label>
                    {formData.supportLetters && (
                      <div className="mt-3 flex items-center justify-center gap-2 text-yellow-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{formData.supportLetters.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={currentStep === 1 ? onBack : handleBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {currentStep === 1 ? 'Cancel' : 'Previous'}
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
