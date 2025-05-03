import React from "react";
import { Helmet } from "react-helmet";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/animate.min.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/default.css";
import "../assets/css/jquery-ui.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/odometer.css";
import "../assets/css/slick.css";
import "../assets/css/style.css";

const products = [
  {
    id: 1,
    title: "Testosterone Enanthate",
    description:
      "A long-acting testosterone ester, popular for its stable release and ease.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/enanthate.jpg",
  },
  {
    id: 2,
    title: "Testosterone Cypionate",
    description:
      "Similar to Enanthate, with a slightly longer half-life, commonly used in the U.S. for HRT.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/cypionate.jpg",
  },
  {
    id: 3,
    title: "Testosterone Propionate",
    description:
      "A short-acting ester, ideal for those wanting quick effects or shorter cycles.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/propionate.jpg",
  },
  {
    id: 4,
    title: "Testosterone Undecanoate",
    description:
      "AUltra-long-acting ester, often used in HRT due to its infrequent injection schedule.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/undecanoate.jpg",
  },
  {
    id: 5,
    title: "Sustanon 250",
    description:
      "A blend of four testosterone esters, (Propionate, Phenylpropionate, Is caproate, and Decanoate) designed for both fast and long-acting effects.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/sustanon-250.jpg",
  },
  {
    id: 6,
    title: "Methyltestosterone",
    description:
      "The first orally active testosterone derivative, methylated to survive liver metabolism.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/methyltestosterone.jpg",
  },
  {
    id: 7,
    title: "Testosterone Undecanoate Andriole",
    description:
      "A fat-soluble form of testosterone absorbed via the lymphatic system, bypassing significant liver metabolism.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/testosterone-undecanoate-andriole.jpg",
  },
  {
    id: 8,
    title: "Methandrostenolone",
    description: "A potent anabolic steroid for rapid size and strength gains.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/methandrostenolone.jpg",
  },
  {
    id: 9,
    title: "Oxandrolone (Anavar)",
    description:
      "A mild anabolic steroid with low androgenic activity, suitable for cutting cycles and female athletes.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/oxandrolone-anavar.jpg",
  },
  {
    id: 10,
    title: "Oxymetholone (Anadrol)",
    description:
      "One of the strongest oral anabolic steroids, known for rapid muscle gain and increased strength.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/oxandrolone-anadrol.jpg",
  },
  {
    id: 11,
    title: "Stanozolol (Winstrol)",
    description:
      "A popular cutting steroid that enhances lean, Cutting cycles and performance enhancement.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/stanozolol-winstrol.jpg",
  },
  {
    id: 12,
    title: "Turina Bol (Chloro dehydromethyl testosterone)",
    description:
      "A derivative of Diana Bol with fewer androgenic side effects, suitable for lean gains.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/turinabol.jpg",
  },
  {
    id: 13,
    title: "Boldenone Undecylenate",
    description:
      "A long-acting injectable anabolic steroid derived from testosterone, known for steady muscle growth and appetite stimulation. Originally developed for veterinary use, particularly in horses.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/boldenone-undecylenate.jpg",
  },
  {
    id: 14,
    title: "Drostanolone Propionate",
    description:
      "A fast-acting injectable anabolic steroid with strong androgenic and moderate anabolic properties, commonly used during cutting phases. Initially developed as a treatment for breast cancer.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/drostanolone-propionate.jpg",
  },
  {
    id: 15,
    title: "Primo Bolan",
    description:
      "A mild anabolic steroid with low androgenic activity, commonly used for preserving lean muscle mass and enhancing strength, suitable for both offseason and on-season use.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/primo-bolan.jpg",
  },
  {
    id: 16,
    title: "Trenbolone Acetate Hexahydrobenzylcarbonate (Hexa)",
    description:
      "A potent and fast-acting anabolic steroid used to enhance muscle mass, strength, and appetite. Known for its powerful effects in building lean muscle and fat loss, commonly included in bulking cycles.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/trenbolone-acetate.jpg",
  },
  {
    id: 17,
    title: "Nandrolone Decanoate (Deca-Durabolin)",
    description:
      "A long-acting anabolic steroid commonly used during bulking cycles to promote muscle growth and increase strength. Known for its ability to increase red blood cell production and aid in recovery.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/nandrolone-decanoate.jpg",
  },
  {
    id: 18,
    title: "AMP (Adenosine Monophosphate)",
    description:
      "AMP is a naturally occurring nucleosidase that plays a role in cellular energy regulation. It is often used in bodybuilding and athletic circles for its effects on increasing endurance, improving performance, and boosting fat loss. AMP is believed to enhance the effects of certain workouts by increasing fat.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/amp.jpg",
  },
  {
    id: 19,
    title: "Mesterolone (proviron)",
    description:
      "Primarily used as an androgenic compound for muscle building, increasing androgenic activity without significantly increasing estrogenic effects.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/mesterolone.jpg",
  },
  {
    id: 20,
    title: "Clenbuterol",
    description:
      "Highly thermogenic, it increases the body's coretemperature, enhancing fat-burning processes and promoting fat loss while preserving muscle mass.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/clenbuterol.jpg",
  },
  {
    id: 21,
    title: "GHRP-2",
    description:
      "GHRPs are primarily used by intermediate to advanced athletes looking to enhance muscle growth, fat loss, and recovery. These peptides can be highly effective in achieving body composition goals, particularly for individuals already engaged in intense training regimens.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/ghrp-2.jpg",
  },
  {
    id: 22,
    title: "GHRP-6",
    description:
      "GHRPs are primarily used by intermediate to advanced athletes looking to enhance muscle growth, fat loss, and recovery. These peptides can be highly effective in achieving body composition goals, particularly for individuals already engaged in intense training regimens.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/ghrp-6.jpg",
  },
  {
    id: 23,
    title: "Ipamorelin",
    description:
      "GHRPs are primarily used by intermediate to advanced athletes looking to enhance muscle growth, fat loss, and recovery. These peptides can be highly effective in achieving body composition goals, particularly for individuals already engaged in intense training regimens.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/ipamorelin.jpg",
  },
  {
    id: 24,
    title: "Hexarelin",
    description:
      "GHRPs are primarily used by intermediate to advanced athletes looking to enhance muscle growth, fat loss, and recovery. These peptides can be highly effective in achieving body composition goals, particularly for individuals already engaged in intense training regimens.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/hexarelin.jpg",
  },
  {
    id: 25,
    title: "CJC-1295",
    description:
      "The DAC (Drug Affinity Complex) version of CJC-1295 is designed to have a longer half-life, which means it continues to stimulate the release of GH over a longer period. It leads to sustained GH release, providing gradual and continuous GH elevation.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/cjc-1295.jpg",
  },
  {
    id: 26,
    title: "Sermorelin",
    description:
      "Sermorelin is a synthetic peptide that mimics the action of natural GHRH. It stimulates the pituitary gland to produce and release more GH. Unlike CJC-1295, Sermorelin is shorter-acting and is typically used for promoting natural GH release in a manner more similar to the body's natural secretion patterns.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/sermorelin.jpg",
  },
  {
    id: 27,
    title: "IGF-1 LR3",
    description:
      "The LR3 variant of IGF-1 is a modified version with longer activity and increased potency compared to standard IGF-1. The modification enhances its ability to stimulate muscle growth and tissue repair, providing extended effects and better utilization of nutrients for muscle building. IGF-1 LR3 has a longer half-life, allowing for greater effectiveness in promoting muscle growth and recovery over time.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/igf-1-lr3.jpg",
  },
  {
    id: 28,
    title: "Des (1-3) IGF-1",
    description:
      "Des (1-3) IGF-1 is another variant of IGF-1 with a shorter structure, which makes it more potent and faster-acting. This version is often used for those seeking rapid muscle recovery and regeneration but may require careful dosing due to its higher potency.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/igf-1-des.jpg",
  },
  {
    id: 29,
    title: "BPC-157",
    description:
      "BPC-157 is a synthetic peptide derived from a naturally occurring protein in the human stomach. It plays a vital role in healing and regenerating damaged tissues, such as muscles, tendons, ligaments, and joints. BPC-157 works by promoting angiogenesis, the process of creating new blood vessels. This improves blood flow to injured areas, enhancing nutrient delivery, reducing inflammation, and accelerating the healing process. It also helps protect tissues from further damage by supporting collagen synthesis and stabilizing cellular regeneration in tissues.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/bpc-157.jpg",
  },
  {
    id: 30,
    title: "TB-500",
    description:
      "TB-500 is a peptide naturally produced by the thymus gland and plays a crucial role in tissue repair. It promotes cell regeneration, enhances cell migration, and accelerates healing in muscle tissue, tendons, and ligaments. TB-500 is known for its ability to reduce inflammation and help restore damaged tissues through increased fibroblast proliferation. Fibroblasts are cells responsible for collagen production, which is essential for repairing connective tissues. It is particularly effective in treating muscle strains, ligament injuries, and tendonitis.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/tb-500.jpg",
  },
  {
    id: 31,
    title: "HGH Fragment 176-191",
    description:
      "HGH Fragment 176-191 is a synthetic peptide derived from the C-terminal portion of the Growth Hormone (GH) molecule. This fragment is specifically designed to target fat loss without affecting other GH functions like muscle growth or bone development. It works by increasing the rate at which the body burns fat (lipolysis) and reducing fat accumulation in fat cells, especially in areas like the abdomen, hips, and thighs. HGH Fragment 176-191 does this by increasing the activity of enzymes involved in fat breakdown and preventing the formation of new fat cells.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/hgh-fragment-176-191.jpg",
  },
  {
    id: 32,
    title: "AOD-9604",
    description:
      "AOD-9604 is another synthetic fragment of GH that has been specifically developed for fat loss purposes. AOD stands for Advanced Obesity Drug and is a modified version of the GH peptide. It functions similarly to HGH Fragment 176-191 by stimulating lipolysis and inhibiting fat storage. AOD-9604 has shown potential in reducing body fat without affecting blood glucose or insulin levels, which makes it appealing for those looking to lose fat without the risk of interfering with other metabolic processes.",
    details: "1 Box, 10 Injection",
    image: "/assets/images/medicine/aod-9604.jpg",
  },
  {
    id: 33,
    title: "Ostarine (MK-2866)",
    description:
      "SARMs are often used in bodybuilding, athletic performance enhancement, and the treatment of conditions like muscle wasting and osteoporosis. They are considered an alternative to steroids because they offer the potential for muscle growth with a reduced risk of negative side effects like liver damage, cardiovascular issues, and hormonal imbalances.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/ostarine.jpg",
  },
  {
    id: 34,
    title: "Ligandrol (LGD-4033)",
    description:
      "SARMs are often used in bodybuilding, athletic performance enhancement, and the treatment of conditions like muscle wasting and osteoporosis. They are considered an alternative to steroids because they offer the potential for muscle growth with a reduced risk of negative side effects like liver damage, cardiovascular issues, and hormonal imbalances.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/ligandrol.jpg",
  },
  {
    id: 35,
    title: "RAD140 (Testolone)",
    description:
      "SARMs are often used in bodybuilding, athletic performance enhancement, and the treatment of conditions like muscle wasting and osteoporosis. They are considered an alternative to steroids because they offer the potential for muscle growth with a reduced risk of negative side effects like liver damage, cardiovascular issues, and hormonal imbalances.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/rad140.jpg",
  },
  {
    id: 36,
    title: "S23",
    description:
      "SARMs are often used in bodybuilding, athletic performance enhancement, and the treatment of conditions like muscle wasting and osteoporosis. They are considered an alternative to steroids because they offer the potential for muscle growth with a reduced risk of negative side effects like liver damage, cardiovascular issues, and hormonal imbalances.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/s23.jpg",
  },
  {
    id: 37,
    title: "Andarine (S4)",
    description:
      "These SARMs are typically used during cutting phases to enhance fat loss while preserving lean muscle mass.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/andarine.jpg",
  },
  {
    id: 38,
    title: "Cardarine (GW-501516)",
    description:
      "These SARMs are typically used during cutting phases to enhance fat loss while preserving lean muscle mass.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/cardarine.jpg",
  },
  {
    id: 39,
    title: "Stenabolic (SR9009)",
    description:
      "These SARMs are typically used during cutting phases to enhance fat loss while preserving lean muscle mass.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/stenabolic.jpg",
  },
  {
    id: 40,
    title: "MK-677 (Ibutamoren)",
    description:
      "These SARMs are used for improving joint health, bone density, and recovery after intense workouts.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/mk-677.jpg",
  },
  {
    id: 41,
    title: "YK-11",
    description:
      "These SARMs can be used for both muscle growth and fat loss, making them useful for recompositing cycles.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/yk-11.jpg",
  },
  {
    id: 42,
    title: "ACP-105",
    description:
      "These SARMs can be used for both muscle growth and fat loss, making them useful for recompositing cycles.",
    details: "1 Box, 100 Tablets",
    image: "/assets/images/medicine/acp-105.jpg",
  },
];

