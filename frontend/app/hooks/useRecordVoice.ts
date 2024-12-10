"use client";

import { useEffect, useState, useRef } from "react";
import { blobToBase64 } from "@/lib/utils"; // Ensure this function exists
import { createMediaStream } from "@/lib/utils"; // Ensure this function exists

export const useRecordVoice = () => {
  const [text, setText] = useState<string>("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recording, setRecording] = useState<boolean>(false);
  const isRecording = useRef<boolean>(false);
  const chunks = useRef<Blob[]>([]);

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      isRecording.current = true;
      mediaRecorder.start();
      setRecording(true);
    } else {
      console.warn("MediaRecorder is not initialized or already recording.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      isRecording.current = false;
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const getText = async (base64data: string) => {
    try {
      const response = await fetch("/api/speechToText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio: base64data,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const { text } = data;
      setText(text);
    } catch (error) {
      console.error("Error fetching speech to text:", error);
    }
  };

  const initialMediaRecorder = (stream: MediaStream) => {
    const recorder = new MediaRecorder(stream);

    recorder.onstart = () => {
      createMediaStream(stream); // Assuming this function does what it's supposed to
      chunks.current = []; // Clear previous chunks on new recording
    };

    recorder.ondataavailable = (ev: BlobEvent) => {
      chunks.current.push(ev.data); // Push new data chunk into chunks
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      blobToBase64(audioBlob, getText); // Convert the Blob to base64 and handle the text retrieval
    };

    setMediaRecorder(recorder);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder)
        .catch((error) => {
          console.error("Error accessing the microphone:", error);
        });
    }
  }, []);

  return { recording, startRecording, stopRecording, text };
};
