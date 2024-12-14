import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useRecordVoice } from "../../frontend/app/hooks/useRecordVoice"; // Ensure correct path

export const ListeningModal: React.FC<{
  isListening: boolean;
  onClose: (recognizedText: string) => void; // Update the onClose prop to pass back text
}> = ({ isListening, onClose }) => {
  const { recording, startRecording, stopRecording, text } = useRecordVoice();

  useEffect(() => {
    if (isListening) {
      startRecording(); // Start recording when the modal is opened
    } else {
      stopRecording(); // Stop recording when the modal is closed
      onClose(text); // Pass the recognized text to the parent on close
    }
  }, [isListening, startRecording, stopRecording, onClose, text]);

  if (!isListening) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full h-full bg-white p-5 flex flex-col items-center">
        <div className="absolute top-0 right-0 p-4">
          <button onClick={() => onClose(text)} className="focus:outline-none">
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <div className="flex w-full max-w-5xl mb-24 justify-around items-center flex-grow">
          <p className="mt-3 text-gray-700 text-3xl ">Listening...</p>
          <div className="h-52 w-52 rounded-full bg-red-500 flex items-center justify-center">
            <svg
              className="h-28 text-white cursor-pointer"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="white"
                d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
              />
              <path fill="white" d="m11 18.08h2v3.92h-2z" />
              <path
                fill="white"
                d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
              />
              <path
                fill="white"
                d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
