'use client';
import Image from "next/image";
import weddingBanner from "/public/wedding-banner.jpg";
import { useRef } from "react";
import { FaArrowDown } from "react-icons/fa"; // Import arrow icon
import Venue from "./components/venue";

export default function Home() {
  const nextSectionRef = useRef(null);

  // const scrollToNextSection = () => {
  //   nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

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
            <h1 className="font-great-vibes text-white text-6xl">Join us on our special day</h1>
            <p className="font-great-vibes text-white text-3xl">Port Douglas, Queensland</p>
            <p className="font-great-vibes text-white text-3xl">20 June 2026</p>

            <button
              onClick={() => window.location.href = '/rsvp'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/rsvp';
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
      <div ref={nextSectionRef} className="w-full h-screen bg-gray-100 flex justify-center ">
        <Venue />
        
      </div>
    </div>
  );
}
