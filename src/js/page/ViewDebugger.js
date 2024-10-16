import React from 'react'
import "../comp/css/viewdebugger.css"
import backgroundVideo from "../../asset/video/bg.mp4";
import { baseUrl } from '../..';

export default function ViewDebugger() {

  // Functions
  async function uploadFile(file) {
    const url = baseUrl + "/upload"; // Replace with your endpoint

  //   // Create a ReadableStream from the file
  //   const stream = new ReadableStream({
  //     start(controller) {
  //       const reader = file.stream().getReader();

  //       // Read the file and enqueue chunks into the stream
  //       function push() {
  //         reader.read().then(({ done, value }) => {
  //           if (done) {
  //             controller.close();
  //             return;
  //           }
  //           controller.enqueue(value);
  //           push();
  //         });
  //       }

  //       push();
  //     },
  //   });

    // Create a FormData object and append the stream
    const formData = new FormData();
    formData.append('file', file, file.name); // Attach the stream with the file name

    // Make the POST request
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    console.log("File uploaded successfully");
  }


  // JSX
  return (
    <div className='vd-div-main'>
          <div className="ap-div-icons"
            style={{
              width: true ? "100%" : "revert",
              background: true
                ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))`
                : ""
            }}>
          <video className="background-video" autoPlay loop controls muted>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
    </div>
  )
}
