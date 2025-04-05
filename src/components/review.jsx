import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ModalVideo from "react-modal-video";
import OwlCarousel from "react-owl-carousel";

const Review = ({}) => {
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

  const carouselOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  };
  return (
    <>
      <section id="pricing" class="pricing-area gray-bg">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-6 col-lg-8">
              <div class="section-title text-center mb-55">
                <p class="sub-title">.. Customer Reviews ..</p>
                <h2 class="title">HAPPY CLIENT</h2>
              </div>
            </div>
          </div>
          <div class="pricing-wrap">
            <div class="row align-items-end justify-content-center">
              <div className="col-12 mt-4">
                <OwlCarousel
                  id="fwg-owl"
                  className="owl-theme"
                  {...carouselOptions}
                >
                  <div className="item">
                    <div className="col-12 mx-2 px-2">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <LazyLoadImage
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition-review-1.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
                            effect="blur"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="col-12 mx-2 px-2">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <LazyLoadImage
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition-review-2.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
                            effect="blur"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="col-12 mx-2 px-2">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <LazyLoadImage
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition-review-3.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
                            effect="blur"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="col-12 mx-2 px-2">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <LazyLoadImage
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition-review-4.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
                            effect="blur"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="col-12 mx-2 px-2">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <LazyLoadImage
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition-review-5.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
                            effect="blur"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="col-12 mx-2 px-2">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <LazyLoadImage
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition-review-6.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
                            effect="blur"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="col-12 mx-2 px-2">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <LazyLoadImage
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition-review-7.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-review"
                            effect="blur"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </OwlCarousel>
              </div>
            </div>
            <div className="col-12 mt-5">
              <div className="row" id="explore">
                <div className="col-lg-4 mt-lg-4 ">
                  <div className="item">
                    <div className="blog p-0" style={{ borderRadius: "10px" }}>
                      <div className="ply position-relative">
                        <LazyLoadImage
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutri-review-video-1.webp"
                          }
                          width="100%"
                          style={{ borderRadius: "10px" }}
                          alt="fggroup"
                          effect="blur"
                        />
                        <div className="video-btn play-btn">
                          <button
                            onClick={() => openVideoModal("JwFMBFESiMc")}
                            className="custom clickof video-button-bg"
                          >
                            <span className="newthing">
                              <i className="fas fa-play"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mt-lg-4 ">
                  <div className="item">
                    <div className="blog p-0" style={{ borderRadius: "10px" }}>
                      <div className="ply position-relative">
                        <LazyLoadImage
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutri-review-video-2.webp"
                          }
                          width="100%"
                          style={{ borderRadius: "10px" }}
                          alt="fggroup"
                          effect="blur"
                        />
                        <div className="video-btn play-btn">
                          <button
                            onClick={() => openVideoModal("xd_w8FefEHw")}
                            className="custom clickof video-button-bg"
                          >
                            <span className="newthing">
                              <i className="fas fa-play"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mt-lg-4 ">
                  <div className="item">
                    <div className="blog p-0" style={{ borderRadius: "10px" }}>
                      <div className="ply position-relative">
                        <LazyLoadImage
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/nutri-review-video-3.webp"
                          }
                          width="100%"
                          style={{ borderRadius: "10px" }}
                          alt="fggroup"
                          effect="blur"
                        />
                        <div className="video-btn play-btn">
                          <button
                            onClick={() => openVideoModal("EKZBQchoO4E")}
                            className="custom clickof video-button-bg"
                          >
                            <span className="newthing">
                              <i className="fas fa-play"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo
        channel="youtube"
        isOpen={isVideoOpen}
        videoId={videoUrl}
        onClose={closeVideoModal}
      />
    </>
  );
};

export default Review;
