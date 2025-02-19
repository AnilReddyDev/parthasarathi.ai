import React from "react";

export default function About() {
  return (
    <div className="w-screen h-screen poppins flex justify-center items-center bg-gradient-to-l from-indigo-600 to-indigo-800">
      <div className="flex flex-col gap-4 w-8/12   ">
        <h1 className="text-royalGold text-2xl font-bold font-sans underline">
          About
        </h1>
        <p className="text-lightCream font-medium text-base   ">
          Parthasarathi is an innovative, AI-powered platform designed to help
          you enhance your public speaking skills. Get a random topic, take 30
          seconds to organize your thoughts, and then record a 2–3 minute
          speech. Our advanced system processes your video, extracts the
          transcript, and provides you with detailed, constructive feedback to
          improve your communication, confidence, and overall presentation
        </p>
      </div>
    </div>
  );
}
