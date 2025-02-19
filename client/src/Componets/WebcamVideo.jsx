import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function WebcamVideo({ start, question }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [stream, setStream] = useState(null);
  const [response, setResponse] = useState({});
  const [seconds, setSeconds] = useState(8);

  useEffect(() => {
    if (start && (seconds > 0)) {
      const intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  useEffect(() => {
    if (start && stream) {
      handleStartCaptureClick();
      setTimeout(() => {
        handleStopCaptureClick();
      }, 5000); // Stop recording after 2 minutes (120,000 ms)
    }
  }, [start, stream]);

  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  }, []);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setRecordedChunks([]); // Clear previous recordings
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorderRef.current.start();
  }, [handleDataAvailable, stream]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, []);

  useEffect(() => {
    if (recordedChunks.length > 0) {
      handleUpload();
    }
  }, [recordedChunks]);

  const handleUpload = async () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const formData = new FormData();
    formData.append("video", blob, "recorded-video.webm");
    formData.append("question", question); // Append question text

    try {
      console.log(`form data : ${formData}`);
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Video uploaded successfully:", response.data);
      setResponse(response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleUserMedia = useCallback((stream) => {
    setStream(stream);
  }, []);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };
  // useEffect(() => {
    
  // },[response]);
  return (
    <div className="Container">
     {response && response.message ? (<h1>{response.message}</h1>) : (<><Webcam
        height={400}
        width={400}
        audio={true}
        mirrored={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        onUserMedia={handleUserMedia}  // Set the stream here
      />
      <p>{capturing && <span>{seconds} recording..</span>} </p> </>)}
    
    </div>
  );
}
