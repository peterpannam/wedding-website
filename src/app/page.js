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