function AASProducts() {
  return (
    <>
      <Helmet>
        <title>Top Whey Protein Powder for Muscle Growth & Recovery</title>
        <meta
          name="description"
          content="Find the best whey protein powder to support muscle growth, boost recovery, and enhance performance. Shop top picks now!"
        />
        <meta
          property="og:url"
          content="https://purego.gomzilifesciences.in/"
        />
        <meta
          property="og:image"
          content="https://www.purego.gomzilifesciences.in/assets/images/nutrition-logo.png"
        />
      </Helmet>

      <main className="main-area">
        <section className="features-products">
          <div className="section-title text-center mb-60">
            <h1 className="title">Anabolic Compounds</h1>
          </div>
          <div className="container text-center">
            <div className="row">
              {products.map((product) => (
                <div
                  className="col-lg-4 col-sm-6 text-start mt-3"
                  key={product.id}
                >
                  <div className="item-card">
                    <div className="item-img-sec text-center">
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          src={product.image}
                          alt={product.title}
                        />
                      </div>
                    </div>
                    <div className="item-card-detail">
                      <div>
                        <div className="item-title">{product.title}</div>
                        <p className="item-description">
                          {product.description}
                        </p>
                      </div>
                      <div>
                        <div className="item-desc">
                          <div className="d-flex align-items-center mb-3">
                            <span className="variant-price">
                              {product.details}
                            </span>
                          </div>
                          <button className="product-btn item-view-btn w-100 m-0">
                            <i className="fa-solid fa-cart-shopping me-2"></i>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <section className="aas-checkout">
        <div className="container text-center">
          <form>
            <div className="row">
              <div className="form-group col-12">
                <button type="submit" class="cart-btn m-0">
                  View Cart
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AASProducts;
