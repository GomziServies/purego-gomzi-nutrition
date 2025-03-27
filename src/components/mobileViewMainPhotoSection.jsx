import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Oval } from "react-loader-spinner";
import ProductCard from "../../productCard";

const gomzinutrition = [
  {
    protein: [
      {
        id: 1,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/whey-protein-concentrate-1-1kg.webp",
        productLink: "/nutrition/gomzi-nutrition-whey-protein-concentrate",
        productName: "Whey Protein Concentrate",
        rating: "4.4",
        originalPrice: "₹3,500 /-",
        discountedPrice: "₹3,500 /-",
        type: "protein",
      },
      {
        id: 2,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/whey-protein-isolate-1-1kg.webp",
        productLink: "/nutrition/gomzi-nutrition-whey-protein-isolate",
        productName: "Whey Protein Isolate",
        rating: "4.7",
        originalPrice: "₹4,500 /-",
        discountedPrice: "₹4,500 /-",
        type: "protein",
      },
      {
        id: 3,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/whey-protein-chocolate-1-1kg.webp",
        productLink: "/nutrition/gomzi-nutrition-whey-protein-chocolate",
        productName: "Gomzi Whey Protein",
        rating: "4.8",
        originalPrice: "₹3,000 /-",
        discountedPrice: "₹3,000 /-",
        type: "protein",
      },
      {
        id: 4,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/gomzi-nutrition-mass-gainer-powder-1-1kg.webp",
        productLink: "/nutrition/gomzi-nutrition-mass-gainer-powder",
        productName: "Mass Gainer Powder",
        rating: "4.7",
        originalPrice: "₹1,500 /-",
        discountedPrice: "₹1,500 /-",
        type: "protein",
      },
      {
        id: 5,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/refuel-concentrate-mawa-kulfi-1-1kg.webp",
        productLink:
          "/nutrition/gomzi-nutrition-refuel-whey-protein-concentrate",
        productName: "Refuel 2.0 Whey Protein Concentrate",
        rating: "4.4",
        originalPrice: "₹4,500 /-",
        discountedPrice: "₹4,500 /-",
        type: "protein",
      },
      {
        id: 6,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/refuel-isolate-chocobrownie-1-1kg.webp",
        productLink: "/nutrition/gomzi-nutrition-refuel-whey-protein-isolate",
        productName: "Refuel 2.0 Whey Protein Isolate",
        rating: "4.7",
        originalPrice: "₹5,999 /-",
        discountedPrice: "₹5,999 /-",
        type: "protein",
      },
      {
        id: 7,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/refuel-protein-chocolate-1-1kg.webp",
        productLink: "/nutrition/gomzi-nutrition-refuel-whey-protein",
        productName: "Refuel 2.0 Whey Protein 100%",
        rating: "4.8",
        originalPrice: "₹3,500 /-",
        discountedPrice: "₹3,500 /-",
        type: "protein",
      },
      {
        id: 8,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/refuel-muscle-matrix-1-1kg.webp",
        productLink: "/nutrition/gomzi-nutrition-refuel-mass-gainer-powder",
        productName: "Refuel 2.0 Mass Gainer Powder",
        rating: "4.6",
        originalPrice: "₹2,500 /-",
        discountedPrice: "₹2,500 /-",
        type: "protein",
      },
    ],
    power: [
      {
        id: 1,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/ignite-fat-burner-1.webp",
        productLink: "/nutrition/gomzi-nutrition-ignite-fat-burner",
        productName: "Ignite Fat Burner Fruit Punch - 250g",
        rating: "4.4",
        originalPrice: "₹2,499 /-",
        discountedPrice: "₹2,499 /-",
        type: "power",
        flavor: "Fruit Punch",
      },
      {
        id: 2,
        imageSrc:
          process.env.PUBLIC_URL + "/assets/images/nutrition/spark-eaa-1.webp",
        productLink: "/nutrition/gomzi-nutrition-spark-eaa",
        productName: "Spark EAA Watermelon - 250g",
        rating: "4.3",
        originalPrice: "₹2,099 /-",
        discountedPrice: "₹2,099 /-",
        type: "power",
        flavor: "Watermelon",
      },
      {
        id: 3,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/atp-creatine-1.webp",
        productLink: "/nutrition/gomzi-nutrition-atp-creatine",
        productName: "ATP Creatine Lemon - 250g",
        rating: "4.5",
        originalPrice: "₹1,499 /-",
        discountedPrice: "₹1,499 /-",
        type: "power",
        flavor: "Lemon",
      },
      {
        id: 4,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/refuel-ignite-green-apple-1.webp",
        productLink: "/nutrition/gomzi-nutrition-refuel-ignite-fat-burner",
        productName: "Refuel 2.0 Ignite Fat Burner Green Apple - 250g",
        rating: "4.4",
        originalPrice: "₹2,500 /-",
        discountedPrice: "₹2,500 /-",
        type: "power",
        flavor: "Green Apple",
      },
      {
        id: 5,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/refuel-eaa-guava-1.webp",
        productLink: "/nutrition/gomzi-nutrition-refuel-spark-eaa",
        productName: "Refuel 2.0 Spark EAA Guava - 250g",
        rating: "4.3",
        originalPrice: "₹2,100 /-",
        discountedPrice: "₹2,100 /-",
        type: "power",
        flavor: "Guava",
      },
      {
        id: 6,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/refuel-creatine-cola-1.webp",
        productLink: "/nutrition/gomzi-nutrition-refuel-atp-creatine",
        productName: "Refuel 2.0 ATP Creatine Cola - 250g",
        rating: "4.5",
        originalPrice: "₹1,600 /-",
        discountedPrice: "₹1,600 /-",
        type: "power",
        flavor: "Cola",
      },
    ],
    butter: [
      {
        id: 1,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/gomzi-nutrition-natural-crunchy-peanut-butter-1.webp",
        productLink: "/nutrition/gomzi-nutrition-natural-crunchy-peanut-butter",
        productName: "Natural Crunchy Peanut Butter",
        rating: "4.8",
        originalPrice: "₹299 /-",
        discountedPrice: "₹299 /-",
        type: "butter",
      },
      {
        id: 2,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/gomzi-nutrition-chocolate-crunchy-peanut-butter-1.webp",
        productLink:
          "/nutrition/gomzi-nutrition-chocolate-crunchy-peanut-butter",
        productName: "Chocolate Crunchy Peanut Butter",
        rating: "4.6",
        originalPrice: "₹329 /-",
        discountedPrice: "₹329 /-",
        type: "butter",
      },
      {
        id: 3,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/gomzi-nutrition-mango-chia-seed-crunchy-peanut-butter-1.webp",
        productLink:
          "/nutrition/gomzi-nutrition-mango-chia-seed-crunchy-peanut-butter",
        productName: "Mango Chia Seed Crunchy Peanut Butter",
        rating: "4.5",
        originalPrice: "₹309 /-",
        discountedPrice: "₹309 /-",
        type: "butter",
      },
    ],
    shake: [
      {
        id: 1,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/protein-smoothie-1.webp",
        productLink: "https://www.swiggy.com/menu/970248?source=sharing",
        productName: "Mango protein Smoothie",
        rating: "4.6",
        originalPrice: "₹269 /-",
        discountedPrice: "₹99 /-",
        type: "smoothie",
      },
      {
        id: 2,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/protein-smoothie-2.webp",
        productLink: "https://www.swiggy.com/menu/970248?source=sharing",
        productName: "Mava Kulfi Protein Smoothie",
        rating: "4.9",
        originalPrice: "₹269 /-",
        discountedPrice: "₹99 /-",
        type: "smoothie",
      },
      {
        id: 3,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/protein-smoothie-3.webp",
        productLink: "https://www.swiggy.com/menu/970248?source=sharing",
        productName: "Mocha Coffee Protein Smoothie",
        rating: "4.5",
        originalPrice: "₹269 /-",
        discountedPrice: "₹99 /-",
        type: "smoothie",
      },
      {
        id: 4,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/protein-smoothie-4.webp",
        productLink: "https://www.swiggy.com/menu/970248?source=sharing",
        productName: "Chocolate Protein Smoothie",
        rating: "4.7",
        originalPrice: "₹269 /-",
        discountedPrice: "₹99 /-",
        type: "smoothie",
      },
    ],
    bar: [
      {
        id: 1,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/gomzi-nutrition-chocolate-protein-bar-1.webp",
        productLink: "/nutrition/gomzi-nutrition-chocolate-protein-bar",
        productName: "Chocolate Protein Bar",
        rating: "4.6",
        originalPrice: "₹99",
        discountedPrice: "₹99 /-",
        type: "bar",
      },
    ],
    energy: [
      {
        id: 1,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/gomzi-nutrition-performance-creatine-drink-1.webp",
        productLink: "/nutrition/gomzi-nutrition-performance-creatine-drink",
        productName: "Performance Creatine Drink",
        rating: "4.5",
        originalPrice: "₹81/-",
        discountedPrice: "₹81/-",
        type: "energy",
      },
      {
        id: 2,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/gomzi-nutrition-performance-eaa-drink-1.webp",
        productLink: "/nutrition/gomzi-nutrition-performance-eaa-drink",
        productName: "Performance EAA Drink",
        rating: "4.4",
        originalPrice: "₹81/-",
        discountedPrice: "₹81/-",
        type: "energy",
      },
      {
        id: 3,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/gomzi-nutrition-performance-pre-workout-drink-1.webp",
        productLink: "/nutrition/gomzi-nutrition-performance-pre-workout-drink",
        productName: "Performance Pre-Workout Drink",
        rating: "4.7",
        originalPrice: "₹81/-",
        discountedPrice: "₹81/-",
        type: "energy",
      },
    ],
    ayurveda: [
      {
        id: 1,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/bowelease-constipation-relief-powder-1.webp",
        productLink:
          "/nutrition/gomzi-nutrition-bowelease-constipation-relief-powder",
        productName: "bowelease Powder",
        rating: "4.1",
        originalPrice: "₹1,049 /-",
        discountedPrice: "₹799 /-",
        type: "ayurvedic",
      },
      {
        id: 2,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/sugarguard-diabetes-care-powder-1.webp",
        productLink:
          "/nutrition/gomzi-nutrition-sugarguard-diabetes-care-powder",
        productName: "Sugarguard Powder",
        rating: "4.7",
        originalPrice: "₹899 /-",
        discountedPrice: "₹599 /-",
        type: "ayurvedic",
      },
      {
        id: 3,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/ayurease-gastric-relief-powder-1.webp",
        productLink:
          "/nutrition/gomzi-nutrition-ayurease-gastric-relief-powder",
        productName: "Ayurease Gastric Powder",
        rating: "4.0",
        originalPrice: "₹1,099 /-",
        discountedPrice: "₹689 /-",
        type: "ayurvedic",
      },
      {
        id: 4,
        imageSrc:
          process.env.PUBLIC_URL + "/assets/images/nutrition/b12-veda-1.webp",
        productLink: "/nutrition/gomzi-nutrition-b12-veda",
        productName: "Vitamin B12 Powder",
        rating: "4.6",
        originalPrice: "₹1,649 /-",
        discountedPrice: "₹999 /-",
        type: "ayurvedic",
      },
      {
        id: 5,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/slimayur-fat-loss-powder-1.webp",
        productLink: "/nutrition/gomzi-nutrition-slimayur-fat-loss-powder",
        productName: "SlimAyur Fat Loss Powder",
        rating: "4.4",
        originalPrice: "₹1,349 /-",
        discountedPrice: "₹899 /-",
        type: "ayurvedic",
      },
      {
        id: 6,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/ayurstrength-powder-1.webp",
        productLink: "/nutrition/gomzi-nutrition-ayurstrength-powder",
        productName: "Ayurstrength Powder",
        rating: "4.6",
        originalPrice: "₹1,499 /-",
        discountedPrice: "₹949 /-",
        type: "ayurvedic",
      },
    ],
    clothes: [
      {
        id: 1,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/gomzi-nutrition-sports-active-t-shirt-1.webp",
        productLink: "/nutrition/gomzi-nutrition-sports-active-t-shirt",
        productName: "Gomzi Nutrition Sports T-shirt",
        rating: "4.5",
        originalPrice: "₹219 /-",
        discountedPrice: "₹219 /-",
        type: "clothes",
      },
      {
        id: 2,
        imageSrc:
          process.env.PUBLIC_URL +
          "/assets/images/nutrition/gomzi-nutrition-sports-jogger-1.webp",
        productLink: "/nutrition/gomzi-nutrition-sports-jogger",
        productName: "Gomzi Nutrition Sports Jogger",
        rating: "4.7",
        originalPrice: "₹499 /-",
        discountedPrice: "₹499 /-",
        type: "clothes",
      },
    ],
  },
];

