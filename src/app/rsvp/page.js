'use client'; 

import { useState } from "react";

export default function Home() {
  const [rsvp, setRsvp] = useState({
    people: [{ firstName: "", lastName: "" }],
    email: "",
    phone: "",
    attending: false,
    dietaryRequirements: "",
    songRequest: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRsvp({
      ...rsvp,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePersonChange = (index, field, value) => {
    const updatedPeople = [...rsvp.people];
    updatedPeople[index] = {
      ...updatedPeople[index],
      [field]: value
    };
    setRsvp({
      ...rsvp,
      people: updatedPeople
    });
  };

  const addPerson = () => {
    setRsvp({
      ...rsvp,
      people: [...rsvp.people, { firstName: "", lastName: "" }]
    });
  };

  const removePerson = (index) => {
    if (rsvp.people.length > 1) {
      const updatedPeople = rsvp.people.filter((_, i) => i !== index);
      setRsvp({
        ...rsvp,
        people: updatedPeople
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Format people data for submission
      const peopleData = rsvp.people.map((person, index) => ({
        [`firstName_${index + 1}`]: person.firstName,
        [`lastName_${index + 1}`]: person.lastName
      })).reduce((acc, person) => ({ ...acc, ...person }), {});

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'rsvp-form',
          email: rsvp.email,
          phone: rsvp.phone,
          attending: rsvp.attending ? 'Yes' : 'No',
          dietaryRequirements: rsvp.dietaryRequirements,
          songRequest: rsvp.songRequest,
          ...peopleData
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setRsvp({
          people: [{ firstName: "", lastName: "" }],
          email: "",
          phone: "",
          attending: false,
          dietaryRequirements: "",
          songRequest: ""
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-great-vibes text-center mb-6">RSVP</h1>
        
        {submitStatus === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Thank you for your RSVP! We look forward to celebrating with you.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            There was an error submitting your RSVP. Please try again or contact us directly.
          </div>
        )}

        <form onSubmit={handleSubmit} name="rsvp-form" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="rsvp-form" />
          
          {/* People Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Guest Information</h2>
            
            {rsvp.people.map((person, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    {index === 0 ? 'Primary Guest' : `Guest ${index + 1}`}
                  </h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removePerson(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                      disabled={isSubmitting}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`firstName_${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id={`firstName_${index}`}
                      name={`firstName_${index}`}
                      placeholder="First name"
                      value={person.firstName}
                      onChange={(e) => handlePersonChange(index, 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`lastName_${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id={`lastName_${index}`}
                      name={`lastName_${index}`}
                      placeholder="Last name"
                      value={person.lastName}
                      onChange={(e) => handlePersonChange(index, 'lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addPerson}
              disabled={isSubmitting}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300"
            >
              + Add Another Guest
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={rsvp.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={rsvp.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="attending"
                checked={rsvp.attending}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isSubmitting}
              />
              <span className="ml-2 text-sm text-gray-700">
                I can attend the wedding
              </span>
            </label>
          </div>

          {rsvp.attending && (
            <div className="mb-6 space-y-4">
              <div>
                <label htmlFor="dietaryRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Requirements
                </label>
                <textarea
                  id="dietaryRequirements"
                  name="dietaryRequirements"
                  placeholder="Please let us know of any dietary requirements or allergies"
                  value={rsvp.dietaryRequirements}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="songRequest" className="block text-sm font-medium text-gray-700 mb-2">
                  Song Request (Spotify)
                </label>
                <textarea
                  id="songRequest"
                  name="songRequest"
                  placeholder="What song would you like to dance to on the night?"
                  value={rsvp.songRequest}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </form>
      </div>
    </div>
  );
}
