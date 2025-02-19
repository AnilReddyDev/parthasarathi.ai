import React, { useEffect, useState } from "react";
import UserDetails from "../Componets/UserDetails";
import WebcamVideo from "../Componets/WebcamVideo";
import Questions from "../questions/qnlist.json";
export default function Home() {
  const [userDetails, setUserDetails] = useState({});
  const [isUser, setIsUser] = useState(false);
  const [userReady, setUserReady] = useState(false);
  const [randomQn, setRandomQn] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const randomQnFn = () => {
    const randomIndex = Math.floor(Math.random() * Questions.topics.length);
    setRandomQn(Questions.topics[randomIndex].question);
  };
  const userfn = () => {
    setIsUser(true);
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userDetails"));
    if (userInfo) {
      setUserDetails(userInfo);
      setIsUser(true);
    }
  }, [isUser]);

  return (
    <>
      {isUser ? (
        <div className="w-screen min-h-screen oswald p-5 bg-darkIndigo bg-gradient-to-l from-indigo-600 to-indigo-800">
          <h1 className="text-lightCream oswald text-2xl font-bold font-sans">
            Hello ,{" "}
            <span className="text-royalGold font-semibold">
              {userDetails.name}.
            </span>
          </h1>
          <h1 className="text-lightCream oswald text-xl font-bold font-sans">
            Welcome to{" "}
            <span className="text-royalGold font-semibold">
              Parthasarathi AI
            </span>
          </h1>
          <h2 className="oswald text-lightCream">
            With <span className="text-royalGold">ParthasarathiAI</span> :
            Speak, Analyze, and Build Your Speaking Confidence.
          </h2>
          <p className="text-lightCream font-medium">
            Grant camera & mic access to begin your speaking journey!
          </p>
          <button
            type="button"
            onClick={() => {setUserReady(true);randomQnFn()}}
            className="text-lightCream  bg-saffron hover:bg-saffron/90  px-3 py-0.5 rounded-md my-5 poppins text-base font-semibold "
          >
            {userReady ? "interview started" : "Start interview"}
          </button>
          {userReady && (
            <>
            <h1 className="text-lightCream oswald text-xl font-bold font-sans">Question : {randomQn}</h1>
            <WebcamVideo start={userReady} question={randomQn} />
            </>
          )}
        </div>
      ) : (
        <UserDetails usersubmit={userfn} />
      )}
    </>
  );
}