const MobileViewMainPhotoSection = () => {
  const [proteinProducts, setProteinProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("protein");
  const [isVisible, setIsVisible] = useState(true);
  const loadMoreRef = useRef(null);
  const productsPerPage = 8;

  // useEffect(() => {
  //   loadInitialProducts();
  // }, [activeTab]);

  // const loadInitialProducts = () => {
  //   setIsVisible(false); // Start zoom-out and fade-out transition

  //   setTimeout(() => {
  //     const initialProducts = gomzinutrition[0][activeTab].slice(
  //       0,
  //       productsPerPage
  //     );
  //     setProteinProducts(initialProducts);
  //     setHasMore(true);
  //     setPage(1);
  //     setIsVisible(true); // Start zoom-in and fade-in transition
  //   }, 300); // Match this timeout with CSS transition duration
  // };

  const loadInitialProducts = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      const initialProducts = gomzinutrition[0][activeTab].slice(
        0,
        productsPerPage
      );
      setProteinProducts(initialProducts);
      setHasMore(true);
      setPage(1);
      setIsVisible(true);
    }, 300);
  }, [activeTab, productsPerPage, gomzinutrition]);

  useEffect(() => {
    loadInitialProducts();
  }, [loadInitialProducts]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         loadMoreProducts();
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );

  //   if (loadMoreRef.current) {
  //     observer.observe(loadMoreRef.current);
  //   }

  //   return () => {
  //     if (loadMoreRef.current) {
  //       observer.unobserve(loadMoreRef.current);
  //     }
  //   };
  // }, [hasMore, page]);

  const loadMoreProducts = useCallback(() => {
    const start = page * productsPerPage;
    const end = start + productsPerPage;
    const nextProducts = gomzinutrition[0][activeTab].slice(start, end);

    setProteinProducts((prevProducts) => [...prevProducts, ...nextProducts]);

    if (end >= gomzinutrition[0][activeTab].length) {
      setHasMore(false);
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, activeTab, productsPerPage, gomzinutrition]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, page, loadMoreProducts]); // Added `loadMoreProducts` as dependency

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <section className="product-tabination-mobile d-block d-md-none bg-secondaryyyy">
        <div className="container-fluid w-80">
          <div className="row">
            <div className="product-tab-sidebar-mobile col-12">
              <ul className="nav nav-tabs mt-2">
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("protein")}
                    className={`cp tab-btn ${
                      activeTab === "protein" ? "active" : ""
                    }`}
                  >
                    Whey Protein
                  </button>
                </li>
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("power")}
                    className={`cp tab-btn ${
                      activeTab === "power" ? "active" : ""
                    }`}
                  >
                    Power Drink
                  </button>
                </li>
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("butter")}
                    className={`cp tab-btn ${
                      activeTab === "butter" ? "active" : ""
                    }`}
                  >
                    Peanut Butter
                  </button>
                </li>
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("bar")}
                    className={`cp tab-btn ${
                      activeTab === "bar" ? "active" : ""
                    }`}
                  >
                    Protein Bar
                  </button>
                </li>
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("shake")}
                    className={`cp tab-btn ${
                      activeTab === "shake" ? "active" : ""
                    }`}
                  >
                    Protein Shake
                  </button>
                </li>
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("energy")}
                    className={`cp tab-btn ${
                      activeTab === "energy" ? "active" : ""
                    }`}
                  >
                    Energy Drink
                  </button>
                </li>
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("ayurveda")}
                    className={`cp tab-btn ${
                      activeTab === "ayurveda" ? "active" : ""
                    }`}
                  >
                    Ayurveda
                  </button>
                </li>
                <li className="d-inline-block mr-2 tab-header">
                  <button
                    onClick={() => handleTabClick("clothes")}
                    className={`cp tab-btn ${
                      activeTab === "clothes" ? "active" : ""
                    }`}
                  >
                    Clothes
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-12 sidebar-content">
              <div className="pt-4">
                <section>
                  <div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                      <div className="col-12">
                        <h2 className="f-rob-bol f-30 text-black text-uppercase">
                          Gomzi Nutrition
                        </h2>
                      </div>
                    </div>
                    <div
                      className={`row mt-3 product-container ${
                        isVisible ? "visible" : "hidden"
                      }`}
                    >
                      <Suspense
                        fallback={
                          <div className="main-loading-logo">
                            <Oval
                              visible={true}
                              height="60"
                              width="60"
                              color="#4fa94d"
                              ariaLabel="oval-loading"
                            />
                          </div>
                        }
                      >
                        {proteinProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            imageSrc={product.imageSrc}
                            productLink={product.productLink}
                            productName={product.productName}
                            rating={product.rating}
                            originalPrice={product.originalPrice}
                            discountedPrice={product.discountedPrice}
                          />
                        ))}
                      </Suspense>
                    </div>
                    <div ref={loadMoreRef} style={{ height: "1px" }}></div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileViewMainPhotoSection;
