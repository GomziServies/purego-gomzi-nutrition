import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ModalVideo from "react-modal-video";
const FactoryPhotoSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };
  const carouselOptions2 = {
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
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 3,
      },
    },
  };
  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={isVideoOpen}
        videoId={videoUrl}
        onClose={closeVideoModal}
      />
      <section className="prdouct-video-main bg-white py-5">
        <div className="container-fluid mb-4 w-80">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="col p-0">
                <h2 className="f-rob-bol f-30 text-black text-uppercase">
                  Manufacturing Unit
                </h2>
              </div>
            </div>
            <div className="col-12 mt-4">
              <OwlCarousel
                id="fwg-owl"
                className="owl-theme"
                {...carouselOptions2}
              >
                <div className="item">
                  <div className="d-inline-block w-100" tabIndex="-1">
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition/nutrition-factory-1.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-factory"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="d-inline-block w-100" tabIndex="-1">
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition/nutrition-factory-2.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-factory"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="d-inline-block w-100" tabIndex="-1">
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition/nutrition-factory-3.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-factory"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="d-inline-block w-100" tabIndex="-1">
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition/nutrition-factory-4.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-factory"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="d-inline-block w-100" tabIndex="-1">
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition/nutrition-factory-5.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-factory"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="d-inline-block w-100" tabIndex="-1">
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition/nutrition-factory-6.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-factory"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="d-inline-block w-100" tabIndex="-1">
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition/nutrition-factory-7.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-factory"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="d-inline-block w-100" tabIndex="-1">
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition/nutrition-factory-8.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-factory"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="d-inline-block w-100" tabIndex="-1">
                    <div className="col-12">
                      <div className="categories-product-main text-center">
                        <div className="category-product-item">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/nutrition/nutrition-factory-9.webp"
                            }
                            className="img-fluid"
                            alt="nutrition-factory"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FactoryPhotoSection;
