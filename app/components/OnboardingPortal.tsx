import React, { useState } from 'react';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface OnboardingPortalProps {
  username: string;
  onLogout: () => void;
}

export default function OnboardingPortal({ username, onLogout }: OnboardingPortalProps) {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    publicKey: '',
  });
  const [userClaims, setUserClaims] = useState({
    name: '',
    email: '',
    gender: '',
    phone_number: '',
    picture: null as File | null,
    birthdate: '',
  });

  const onboardingSteps = [
    {
      title: 'Welcome',
      description: "Welcome to our platform! Let's get you set up.",
      action: 'Start Onboarding',
    },
    {
      title: 'Request Form',
      description: "Fill out the details required for your request.",
      action: 'Next',
    },
    {
      title: 'User Claims',
      description: 'Enter the details for the required user claims.',
      action: 'Next',
    },
    {
      title: 'Finish',
      description: "You're all set! Enjoy using our platform.",
      action: 'Finish',
    },
  ];

  const handleNextStep = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      /* sendDataToPostman(); */
      alert('Onboarding complete!');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClaimsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setUserClaims((prevClaims) => ({ ...prevClaims, [name]: files?.[0] || null }));
    } else {
      setUserClaims((prevClaims) => ({ ...prevClaims, [name]: value }));
    }
  };

/*   const sendDataToPostman = async () => {
    const formDataToSend = new FormData();

    
    formDataToSend.append('clientId', formData.clientId);
    formDataToSend.append('clientName', formData.clientName);
    formDataToSend.append('publicKey', formData.publicKey);

    
    formDataToSend.append('name', userClaims.name);
    formDataToSend.append('email', userClaims.email);
    formDataToSend.append('gender', userClaims.gender);
    formDataToSend.append('phone_number', userClaims.phone_number);
    formDataToSend.append('birthdate', userClaims.birthdate);

    
    if (userClaims.picture instanceof File) {
      formDataToSend.append('picture', userClaims.picture);
    }

    try {
      const response = await fetch('http://localhost:8088/v1/idp/client-mgmt/oidc-client', {  // Replace with your actual API endpoint
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Data sent successfully:', result);
      alert('Data sent to Postman successfully!');
    } catch (error) {
      console.error('Failed to send data:', error);
      alert('Failed to send data to Postman.');
    }
  }; */

  return (
    <Card className="w-[400px] mx-auto my-10 bg-gray-300 ">
      <CardHeader>
        <CardTitle className="text-2xl mb-2 bg-teal-800 text-white p-2 rounded-md">Onboarding Portal</CardTitle>
      </CardHeader>
      <CardContent >
        {onboardingStep === 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Welcome, {username}!</h2>
            <p>{onboardingSteps[0].description}</p>
          </div>
        )}

        {onboardingStep === 1 && (
          <div>
            <h3 className="text-lg font-medium mb-4">{onboardingSteps[1].title}</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Client ID</label>
                <input
                  type="text"
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Public Key</label>
                <input
                  type="text"
                  name="publicKey"
                  value={formData.publicKey}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </form>
          </div>
        )}

        {onboardingStep === 2 && (
          <div>
            <h3 className="text-lg font-medium mb-4">{onboardingSteps[2].title}</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userClaims.name}
                  onChange={handleClaimsChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userClaims.email}
                  onChange={handleClaimsChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={userClaims.gender}
                  onChange={(e) => setUserClaims(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <PhoneInput
                  country={'us'}
                  value={userClaims.phone_number}
                  onChange={phone => setUserClaims(prev => ({ ...prev, phone_number: phone }))}
                  containerClass="w-full"
                  inputClass="w-full p-2 border rounded"
                  buttonClass="border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Picture</label>
                <input
                  type="file"
                  name="picture"
                  accept="image/*"
                  onChange={handleClaimsChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={userClaims.birthdate}
                  onChange={handleClaimsChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </form>
          </div>
        )}

        {onboardingStep === 3 && (
          <div>
            <h3 className="text-lg font-medium mb-4">{onboardingSteps[3].title}</h3>
            <p>You're all set! Here’s a summary of your data:</p>
            <ul className="mt-4 space-y-2">
              <li>
                <strong>Client ID:</strong> {formData.clientId}
              </li>
              <li>
                <strong>Client Name:</strong> {formData.clientName}
              </li>
              <li>
                <strong>Public Key:</strong> {formData.publicKey}
              </li>
              <li>
                <strong>User Claims:</strong>
                <ul className="mt-2 space-y-1 pl-4 list-disc">
                  {Object.entries(userClaims).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key.replace('_', ' ')}:</strong>{' '}
                      {key === 'picture'
                        ? value instanceof File
                          ? value.name.toString()
                          : 'Not provided'
                        : String(value || 'Not provided')}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onLogout} variant="outline">
          Logout
        </Button>
        <Button onClick={handleNextStep} className="bg-yellow-500 hover:bg-yellow-400">
          {onboardingStep < onboardingSteps.length - 1
            ? onboardingSteps[onboardingStep].action
            : 'Complete'}
        </Button>
      </CardFooter>
    </Card>
  );
}
