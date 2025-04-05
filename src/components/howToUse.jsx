import React from "react";
import ReactPlayer from "react-player";

const HowToUse = ({ src1, src2, src3, src4, step1, step2 }) => {
  return (
    <>
      <section className="formula-area formula-bg">
        <div className="container">
          <div className="section-title text-center white-title mb-50">
            <p className="sub-title">.. Purego Wellness ..</p>
            <h2 className="title">How To Use</h2>
          </div>
          <div className="row">
            <div className="col-6 col-md-3 mb-3">
              <div className="d-block">
                <ReactPlayer
                  url={process.env.PUBLIC_URL + `/assets/images/${src1}`}
                  width="100%"
                  height="auto"
                  className="how-to-make-stap-video"
                  playing
                  loop
                  muted
                  playsinline
                />
                <p className="f-pop-reg f-18 my-1 text-white">
                  <b>Step 1: {step1}</b>
                </p>
                <p className="f-pop-reg f-16 my-1 text-white"></p>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="d-block">
                <ReactPlayer
                  url={process.env.PUBLIC_URL + `/assets/images/${src2}`}
                  width="100%"
                  height="auto"
                  className="how-to-make-stap-video"
                  playing
                  loop
                  muted
                  playsinline
                />
                <p className="f-pop-reg f-18 my-1 text-white">
                  <b>Step 2: {step2}</b>
                </p>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="d-block">
                <ReactPlayer
                  url={process.env.PUBLIC_URL + `/assets/images/${src3}`}
                  width="100%"
                  height="auto"
                  className="how-to-make-stap-video"
                  playing
                  loop
                  muted
                  playsinline
                />
                <p className="f-pop-reg f-18 my-1 text-white">
                  <b>Step 3: Shake Well</b>
                </p>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="d-block">
                <ReactPlayer
                  url={process.env.PUBLIC_URL + `/assets/images/${src4}`}
                  width="100%"
                  height="auto"
                  className="how-to-make-stap-video"
                  playing
                  loop
                  muted
                  playsinline
                />
                <p className="f-pop-reg f-18 my-1 text-white">
                  <b>Step 4: Enjoy the unique taste</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowToUse;
