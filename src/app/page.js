'use client'; 
import Image from "next/image";
import weddingBanner from "/public/wedding-banner.jpg";
import { useRef } from "react";
import { FaArrowDown } from "react-icons/fa"; // Import arrow icon

export default function Home() {
  const nextSectionRef = useRef(null);

  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
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
          <h1 className="font-great-vibes text-white text-6xl">Save the Date</h1>
          <p className="font-great-vibes text-white text-3xl">Join us in Port Douglas</p>
          <p className="font-great-vibes text-white text-3xl">20 June 2026</p>

          <button
          onClick={scrollToNextSection}
          className="mt-8 w-16 h-16 flex items-center justify-center rounded-full  border-2 border-white shadow-lg hover:bg-gray-200 transition"
          >
          <FaArrowDown className="text-2xl text-white" />
          </button>
        </div>
      </div>
    </div>
    <div ref={nextSectionRef} className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <h2 className="text-4xl font-montserrat">Next Section Content</h2>
    </div>
    </div>
  );
}
