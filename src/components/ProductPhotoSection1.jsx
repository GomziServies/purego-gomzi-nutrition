import React, { useState, useEffect, useRef } from "react";
import { InnerImageZoom } from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ProductPhotoSection1({
    images,
    activeImageIndex,
    setActiveImageIndex,
}) {
    const [opacity, setOpacity] = useState(1);
    const [prevIndex, setPrevIndex] = useState(activeImageIndex);
    const imageRef = useRef(null);

    useEffect(() => {
        if (imageRef.current) {
            setOpacity(0.5);
            const fadeOutTimer = setTimeout(() => {
                setPrevIndex(activeImageIndex);
                setOpacity(1);
            }, 300);

            return () => clearTimeout(fadeOutTimer);
        }
    }, [activeImageIndex]);

    if (!images || images.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="col-12 p-0 product-hori-slider-main">
            <div className="product-imgs one-book singal-product-img d-none d-lg-block">
                <div className="row">
                    <div className="col-12">
                        <div className="main-image text-center">
                            <div
                                style={{
                                    transition: "opacity 0.5s ease-in-out",
                                    opacity: opacity,
                                }}
                                ref={imageRef}
                            >
                                <InnerImageZoom
                                    src={images[prevIndex]}
                                    zoomSrc={images[prevIndex]}
                                    zoomType="hover"
                                    zoomPreload={true}
                                    alt="FG Group"
                                    width="95%"
                                    effect="blur"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="thumbnail-images">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail-image ${index === activeImageIndex ? "active" : ""
                                        }`}
                                    onClick={() => setActiveImageIndex(index)}
                                >
                                    <div className="d-flex">
                                        <div className="col-12 px-4 mt-4 text-center">
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <LazyLoadImage
                                                    src={image}
                                                    alt="FG Group"
                                                    effect="blur"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-imgs one-book singal-product-img mb-4 d-block d-lg-none">
                <div className="row">
                    <div className="col-12">
                        <div className="main-image text-center">
                            <div
                                style={{
                                    transition: "opacity 0.5s ease-in-out",
                                    opacity: opacity,
                                }}
                                ref={imageRef}
                            >
                                <img src={images[prevIndex]} alt="FG Group" width="100%" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="thumbnail-images">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail-image ${index === activeImageIndex ? "active" : ""
                                        }`}
                                    onClick={() => setActiveImageIndex(index)}
                                >
                                    <div className="d-flex">
                                        <div className="col-12 px-2 mt-4 text-center">
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <LazyLoadImage
                                                    src={image}
                                                    alt="FG Group"
                                                    effect="blur"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPhotoSection1;
