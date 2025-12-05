import { useState } from 'react';
import { ArrowLeft, Eye, Upload, CheckCircle2, Building2, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { User as UserType } from '../App';

interface ObserverAccreditationProps {
  onBack: () => void;
  user: UserType | null;
}

type Step = 1 | 2;

export function ObserverAccreditation({ onBack }: ObserverAccreditationProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [observerType, setObserverType] = useState<'individual' | 'organization' | ''>('');
  const [formData, setFormData] = useState({
    // Individual fields
    fullName: '',
    nationalId: '',
    dateOfBirth: '',
    occupation: '',
    
    // Organization fields
    organizationName: '',
    organizationType: '',
    registrationNumber: '',
    yearEstablished: '',
    representative: '',
    representativeId: '',
    
    // Common fields
    phoneNumber: '',
    email: '',
    address: '',
    region: '',
    experience: '',
    motivation: '',
    
    // Documents
    idDocument: null as File | null,
    proofOfAddress: null as File | null,
    organizationLicense: null as File | null,
    representativeLetter: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof typeof formData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const validateStep = (step: Step): boolean => {
    if (!observerType) {
      toast.error('Please select observer type');
      return false;
    }

    switch (step) {
      case 1:
        if (observerType === 'individual') {
          if (!formData.fullName || !formData.nationalId || !formData.dateOfBirth || !formData.phoneNumber || !formData.email) {
            toast.error('Please fill in all required fields');
            return false;
          }
        } else {
          if (!formData.organizationName || !formData.organizationType || !formData.registrationNumber || !formData.representative || !formData.phoneNumber || !formData.email) {
            toast.error('Please fill in all required organization information');
            return false;
          }
        }
        return true;
      case 2:
        if (observerType === 'individual') {
          if (!formData.idDocument || !formData.proofOfAddress) {
            toast.error('Please upload all required documents');
            return false;
          }
        } else {
          if (!formData.organizationLicense || !formData.representativeLetter || !formData.idDocument) {
            toast.error('Please upload all required organization documents');
            return false;
          }
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 2) {
        setCurrentStep(2);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(2)) {
      toast.success('Observer accreditation submitted successfully! You will receive your credentials within 3-5 business days.');
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

  const organizationTypes = [
    'Civil Society Organization (CSO)',
    'Non-Governmental Organization (NGO)',
    'Media Organization',
    'Academic Institution',
    'International Observer Mission',
    'Religious Organization',
  ];

  const regions = [
    'Addis Ababa',
    'Afar',
    'Amhara',
    'Benishangul-Gumuz',
    'Dire Dawa',
    'Gambela',
    'Harari',
    'Oromia',
    'Sidama',
    'Somali',
    'Southern Nations, Nationalities, and Peoples',
    'Tigray'
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
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl">Observer Accreditation</h2>
                <p className="text-red-100">Register to monitor the electoral process</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mt-8 max-w-md">
              {[1, 2].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step ? 'bg-white text-red-600' : 'bg-white/20 text-white'
                    }`}>
                      {currentStep > step ? <CheckCircle2 className="w-6 h-6" /> : step}
                    </div>
                    {step < 2 && (
                      <div className={`h-1 w-full mx-2 ${
                        currentStep > step ? 'bg-white' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm max-w-md">
              <span className={currentStep >= 1 ? 'text-white' : 'text-white/60'}>Information</span>
              <span className={currentStep >= 2 ? 'text-white' : 'text-white/60'}>Documentation</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {/* Observer Type Selection */}
            {!observerType && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-900 mb-6">Select Observer Type</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => setObserverType('individual')}
                    className="border-2 border-gray-300 rounded-xl p-6 hover:border-red-500 hover:bg-red-50 transition-all text-left"
                  >
                    <User className="w-12 h-12 text-red-600 mb-4" />
                    <h4 className="text-lg text-gray-900 mb-2">Individual Observer</h4>
                    <p className="text-gray-600">
                      Register as an independent individual to observe the electoral process
                    </p>
                  </button>

                  <button
                    onClick={() => setObserverType('organization')}
                    className="border-2 border-gray-300 rounded-xl p-6 hover:border-red-500 hover:bg-red-50 transition-all text-left"
                  >
                    <Building2 className="w-12 h-12 text-red-600 mb-4" />
                    <h4 className="text-lg text-gray-900 mb-2">Organization</h4>
                    <p className="text-gray-600">
                      Register your CSO, NGO, or organization to deploy observers
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Information */}
            {observerType && currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-gray-900">
                    {observerType === 'individual' ? 'Personal Information' : 'Organization Information'}
                  </h3>
                  <button
                    onClick={() => {
                      setObserverType('');
                      setCurrentStep(1);
                    }}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Change Type
                  </button>
                </div>

                {observerType === 'individual' ? (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Full Legal Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your full legal name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">
                          National ID Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.nationalId}
                          onChange={(e) => handleInputChange('nationalId', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="National ID"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Occupation
                      </label>
                      <input
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Your current occupation"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Organization Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.organizationName}
                        onChange={(e) => handleInputChange('organizationName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter organization name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Organization Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.organizationType}
                          onChange={(e) => handleInputChange('organizationType', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="">Select type</option>
                          {organizationTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Registration Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.registrationNumber}
                          onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Official registration #"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Year Established
                      </label>
                      <input
                        type="number"
                        value={formData.yearEstablished}
                        onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="YYYY"
                        min="1900"
                        max={new Date().getFullYear()}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Authorized Representative <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.representative}
                        onChange={(e) => handleInputChange('representative', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Full name of representative"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Representative ID Number
                      </label>
                      <input
                        type="text"
                        value={formData.representativeId}
                        onChange={(e) => handleInputChange('representativeId', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="National ID of representative"
                      />
                    </div>
                  </>
                )}

                {/* Common Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Region
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select region</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={2}
                    placeholder="Physical address"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Previous Election Observation Experience
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe your previous experience in election observation (if any)"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Motivation for Observing
                  </label>
                  <textarea
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={3}
                    placeholder="Why do you want to serve as an election observer?"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Documentation */}
            {observerType && currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-900">Required Documents</h3>

                {observerType === 'individual' ? (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        National ID Document <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Upload copy of your National ID</p>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange('idDocument', e.target.files?.[0] || null)}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="id-upload"
                        />
                        <label
                          htmlFor="id-upload"
                          className="inline-block mt-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors"
                        >
                          Select File
                        </label>
                        {formData.idDocument && (
                          <div className="mt-3 flex items-center justify-center gap-2 text-red-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>{formData.idDocument.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Proof of Address <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Utility bill or residence certificate</p>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange('proofOfAddress', e.target.files?.[0] || null)}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="address-upload"
                        />
                        <label
                          htmlFor="address-upload"
                          className="inline-block mt-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors"
                        >
                          Select File
                        </label>
                        {formData.proofOfAddress && (
                          <div className="mt-3 flex items-center justify-center gap-2 text-red-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>{formData.proofOfAddress.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Organization Registration License <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Official registration certificate</p>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange('organizationLicense', e.target.files?.[0] || null)}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="license-upload"
                        />
                        <label
                          htmlFor="license-upload"
                          className="inline-block mt-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors"
                        >
                          Select File
                        </label>
                        {formData.organizationLicense && (
                          <div className="mt-3 flex items-center justify-center gap-2 text-red-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>{formData.organizationLicense.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Authorization Letter <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Letter authorizing the representative</p>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange('representativeLetter', e.target.files?.[0] || null)}
                          accept=".pdf"
                          className="hidden"
                          id="letter-upload"
                        />
                        <label
                          htmlFor="letter-upload"
                          className="inline-block mt-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors"
                        >
                          Select File
                        </label>
                        {formData.representativeLetter && (
                          <div className="mt-3 flex items-center justify-center gap-2 text-red-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>{formData.representativeLetter.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Representative ID <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">National ID of the representative</p>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange('idDocument', e.target.files?.[0] || null)}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="rep-id-upload"
                        />
                        <label
                          htmlFor="rep-id-upload"
                          className="inline-block mt-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors"
                        >
                          Select File
                        </label>
                        {formData.idDocument && (
                          <div className="mt-3 flex items-center justify-center gap-2 text-red-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>{formData.idDocument.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            {observerType && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={currentStep === 1 ? onBack : handleBack}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {currentStep === 1 ? 'Cancel' : 'Previous'}
                </button>
                
                {currentStep < 2 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
