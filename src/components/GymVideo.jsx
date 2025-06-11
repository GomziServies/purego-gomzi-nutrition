import React, { useState } from "react";
import ModalVideo from "react-modal-video";

const GymVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isVideoOpen, setIsVideoOpen] = useState(false);


  const openVideoModal = (url) => {
    setIsVideoOpen(true);
    setVideoUrl(url);
  };

  
  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };
  return (
    <div className="video-area video-bg">
      <div className="video-bg-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="video-btn">
              <a
                className="popup-video ripple-white"
                onClick={() => openVideoModal("Me-3OmE9YfQ")}
              >
                <i className="fas fa-play"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="video-shape one">
        <img
          src={process.env.PUBLIC_URL + "/assets/images/video_shape01.png"}
          alt="shape"
        />
      </div>
      <div className="video-shape two">
        <img
          src={process.env.PUBLIC_URL + "/assets/images/video_shape02.png"}
          alt="shape"
        />
      </div>
      <ModalVideo
                channel="youtube"
                isOpen={isVideoOpen}
                videoId={videoUrl}
                onClose={closeVideoModal}
              />
    </div>
  );
};

export default GymVideo;
