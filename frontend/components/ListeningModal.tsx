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
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center">
            <svg
              className="h-10 w-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z" />
            </svg>
          </div>
          <p className="mt-3 text-gray-700">Listening...</p>
        </div>
      </div>
    </div>
  );
};
