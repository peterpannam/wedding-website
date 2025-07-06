'use client';
import Image from "next/image";
import weddingBanner from "/public/wedding-banner.jpg";
import { useRef, useState } from "react";
import Venue from "./components/venue";
import RSVPForm from "./components/RSVPForm";

export default function Home() {
  const nextSectionRef = useRef(null);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  // const scrollToNextSection = () => {
  //   nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  const openRSVP = () => {
    setIsRSVPOpen(true);
    // Smooth scroll to the RSVP section
    setTimeout(() => {
      const rsvpSection = document.getElementById('rsvp-section');
      if (rsvpSection) {
        rsvpSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const closeRSVP = () => {
    setIsRSVPOpen(false);
  };

  return (
    <div>
      {/* Hidden static form for Netlify to detect during build */}
      <form name="rsvp-form" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" style={{ display: 'none' }}>
        <input type="hidden" name="form-name" value="rsvp-form" />
        <div>
          <input name="bot-field" />
        </div>
        <input type="hidden" name="name" />
        {/* Include fields for up to 10 people to cover dynamic additions */}
        <input type="text" name="firstName_1" />
        <input type="text" name="lastName_1" />
        <input type="text" name="firstName_2" />
        <input type="text" name="lastName_2" />
        <input type="text" name="firstName_3" />
        <input type="text" name="lastName_3" />
        <input type="text" name="firstName_4" />
        <input type="text" name="lastName_4" />
        <input type="text" name="firstName_5" />
        <input type="text" name="lastName_5" />
        <input type="text" name="firstName_6" />
        <input type="text" name="lastName_6" />
        <input type="text" name="firstName_7" />
        <input type="text" name="lastName_7" />
        <input type="text" name="firstName_8" />
        <input type="text" name="lastName_8" />
        <input type="text" name="firstName_9" />
        <input type="text" name="lastName_9" />
        <input type="text" name="firstName_10" />
        <input type="text" name="lastName_10" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="radio" name="attending" value="true" />
        <input type="radio" name="attending" value="false" />
        <textarea name="dietaryRequirements"></textarea>
        <textarea name="songRequest"></textarea>
        <button type="submit">Submit</button>
      </form>

      <div className="relative w-full h-screen">
        <Image
          src={weddingBanner}
          alt="Wedding Banner"
          fill
          className="object-cover object-top"
        />
        <div className="banner-overlay">
          <div className="flex flex-col items-center justify-center my-[20%] mb-[20%] text-center">
            <h1 className="font-great-vibes text-white text-6xl mx-2 sm:mx-0">Join us on our special day</h1>
            <p className="font-great-vibes text-white text-3xl">Port Douglas, Queensland</p>
            <p className="font-great-vibes text-white text-3xl">20 June 2026</p>

            <button
              onClick={openRSVP}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openRSVP();
                }
              }}
              className="mt-8 px-10 py-4 bg-white text-gray-800 font-montserrat font-semibold rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 shadow-lg text-lg cursor-pointer"
              aria-label="RSVP to the wedding"
              role="button"
              tabIndex={0}
            >
              RSVP
            </button>

          </div>
        </div>
      </div>
      
      {/* RSVP Section */}
      <div id="rsvp-section">
        <RSVPForm isOpen={isRSVPOpen} onClose={closeRSVP} />
      </div>
      
      <div ref={nextSectionRef} className="w-full bg-gray-100 flex justify-center ">
        <Venue />
        
      </div>
    </div>
  );
}
