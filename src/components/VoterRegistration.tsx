import { useState } from 'react';
import { ArrowLeft, UserCheck, Upload, CheckCircle2, AlertCircle, Shield, Camera } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { User } from '../App';

interface VoterRegistrationProps {
  onBack: () => void;
  user: User | null;
}

type Step = 1 | 2 | 3 | 4;

export function VoterRegistration({ onBack, user }: VoterRegistrationProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationalId: '',
    region: '',
    zone: '',
    woreda: '',
    kebele: '',
    phoneNumber: '',
    email: '',
    idDocument: null as File | null,
    photo: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: 'idDocument' | 'photo', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.gender) {
          toast.error('Please fill in all required personal information');
          return false;
        }
        return true;
      case 2:
        if (!formData.nationalId) {
          toast.error('Please enter your National ID number');
          return false;
        }
        return true;
      case 3:
        if (!formData.region || !formData.woreda || !formData.phoneNumber) {
          toast.error('Please fill in all required location and contact information');
          return false;
        }
        return true;
      case 4:
        if (!formData.idDocument || !formData.photo) {
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
      if (currentStep < 4) {
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
    if (validateStep(4)) {
      toast.success('Registration submitted successfully! Your application is being reviewed.');
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

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
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl">Voter Registration</h2>
                <p className="text-green-100">Register to participate in the 7th National Election</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mt-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step ? 'bg-white text-green-600' : 'bg-white/20 text-white'
                    }`}>
                      {currentStep > step ? <CheckCircle2 className="w-6 h-6" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`h-1 w-full mx-2 ${
                        currentStep > step ? 'bg-white' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={currentStep >= 1 ? 'text-white' : 'text-white/60'}>Personal Info</span>
              <span className={currentStep >= 2 ? 'text-white' : 'text-white/60'}>Identification</span>
              <span className={currentStep >= 3 ? 'text-white' : 'text-white/60'}>Location</span>
              <span className={currentStep >= 4 ? 'text-white' : 'text-white/60'}>Documents</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-blue-900 mb-1">Secure Registration</h3>
                <p className="text-sm text-blue-700">
                  All your information is encrypted and protected. Your data will only be used for electoral purposes.
                </p>
              </div>
            </div>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-900">Personal Information</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      value={formData.middleName}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter middle name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                    />
                    <p className="text-sm text-gray-500 mt-1">You must be 18 years or older</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Identification */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-900">Identification</h3>
                
                <div>
                  <label className="block text-gray-700 mb-2">
                    National ID Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => handleInputChange('nationalId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your National ID number"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This will be verified against the national database
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-900 mb-1">Important Notice</h4>
                    <p className="text-sm text-yellow-700">
                      Ensure your National ID number matches exactly with your official documents.
                      Any mismatch will result in registration rejection.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location & Contact */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-900">Location & Contact Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Region <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Zone
                    </label>
                    <input
                      type="text"
                      value={formData.zone}
                      onChange={(e) => handleInputChange('zone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter zone"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Woreda <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.woreda}
                      onChange={(e) => handleInputChange('woreda', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter woreda"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Kebele
                    </label>
                    <input
                      type="text"
                      value={formData.kebele}
                      onChange={(e) => handleInputChange('kebele', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter kebele"
                    />
                  </div>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+251 9XX XXX XXX"
                    />
                    <p className="text-sm text-gray-500 mt-1">For MFA verification</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Document Upload */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl text-gray-900">Document Upload</h3>
                
                <div>
                  <label className="block text-gray-700 mb-2">
                    National ID Document <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, JPG or PNG (max 5MB)</p>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange('idDocument', e.target.files?.[0] || null)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="id-upload"
                    />
                    <label
                      htmlFor="id-upload"
                      className="inline-block mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors"
                    >
                      Select File
                    </label>
                    {formData.idDocument && (
                      <div className="mt-3 flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{formData.idDocument.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Passport Photo <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Upload a recent passport-size photo</p>
                    <p className="text-sm text-gray-500">JPG or PNG (max 2MB)</p>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange('photo', e.target.files?.[0] || null)}
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="inline-block mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors"
                    >
                      Select Photo
                    </label>
                    {formData.photo && (
                      <div className="mt-3 flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{formData.photo.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-green-900 mb-2">Photo Requirements:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Recent photo (taken within last 6 months)</li>
                    <li>• Clear, front-facing view</li>
                    <li>• Plain white or light-colored background</li>
                    <li>• No headwear (unless for religious reasons)</li>
                  </ul>
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
              
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit Registration
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
