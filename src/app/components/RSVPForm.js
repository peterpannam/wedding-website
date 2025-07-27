'use client'; 

import { useState } from "react";

export default function RSVPForm({ isOpen, onClose }) {
  const [rsvp, setRsvp] = useState({
    people: [{ firstName: "", lastName: "" }],
    email: "",
    phone: "",
    attending: null,
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
      const formData = new FormData(e.target);
      
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form to initial state with one person
        setRsvp({
          people: [{ firstName: "", lastName: "" }],
          email: "",
          phone: "",
          attending: null,
          dietaryRequirements: "",
          songRequest: ""
        });
        // Close form after successful submission
        // setTimeout(() => {
        //   onClose();
        //   setSubmitStatus(null);
        // }, 2000);
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

  if (!isOpen) return null;

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-great-vibes text-gray-800">RSVP</h2>
        </div>
        
        {submitStatus === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
            Thank you for your RSVP! We look forward to celebrating with you.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            There was an error submitting your RSVP. Please try again or contact us directly.
          </div>
        )}

        <form onSubmit={handleSubmit} name="rsvp-form" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" className="bg-gray-50 p-8 rounded-lg shadow-lg">
          <input type="hidden" name="form-name" value="rsvp-form" />
          {/* Honeypot field to prevent spam */}
          <div className="hidden">
            <input name="bot-field" />
          </div>
          {/* Hidden field for Netlify submission title */}
          <input type="hidden" name="name" value={`${rsvp.people[0].firstName} ${rsvp.people[0].lastName}`.trim()} />
          
          {/* People Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Guest Information</h2>
            
            {rsvp.people.map((person, index) => (
              <div key={index} className="mb-6 p-6 border border-gray-200 rounded-lg bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    {index === 0 ? 'Your Name' : `Party Member Name`}
                  </h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removePerson(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                      disabled={isSubmitting}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`firstName_${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id={`firstName_${index}`}
                      name={`firstName_${index + 1}`}
                      placeholder="First name"
                      value={person.firstName}
                      onChange={(e) => handlePersonChange(index, 'firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`lastName_${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id={`lastName_${index}`}
                      name={`lastName_${index + 1}`}
                      placeholder="Last name"
                      value={person.lastName}
                      onChange={(e) => handlePersonChange(index, 'lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300 font-medium"
            >
              + Add Another Party Member
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Will you be attending the wedding? *</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attending"
                  value="true"
                  checked={rsvp.attending === true}
                  onChange={(e) => setRsvp({...rsvp, attending: e.target.value === 'true'})}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                  disabled={isSubmitting}
                  required
                />
                <span className="ml-3 text-lg text-gray-700">
                  Yes, I can attend
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attending"
                  value="false"
                  checked={rsvp.attending === false}
                  onChange={(e) => setRsvp({...rsvp, attending: e.target.value === 'true'})}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                  disabled={isSubmitting}
                  required
                />
                <span className="ml-3 text-lg text-gray-700">
                  No, I cannot attend
                </span>
              </label>
            </div>
          </div>

          <div className={`mb-8 space-y-6 ${rsvp.attending !== true ? 'hidden' : ''}`}>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
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
                placeholder="Let us know what gets you in the mood to groove?"
                value={rsvp.songRequest}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </form>
      </div>
    </div>
  );
} 