import React from "react";
import { Helmet } from "react-helmet";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/animate.min.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/default.css";
import "../../assets/css/jquery-ui.css";
import "../../assets/css/magnific-popup.css";
import "../../assets/css/odometer.css";
import "../../assets/css/slick.css";
import "../../assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import HomeNutritionFooter from "../../components/partials/Footer/footer";

function PricingPolicyCustomer() {
    const canonicalUrl = window.location.href;

    // useEffect(() => {
    //   const loadInitialProducts = () => {
    //     const proteinProducts = gomzinutrition[0].protein.slice(
    //       0,
    //       productsPerPage
    //     );
    //     setProteinProducts(proteinProducts);
    //   };

    //   loadInitialProducts();
    // }, []);

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

    // useEffect(() => {
    //     const sections = document.querySelectorAll("section[id]");

    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {
    //                 if (entry.isIntersecting) {
    //                     const id = `#${entry.target.id}`;
    //                     setActiveSection(id);
    //                 }
    //             });
    //         },
    //         {
    //             threshold: 0.6, // Adjust threshold for when to consider section in view
    //         }
    //     );

    //     sections.forEach((section) => observer.observe(section));

    //     return () => {
    //         sections.forEach((section) => observer.unobserve(section));
    //     };
    // }, []);

    // const loadMoreProducts = () => {
    //   const start = page * productsPerPage;
    //   const end = start + productsPerPage;
    //   const nextProducts = gomzinutrition.slice(start, end);

    //   setProteinProducts((prevProducts) => [...prevProducts, ...nextProducts]);

    //   if (end >= gomzinutrition.length) {
    //     setHasMore(false);
    //   } else {
    //     setPage(page + 1);
    //   }
    // };

    // useEffect(() => {
    //     const hash = window.location.hash || "#whey";
    //     setActiveSection(hash);

    //     const handleScrollToSection = (event) => {
    //         event.preventDefault();
    //         const targetId = event.currentTarget.getAttribute("href");
    //         const targetElement = document.querySelector(targetId);

    //         // Scroll to the target element
    //         targetElement.scrollIntoView({
    //             behavior: "smooth",
    //             block: "start",
    //         });

    //         // Update active section
    //         setActiveSection(targetId);
    //     };

    //     const links = document.querySelectorAll('a[href^="#"]');
    //     links.forEach((link) => {
    //         link.addEventListener("click", handleScrollToSection);
    //     });

    //     return () => {
    //         links.forEach((link) => {
    //             link.removeEventListener("click", handleScrollToSection);
    //         });
    //     };
    // }, []);

    // const gomzinutrition = [
    //   {
    //     protein: [
    //       {
    //         id: 5,
    //         imageSrc:
    //           process.env.PUBLIC_URL +
    //           "/assets/process.env.PUBLIC_URL +  " / assets / images / nutrition / refuel - concentrate - mawa - kulfi - 1 - 1kg.webp",
    //         productLink: "/nutrition/gomzi-nutrition-refuel-whey-protein-concentrate",
    //         productName: "Refuel 2.0 Whey Protein Concentrate",
    //         rating: "4.4",
    //         originalPrice: "₹4,500 /-",
    //         discountedPrice: "₹4,500 /-",
    //         type: "protein",
    //       },
    //       {
    //         id: 6,
    //         imageSrc:
    //           process.env.PUBLIC_URL +
    //           "/assets/process.env.PUBLIC_URL +  " / assets / images / nutrition / refuel - isolate - chocobrownie - 1 - 1kg.webp",
    //         productLink: "/nutrition/gomzi-nutrition-refuel-whey-protein-isolate",
    //         productName: "Refuel 2.0 Whey Protein Isolate",
    //         rating: "4.7",
    //         originalPrice: "₹5,999 /-",
    //         discountedPrice: "₹5,999 /-",
    //         type: "protein",
    //       },
    //       {
    //         id: 7,
    //         imageSrc:
    //           process.env.PUBLIC_URL +
    //           "/assets/process.env.PUBLIC_URL +  " / assets / images / nutrition / refuel - protein - chocolate - 1 - 1kg.webp",
    //         productLink: "/nutrition/gomzi-nutrition-refuel-whey-protein",
    //         productName: "Refuel 2.0 Whey Protein 100%",
    //         rating: "4.8",
    //         originalPrice: "₹3,500 /-",
    //         discountedPrice: "₹3,500 /-",
    //         type: "protein",
    //       },
    //       {
    //         id: 8,
    //         imageSrc:
    //           process.env.PUBLIC_URL +
    //           "/assets/process.env.PUBLIC_URL +  " / assets / images / nutrition / refuel - muscle - matrix - 1 - 1kg.webp",
    //         productLink: "/nutrition/gomzi-nutrition-refuel-mass-gainer-powder",
    //         productName: "Refuel 2.0 Mass Gainer Powder",
    //         rating: "4.6",
    //         originalPrice: "₹2,500 /-",
    //         discountedPrice: "₹2,500 /-",
    //         type: "protein",
    //       },
    //       {
    //         id: 1,
    //         imageSrc:
    //           process.env.PUBLIC_URL +
    //           "/assets/process.env.PUBLIC_URL +  " / assets / images / nutrition / whey - protein - concentrate - 1 - 1kg.webp",
    //         productLink: "/nutrition/gomzi-nutrition-whey-protein-concentrate",
    //         productName: "Whey Protein Concentrate",
    //         rating: "4.4",
    //         originalPrice: "₹3,500 /-",
    //         discountedPrice: "₹3,500 /-",
    //         type: "protein",
    //       },
    //       {
    //         id: 2,
    //         imageSrc:
    //           process.env.PUBLIC_URL +
    //           "/assets/process.env.PUBLIC_URL +  " / assets / images / nutrition / whey - protein - isolate - 1 - 1kg.webp",
    //         productLink: "/nutrition/gomzi-nutrition-whey-protein-isolate",
    //         productName: "Whey Protein Isolate",
    //         rating: "4.7",
    //         originalPrice: "₹4,500 /-",
    //         discountedPrice: "₹4,500 /-",
    //         type: "protein",
    //       },
    //       {
    //         id: 3,
    //         imageSrc:
    //           process.env.PUBLIC_URL +
    //           "/assets/process.env.PUBLIC_URL +  " / assets / images / nutrition / whey - protein - chocolate - 1 - 1kg.webp",
    //         productLink: "/nutrition/gomzi-nutrition-whey-protein-chocolate",
    //         productName: "Gomzi Whey Protein",
    //         rating: "4.8",
    //         originalPrice: "₹3,000 /-",
    //         discountedPrice: "₹3,000 /-",
    //         type: "protein",
    //       },
    //     ],
    //   },
    // ];

    return (
        <>
            <Helmet>
                <title>
                    Pure Go | Best Whey Protein in India | Premium Supplements
                </title>
                <meta
                    name="description"
                    content="Discover Pure Go, your go-to destination for the best whey protein and premium nutrition supplements in India. Boost your fitness journey with our high-quality products tailored for muscle growth, weight loss, and overall health."
                />
                <meta
                    name="keyword"
                    content="bowelease  Constipation Relief, constipation powder, digestive health, natural constipation relief, regular bowel movements, buy constipation powder, whey protein and, peanut butter peanut butter, peanut butters, why protein, protein in powder, whey product, wayne protein, whey protein protein, whey protein whey, whey in protein, whey whey protein, protein for protein shakes, wea protein, whey protein and protein, mass gainer mass gainer, and creatine, pre gym supplements, protein and whey powder, gainer mass gainer, pre gym supplement, whey in protein powder, protein whey supplements, protein powder whey protein, whey protein powder protein, carnitine and l carnitine, gyms bags, testosterone enhancer, on whey proteins, compressor t shirt, best of protein supplements, protein powder is best, protein powder the best, protein supplements best, protein supplement best, price peanut butter, best protein powders, gym bags for men, gym bag for man, gym bags for man, male gym bag, workout bags for men, gym bag for mens, price of peanut butter, workout bag mens, eaa amino acid, bodybuilders photos, body bodybuilding, images of bodybuilding, images bodybuilding, bottles and shakers, bottle shaking, shaker bottle, protein shaker, fat burns, shirts for gym, t shirts for the gym, gym fitness t shirt, shirts for the gym, shirt for gym, whey protein best in india, best indian whey protein, best whey protein supplements, isolate whey protein isolate, protein whey isolate, protein whey protein isolate, good whey protein, whey protein whey isolate, best protein whey protein, best protein whey, whey protein isolate protein, good whey proteins, whey isolate whey protein, whey iso protein, whey protein best, whey protein best whey, best whey proteins, supplement shop near me, women's protein supplement, men's protein powder, protein powders for women, whey pro isolate, best whey protein supplement, whey protein with isolate, whey isolate or protein, isolate protein and whey protein, whey protein the best, protein powder for females, protein isolate whey, female protein powder, nutrition supplement store near me, protein powder for female,
           protein supplement women, whey and whey isolate, whey isolate and whey protein, protein isolate or whey, protein or isolate, protein iso whey, near me supplement store, protein powder for ladies, women and protein powder, women protein supplement, protein powder ladies, supplement store close to me, women's protein supplements, isolate or whey protein, whey protein and whey isolate, protein in whey protein isolate, protein in a peanut, gym clothes for men, nutritional supplements store near me, nutritional supplement store near me, near me supplements store, whey protein or isolate, gym belts, male gym wear, gym clothes for man, gym men wear, men's gym clothes, peanuts for protein, workout clothes men, gym apparel for men, fitness men's clothing, advantages of peanut butter, man in gym clothes, fat burning, fitness wear men, gym men clothing, gym dress man, workout gear men, gym wear male, fitness clothing men, gym apparel men, mens exercise clothing, gym clothes men's, gym clothes men, gym clothing for men, workout wear for men, men's exercise clothes, men in gym wear, workout clothes for men, men's exercise clothing, near me nutritionist, fitness clothing for men, fitness clothes for men, workout clothes for man, gym clothes for mens, workout clothing for men, women and protein shakes, top whey protein india, best indian protein powder, best protein supplements in india, india's best protein powder, indian best protein supplement, best indian protein supplement, good whey protein india, protein powder best in india, 
           top whey protein in india, best protein supplement india, india top whey protein, best pre workout protein supplement, protein supplement for men, protein supplements men, best protein drink india, protein powders for men, best body supplements in india, best protein powder india, men's protein supplements, best pre gym supplement, protein powder for man, shaker, gym tshirt for men, gym wear tshirts for men, pre workout top rated, shakers, gym clothing ladies, top rated pre workout, gym clothes for ladies, shirts for gym men, gym wear ladies, protein mass gainer, protein and mass gainer, mass gaining protein, protein for mass gainer, weight gain powder, preworkout best, best pre workout supplement for bodybuilding, weight gaining powder, weight gainer and protein powder, protein powder supplements, protein powder supplement, mass gainer and protein, protein powder and supplements, gainer mass protein, weight gain protein supplements, protein gainer mass, protein and supplements, and protein supplements, protein powders and supplements, supplements and protein, proteins and supplements, price whey protein, protein whey price, whey protein with price, protein supplements on, best creatine monohydrate, protein drink supplements, weight gain protein shake powder, gym shaker, protein food supplement, best creatine monohydrate supplements, peanut butter for protein, protein shakes and supplements, whey protein on price, peanut butter is protein, protein foods peanut butter, best creatine monohydrate supplement, 
           best monohydrate creatine, whey on protein price, on protein supplements, price of on whey protein, compression tshirt, best of peanut butter, big muscles nutrition india, best mass gainer, pre workout supplement, weight increase powder, fat burner for man, fat burn for men, fat burning for men, fat burning for man, increase weight powder, mass gainer 1 kg, clothes of gym, powder weight gain, powder to increase weight, mass gainer 1kg, supplement bcaa, bcaa supplement, fat burner for men, fat burners for men, protein powder shaker bottle, clothes for gym, protein shaker bottle, protein shake bottles, shaker protein bottle, shaker bottle for gym, shaker bottle for protein, protein shake bottle mixer, protein shaker bottle mixer, protein drink shaker bottle, protein powder shake bottle, protein powder bottle shaker, protein shake shaker bottle, whey protein 1kg, bottle protein shaker, bcaa dietary supplement, gymming clothes, clothes for the gym, gym accessories, gym clothes, shoes bags, shoes with bag, shoe bags, g y m clothing, food for fat burner, sports bag, bags for shoes, shoes in bag, shoe bag, gym bag for women, muscle mass gain diet plan, gym outfit men, best protein powder for weight gain, supplements with creatine, pre workout drink, muscle gain protein, best protein powder for gaining weight, best weight gain protein powder, best protein powder for weight gaining, weight gaining protein powder, best protein supplement for weight gain, best protein powder gain weight, weight gain best protein powder, best protein powder to gain weight, weight gain powder protein, best weight gain protein powders, best weight gainer protein shakes, weight gain protein powder best, best protein supplement for gaining weight, best weight gainer, pre workout supplement drink, best protein powder to increase weight, good protein powder to gain weight, best weight gainer protein powder,
            gain muscle mass protein, muscle build protein, protein powder best for weight gain, bodybuilding supplements shop near me, bodybuilding supplement stores near me, best weight gain, best protein supplement to gain weight, good weight gainer protein shakes, gym supplement store near me, gym supplement shop near me, top weight gainer, top weight gainers, protein powder for weight loss, protein shakes best for weight gain, protein and weight loss powder, good weight gain protein shakes, protein supplement for weight loss, pre training drink, protein muscle builder, workout supplements creatine, weight loss protein supplements, protein powder for fat loss, protein supplement weight loss, best weight gaining protein shakes, protein supplements weight loss, fat loss protein supplements, best protein shakes gain weight, bcaa powder, workout supplements store near me, body supplement shop near me, supplement with creatine, gym shaker bottle, plant protein powder, workout supplement creatine, muscle building protein, protein for muscle gain, fat loss protein powder, protein powder in weight loss, pre exercise drink, muscle supplements creatine, tablet weight loss, muscle supplement creatine, best protein shakes for gaining weight, bodybuilding supplement shop near me, gym supplements creatine, creatine gym supplement, weight loss and protein powder, proteins for muscle gain, protein supplements for weight loss, creatine gym supplements, powder weight loss, weight loss powder protein, protein supplements and weight loss, protein supplement and weight loss, protein to gain muscles, best weight gain protein shakes, weight loss with protein powder, creatine supplement, bcaa benefits, bodybuilding supplement store near me,
             sports supplements store near me, protein powder shop near me, build muscle protein, lose weight powder, peanut butter 1kg, protein powder and weight loss, protein powder store near me, workout supplement store near me, power mass gainer, protein supplement shop near me, creatine in supplements, protein powder with pea protein, protein powders and weight loss, protein supplements to lose weight, weight losing powder, powder for weight loss, muscle building and protein, protein to muscle growth, protein whey standard gold, bcaa advantage, weight gainer women's, weight gainer woman, creatine as supplement, weight reduction powder, gym outfits for ladies, protein for muscle mass gain, lose weight with protein powder, weight loss powder, protein supplement for vegetarians, vegan protein powder, protein supplements vegetarian, best protein muscle gain, best muscle gainer protein, best protein for muscle gaining, best protein gain muscle, best muscle mass protein, best protein muscle gainer, gym supplements, supplements gym, wait gainer shakes, weight gainer shakes, top protein for muscle building, fat burner for women, protein supplement vegetarian, protein vegetarian powder, weight gainer shake, fat burner for ladies, best muscle builder protein, best protein muscle builder, fat burning for women, fat burn for women, fat burn for woman, best protein, best protein for gain muscle, protein supplements vegan, eaa supplements, whey isolates, eaa supplement, weight gain shake, whey protein one scoop, protein in 1 scoop of whey protein, one scoop whey protein, what is the whey protein, 1 scoop whey protein,
              what is whey protein, whey isolate protein on, on mass gainer, gold whey protein, gold protein whey, weight gaining shakes, protein isolate on, creatine monohydrate cost, isolate protein on, whey protein one scoop protein, weight gaining powder for women, female weight gain powder, weight gainer powder for women, weight gain powder for women, weight gainer powder for female, what are whey protein, best creatine monohydrate in india, on whey isolate, weight gain powder for females, weight gain powder female, what are whey products, weight gain powder for ladies, weight gainer for ladies, whey protein for what, women's weight gain powder, weight gainer for woman, weight gainer for women, 1 scoop of on whey protein, what is protein whey, weight gainer for females, price of creatine monohydrate, testosterone supplements, supplement testosterone, one scoop of whey protein, supplements for testosterone, weight gainer for female, gym bodybuilding, what.is whey protein, shakes for weight gain, body building in gym, testosterone hormone supplement, best peanut butter in india, best protein for building muscle, ladies weight gain powder, shake for weight gain, best source for protein for vegetarians, ladies weight gainer powder, weight gainer for men, best muscle mass gain supplement, supplements for gaining weight, gym protein powder, gain weight supplement, muscle mass gainer, weight gainer food supplement, best products for fat loss, best fat loss products,
               protein gym powder, supplement weight gainer, weight gainers men, supplements weight gain, increase weight supplement, weight gainers for men, best muscle gainer supplement, gain weight supplements, weight gaining supplements, best product for fat loss, best muscle enhancing supplements, best food supplement for muscle gain, best peanut butter for weight gain, top supplements to build muscle, best mass gainers india, best mass gainer in india, best workout supplement for muscle gain, best products for muscle gain, best workout supplements for muscle gain, best product for muscle gain, best peanut butter for weight gaining, gain weight with supplements, whey protein isolate best, best supplements for gaining muscle, india best mass gainer, gym protein, isolate protein best, supplements that gain weight, best weight loss products, indian best mass gainer, top weight loss products, best products for lose weight, good weight loss products, weight gainer for man, best products for weight loss, best multiple vitamin, best test booster, weight gain food supplements, weight loss best products, good weight loss product, best product for lose weight, good product for weight loss, best products for losing weight, best losing weight products, best product for losing weight, protein shops, top rated whey protein isolate, best creatine supplement in india, best peanut butter for gaining weight, good products for weight loss,protein bar chocolate, weight gain diet supplements, best multiple vitamins, best creatine powder in india, accessories for gym men, best product weight loss, whey isolate, 
               best peanut butter india, gym accessories for guys, protein bars chocolate, outfits for gym, weight gain for males, peanut butter for weight gain, whey protein one scoop nutrition, best peanut butter to gain weight, best protein isolate whey, best whey protein powder for building muscle, best protein powder for gaining muscle mass, best protein powder to gain muscle mass, best whey protein powder for muscle building, best protein supplement for weight loss, supplements for weight gain, protein powder weight gain, best protein supplement to gain muscle, gaining weight supplements, best protein supplement to build muscle, best protein powder for women, weight gainer protein, protein supplement to gain weight, protein powder gain weight, protein powder weight gainer, best protein whey for building muscle, best protein powder for gain muscle, best protein powder for ladies, best protein powder weight loss, weight gain whey protein, best protein powder for muscle building, whey protein gain weight,
                protein powder price, best whey protein build muscle, which are the best protein powder, protein powder rate, good protein powder for muscle gain, best whey protein for gaining muscle, which protein powder is good, protein supplement for weight gain, protein supplements for gaining weight, best protein supplement for muscle growth, best protein supplements to build muscle, protein powder best for weight loss, best protein powder for muscle gain, price of protein powder, whey protein to gain weight, which are the best protein powders, good muscle gain supplements, which best protein powder, best whey protein muscle growth, best whey protein for building muscles, weight gain protein, best whey protein for muscle building, top whey protein for muscle building, best protein powder muscle growth, which protein powder is best, best whey protein to build muscle, best whey protein powder to build muscle, best protein powder for muscle mass gain, best whey protein powder to gain muscle, best muscle gaining protein powder, good whey protein for muscle building, best whey protein muscle building, best whey protein to gain muscle, protein supplements price, best protein drink to gain muscle, muscle gain best protein powder, best protein supplements for weight loss, which is best protein powder, best whey protein muscle gain, weight gaining whey protein, weight gain protein drink, best muscle gain protein supplement, weight gainer and protein, best muscle gain whey protein, cost of protein powder, best protein supplement for women, best muscle mass gainer supplement, whey protein and weight gainer, best protein powder for building muscle, products for fat loss, gaining weight protein powder, best protein powder muscle gain, weight gainer whey protein, supplements weight gainer, best muscle gainer protein powder, which protein powder best, protein supplement weight gain, best protein powders for muscle gain, protein supplements weight gain, best muscle growth protein powder, best protein powder for weight loss, good muscle building protein powder, protein in weight gainer, protein powder and weight gain, weight gain and protein powder, 
                good protein powder for muscle building, protein powder best for women, best protein powder for fat loss, price for protein powder, best whey protein for muscle growth, which is best protein supplement, whey protein best for muscle gain, best whey protein for muscle gain, protein supplement price, best protein powder build muscle, protein powder to increase weight, best whey protein for building muscle, best protein supplements for muscle growth, best protein supplements for women, good protein powder to build muscle, best protein powder for muscle growth, weight gainer protein drinks, which protein powder is the best, best whey muscle building protein, best protein supplements weight loss, weight gainer with protein, which protein supplement is best, which protein supplement is the best, weight gain with protein, protein powders to gain weight, protein supplements gain weight, protein supplements to gain weight, which protein powders are the best, weight loss product, weight loss supplement, mass gainer 5kg, weight loss supplements, best whey protein for building muscle mass, best fat burner for men, best muscle mass gaining supplements, best protein powder for gaining muscle, best bodybuilding supplements for mass, whey protein for weight gain, best supplement for gain muscle, protein drink for weight gain, protein whey weight gain, products for lose weight, best protein powder for females, best supplement for muscle gain, best protein powders for fat loss, good supplements for muscle gain, best protein supplement for fat loss, best supplement for muscle gaining, proteins for weight gain, protein powder increase weight, best supplements for muscle mass gain, protein supplements and weight gain, best supplement before workout, best mass muscle building supplements, good weight loss protein powder, best lose weight protein powder, weight loss weight loss supplements, 
                best whey isolate, best supplements muscle, supplements lose weight, best protein powder for building muscle mass, best whey protein to gain muscle mass, best protein powder to build muscle mass, weight gain protein drinks, best fat loss protein powder, protein whey for weight gain, best supplement gain muscle, best muscle increase supplement, best bodybuilding supplements for mass gain, best supplement for muscle mass gain, top isolate whey protein, protein weight gainer shakes, best supplements gain muscle, protein drinks for weight gain, best fat burner men, protein and weight gain shakes, best muscle gain supplement, protein weight gainer shake, good protein powders for muscle gain, weight gain and protein shakes, best protein powder women, best protein powder for female, whey protein for gaining weight, best isolate protein, creatine flavoured, flavoured creatine, creatine flavors, best muscle growth supplements, supplements best for muscle gain, best pre workout supplement, pre workout best supplement, weight loss products, best supplements for pre workout, best protein drinks for women, protein drinks gain weight, best fat burning supplements for men, protein shakes to put on weight, best supplement pre workout, best protein supplement women, best protein supplements women, women protein powder, supplement for lose weight, best protein shakes women, diet supplements to lose weight, best multivitamin tablets for women, a weight loss supplement, weight reduction products, loss weight supplement, fat loss medicine, weight control supplement, 
                wheybolic protein benefits, weight loss diet supplements, best protein drink for women, protein whey gain weight, best fat burning for men, best protein supplements to gain muscle, good women's protein powder, best protein supplement for gaining muscle, weight gain with whey protein, best creatine to gain muscle, best woman protein powder, mass gainer 5 kg, best women protein powder, creatine pre workout or post, protein shakes increase weight, protein powder and fat loss, weight reduce supplement, weight control supplements, lose weight supplements, weight reducing supplements, protein isolate best, best creatine muscle gain, protein shakes for weight gain, best fat burner supplements for men, best protein powder lose weight, protein shakes and weight gain, protein weight gain shakes, flavored creatine, bcaa price, best protein mixes for weight loss, whey protein under 1000,
                 high protein peanut butter, peanut butter with highest protein, supplements for lose weight, best ladies protein powder, whey protein to increase weight, protein drinks to gain weight, women's protein powder, price of bcaa, side effects of mass gainer, weight loss and supplements, best iso whey protein, diet supplement for weight loss, weight loss food supplements, on whey protein 1kg, best creatine to gain muscle mass, diet supplements for weight loss, which creatine best, loss weight products, big muscle mass gainer, on 1kg whey protein, protein shakes and weight loss, best women's protein supplement, best rated pre workout supplement, weight control products, mass gain side effects, best creatine for muscle growth, which protein shakes are the best, creatine post workout or pre, gym bags ladies, whey protein benefits, diet supplements weight loss, weight loss healthy supplements, big muscle pre workout, bag for gym women, gym kit men, gym bags for ladies, top rated pre workout supplements, best female protein powders, female gym bag, best brand creatine, protein drink for weight loss, protein drinks weight loss, on creatine monohydrate, on monohydrate creatine, protein shakes for weight loss, protein in protinex powder, best brands creatine, protein drinks for weight loss, weight loss dietary supplements, best time to take shilajit, mass gainer side effects, protein shakes for fat loss, protein shake for weight loss, best muscle building creatine, protein drink weight loss, ladies gym bags, protein shake for fat loss, sugar free protein supplements, protein shakes best for women, healthiest protein powder for weight loss, gym bag for woman, weight loss shakes with protein, 
                 protein shakes lose weight, weight loss herbalife products, 1 tsp peanut butter calories, ayurvedic weight gainer, medicines for fat loss, proteins chart, best bags for laptop, whey meaning hindi, 1 tbsp peanut butter nutrition, protein milk shake for weight loss, weight loss with protein shakes, protein drink and weight loss, gym bags for women, protein shake for losing weight, dietary supplement for weight loss, dietary supplements for weight loss, which creatine is best, lose weight on protein shakes, diet chart for gym muscle gain, whey concentrate vs whey isolate, protein shake in weight loss, pre workout supplement side effects, protein shake and weight loss, protein x protein powder, 1 spoon peanut butter protein, spoon meaning in hindi, muscle growth supplements, whey isolate protein powder, whey isolated protein powder, whey isolate powder, whey protein powder price, best supplements before workout, creatine protein, fastest weight gainer, muscle mass supplement, protein powder isolate whey, whey protein powder cost, wave protein powder price, muscle booster supplements, whey protein powder rate, cost of whey protein powder, mass muscle building supplements, protein powder with whey protein isolate, muscle mass supplements, gym powder, muscle gain supplement, supplement for muscle, grow muscle supplements, whey isolate 1kg, muscle gain supplements, building muscle with supplements, supplements to gain muscle, whey isolate protein 1kg, weight loss protein powder, supplements that build muscle mass, supplements for gain muscle, 
                 building muscle supplements, build mass supplements, weight gainer fast, fast weight gainer, protein isolate 1kg, isolated whey protein powder, protein powder iso whey, muscle mass building supplements, whey protein isolate 1 kg, best pre workout supplements, protein shakes whey isolate, protein store near me, whey protein isolate 1kg, muscle building supplements, isolate protein 1kg, 1kg whey isolate, muscle build supplement, muscle growing supplements, 1kg whey protein, gym strap, muscle builder supplement, best supplements creatine, protein isolate powder, best supplement for pre workout, build muscle mass supplements, best creatine supplement for bodybuilding, best creatine supplement, woman protein powder, good creatine powder, peanut butter price 1kg, top pre workout supplement, protein powder near me, muscle gain tablets, creatine best supplement, best supplement creatine, protein whey isolate powder, best supplement with creatine, best pre workout products, best supplements pre workout, supplements for building muscle mass, weight losing protein powder, wristband support, protein whey 1kg, whey hydrolysate protein, bcaa uses, creatine post or pre workout, peanut butter 1 kg price, hydrolysate whey protein, protein shake whey isolate, best creatine in india, peanut butter 1kg price, side effects fat burner, creatine supplement best, muscle builder pills, protein bars price, muesli 1 kg, creatine supplements best, top creatine supplement, mens sports bag, sports bag for men, best multivitamin tablets women, best rated creatine supplement, fat loss pills that really work, best multivitamin tablets recommended by doctors, weight loss supplements for women that actually work, best creatine workout supplement, sports bag for man, straps for gym, protein supplements near me, duffle gym bag, nutrition shop near me, sports bags for men, india best creatine, sports bag man, sports bag men, joggers gym, side effects of fat burner, gym joggers, top creatine supplements, gym bag duffle bag, protein bar price, whey protein hydrolyzed, hydro whey protein, hydra whey protein,
                 gym duffle bag, hydrolyzed whey protein, nutrition store close to me, protein whey hydrolysate, hydrolyzed protein whey, creatine pre or post workout, duffle bag for gym, duffel bag for gym, gym bags for woman, what is bcaa, muscle mass, ladies workout bag, on pre workout, best creatine india, gym bag ladies, benefits to protein powder, duffle bags for gym, testosterone supplements for men, how protein powder are made, testosterone supplement for men, benefits of creatine powder, men's supplements for testosterone, creatine before workout or after, best sports shop near me, fat burner side effects, protein powders near me, nutritionist shop near me, bcaa what is it, on serious mass gainer, gym duffle bags, protein testing, bcaas what is it, best sports store near me, vitamins & supplements, protein powder advantages, creatinine meaning in hindi, body building hd photos, supplements nutrition, high protein foods to gain weight, how protein powders are made, creatine before or after a workout, creatinine protein, muscle builder foods, weight gainer meaning in hindi, bcaa side effects, nutrition and supplement, boost powder, whey protein 2kg, best supplements for women for weight loss, protein powder high protein, 
                 best brand of whey protein, best protein whey brand, good whey protein brand, whey protein best brand, whey protein which brand is best, high in protein powder, best brands for whey protein, protein whey, gainer price, best weight gainer for male, high protein protein powder, weight loss protein supplements for women, best brand whey protein, gainer with protein, lean mass gainers, high protein powder, best brand for whey protein, high protein powders, best brands whey protein, gaining protein, belly fat burners, best weight loss supplements for woman, best weight gainer for men, best women supplements for weight loss, best female weight loss supplements, weight gainer creatine, best supplements for weight loss for women, high protein supplement powder, best supplements for women fat loss, best supplements for weight loss women, top weight gainers for men, good whey protein brands, best whey protein brands, best female fat loss supplement, best weight loss supplements for female, best women's supplement for weight loss, best supplement for female weight loss, best supplements for weight loss in women, 
                 top rated weight loss supplements for women, weight gain powder for men, best weight loss product for women, best weight loss products for women, best supplements for weight loss female, best fat loss supplement for women, best weight gain for men, best whey protein in the world, best weight gainer for women, protein powder for women weight loss, belly fat burner, how to protein powder, protein powder for women for weight loss, weight loss protein powder for female, best protein whey brands, protein supplements for women weight loss, whey protein top brands, best fat loss supplements for women, best women's fat loss supplements, creatine protein powder price, best weight loss supplement women, best supplements for women weight loss, best weight loss supplements for women, best female weight loss supplement, best brands of whey protein, best weight loss supplements women, best women's weight loss supplements, weight loss protein powder for females, 
                 best weight loss supplements for females, best fat loss supplements for females, best weight loss supplement for women, protein powder under 1000, creatine powder price, multivitamin supplement, best women's weight loss products, protein powder for female weight loss, best women's supplements for weight loss, protein supplement for women weight loss, best weight gainer for females, best supplements for female weight loss, protein powder for women to lose weight, female weight loss protein powder, 1 kg whey protein, lean weight gainers, worlds best whey protein, protein drink, best female weight gainer, how much protein in peanut, muscle fit gym, protein powder for weight loss female, supplements near me, world's best whey protein, t shirt for gym, is whey protein good for you, top whey protein brands, how to use protein shaker, protein shaker how to use, mass gainer lean, lean mass gainer, creatine for weight gain, gym men shirts, is whey protein safe, protein to drink, top 10 whey protein brands in world, best female supplements for weight loss, women's weight gain tablets, shirts for men gym, protein powder for women losing weight, world best whey protein, is protein whey good for you,
                 women's protein powder to lose weight, t shirt black, fitness gym muscle, best supplements for women's weight loss, how to have protein powder, how use protein powder, what is whey, natural protein powder, how to use protein supplement, 1 tablespoon of peanut butter protein, protein 1 tbsp peanut butter, fitness store near me, protein peanut butter 1 tbsp, protein in mango, whey concentrate, nutrition powder, best protein powder whey, fat burner food supplement, which is best whey protein powder, whey protein best powder, supplements for fat loss, supplement fat loss, supplements for losing fat, top whey protein powder, fat reducing supplements, isolate protein powder, protein powders to build muscle, mass gainer price, protein powder to build muscle, lose fat supplements, protein powder to gain muscle mass, whey protein for fat loss, protein powder for muscle gain, pre workout powder, protein supplement for muscle gain, burn fat supplement, muscle gainer protein powder, fat burning foods supplements, gain protein, raw protein, gainer protein, concentrate whey, whey protein for weight loss, gain muscle protein powder, gainer mass price, protein powder for muscle growth, whey protein with weight loss, protein powder with isolate, mass gainer protein supplement, protein mass gainer powder, mass gainer and protein powder, protein powder for muscle mass gain, fat reduce supplement, protein muscle building powder, protein powder for gaining muscle, price of mass gainer, protein powders for muscle gain, best protein shake whey, fat reduce supplements, protein supplements muscle gain, mass gain price, protein powder mass gainer, lose fat supplement, mass gainer rate, mass gainer on price, fat reduction supplements, which whey protein powder is best,
                 muscle growth protein powder, fat loss diet supplements, fat burning diet supplements, fat burning food supplements, mb whey protein 2kg, mass gainer protein powder, muscle building protein powder, best whey protein powder, supplements for fat burn, pre workout supplement powder, protein powder for building muscle mass, supplements for fat burning, which is best whey protein, which whey protein best, which whey protein is the best, cheap protein whey, which whey protein is better, protein whey 2kg, 4kg whey protein, protein 2kg whey, post workout, preworkout powder, workout post, bcaa protein, cheap whey protein, fat loss supplements, 1kg protein powder, fat burner supplement, protein whey weight loss, burn fat burner supplement, weight gainer powder for male, fat burning dietary supplements, which is the best whey protein supplement, muscle gaining protein powder, fat burner dietary supplement, low cost whey protein, whey protein & weight loss, supplements for burning fat, cheapest whey protein, whey protein cheapest, cheapest protein whey, fat loss whey protein, muscle recovery.in, whey protein affordable, muscle protein, gym backpack, fat burning supplements, fat burner supplements, which peanut butter is best for weight gain, whey protein in weight loss, gym bottle shaker, best pre workout supplement india, best pre workout supplements in india, protein whey lose weight, protein supplements to gain muscle, weight gain powder for male, protein shake for weight gain female, whey protein shop near me, gym bags backpack, peanut butter as protein, top rated whey protein powder, best pre workouts in india, weight gain protein powder for women, weight loss with whey protein,
                  weight gainer protein powder for women, protein powder for female weight gain, protein whey and weight loss, protein supplements for women weight gain, cheapest price whey protein, whey protein fat loss, protein for women, protein powder for weight gain for women, best pre workout in india, backpacks for gym, wrist protector for gym, whey protein and weight loss, whey protein for losing weight, whey protein unflavoured, supplements for weight gain for women, protein in a peanut butter, protein of peanut butter, whey protein 4kg, cheapest on whey protein, 4kg protein whey, big muscle whey, 5kg whey protein, protein peanut butter, nearby supplement shop, whey protein or whey isolate, which best whey protein, best creatine for men, weight gain supplements women, supplement shops near, protein powder for weight gain for females, gym bag backpack, supplements shop nearby, nearest supplement store, protein powder for weight gain women, 4 kg whey protein, supplement for weight gain for female, women's weight gain supplements, best brand peanut butter, gym backpack bag, supplements for weight gain women, weight gainer supplement for female, supplement for women's weight gain, whey 5 kg protein, whey protein 5kg, best multivitamin for men in india, nearby supplement store, whey protein 5 kg, whey protein vs isolate protein, iso protein vs whey protein, nutritional supplements near me, whey protein vs whey isolate, whey protein description, weight gain supplements for woman, protein of muscle, protein whey 5kg, supplement shops nearby, protein whey 5 kg, backpack for gym, full sleeve tshirt for gym, 5 kg whey protein, near supplement shop, weight gain supplements for women, whey vs whey isolate, whey protein and losing weight, peanut butter chocolate flavour, gym suit for men, full sleeve t shirts for gym, protein for woman, nutrition supplements near me, my fitness whey protein, weight gaining protein shakes for women, gym bag women's, whey vs isolate protein, pea protein supplement, near supplement store, weight gain supplements for females, mens gym wear, testosterone booster ayurveda, gym bags women's, 
                  weight gain banana, dietary supplement near me, chocolate protein powder, sports shop near by me, diet supplements near me, best multivitamins for men india, booster testosterone, how to fat burn, supplement shop near, whey isolate vs protein, whey protein vs whey protein isolate, women's protein powder for weight gain, protein powder for weight gain woman, which best peanut butter, nutrition in 100g oats, protein shakes for weight gain female, weight gain by banana, which is best peanut butter, isolate vs whey protein, weight gain protein shakes for women, isolate whey protein vs whey protein, weight gain protein powder women, big muscles whey, peanut butter content, fat burner workout, protein powder for women to gain weight, whey isolate vs whey, women protein powder for weight gain, gain weight protein shakes for women, whey isolate vs whey protein, whey protein isolate vs whey protein, protein shake for women to gain weight, protein shake to gain weight female, whey isolate vs, how do you use protein powder, difference between whey protein and whey isolate, difference between whey protein and whey isolate protein, which is the best peanut butter, peanut butter for weight loss, gain weight with creatine, guest snacks bar, protein shakes for female weight gain, creatine in body, a body of mass 5kg, 2 spoon peanut butter calories, watermelon calories 1kg, 1 tsp peanut butter protein, whey protein mean, protein shakes to gain weight female, myfitness chocolate peanut butter, 100 grams protein, top peanut butter brands, difference between whey and isolate protein, do peanut butter gain weight, peanut butter best brand, sports store coimbatore, 250 ml to grams, protein shakes for weight gain women, whey protein means, world no 1 nutrition company in india, fitness gym kolkata, banana for weight gain, whey vs plant protein"
                />
                <meta
                    property="og:image"
                    content="https://www.purego.gomzilifesciences.in/assets/process.env.PUBLIC_URL + '/assets/images/nutrition-logo.png"
                />
                <meta property="og:url" content="https://purego.gomzilifesciences.in/" />
                <link rel="canonical" href={{ canonicalUrl }} />

                <link rel="preconnect" href="https://connect.facebook.net" />
                <script>
                    {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1144699046738070');
            fbq('track', 'PageView');
          `}
                </script>
                <noscript>
                    {`<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1144699046738070&ev=PageView&noscript=1"
          />`}
                </noscript>
                <link
                    rel="preload"
                    href={`${process.env.PUBLIC_URL}/assets/process.env.PUBLIC_URL +  "/assets/images/nutrition/nutrition-banner-inner-14.webp`}
                    as="image"
                />
                {/* Google tag (gtag.js) */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-J50WNKGW38"
                ></script>
                <script>
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J50WNKGW38');
          `}
                </script>
            </Helmet>
            {/* <WhatsappHeaderApp
        message={
          "Hello, I wanted to know more about all Pure Go Products. "
        }
        options={{ pageRef: true }}
      /> */}
            {/* <div id="preloader">
        <div className="tg-cube-grid">
          <div className="tg-cube tg-cube1"></div>
          <div className="tg-cube tg-cube2"></div>
          <div className="tg-cube tg-cube3"></div>
          <div className="tg-cube tg-cube4"></div>
          <div className="tg-cube tg-cube5"></div>
          <div className="tg-cube tg-cube6"></div>
          <div className="tg-cube tg-cube7"></div>
          <div className="tg-cube tg-cube8"></div>
          <div className="tg-cube tg-cube9"></div>
        </div>
      </div> */}
            <NutritionHeader />
            <button className="scroll-top scroll-to-target" data-target="html">
                <i className="fas fa-angle-up"></i>
            </button>
            <main className="main-area fix">
                <section className="breadcrumb-area breadcrumb-bg">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                <div className="breadcrumb-content text-center">
                                    <h2 className="title">Blog Details</h2>
                                    <nav aria-label="Breadcrumbs" className="breadcrumb-trail">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item trail-item trail-begin">
                                                <a href="/">
                                                    <span>Home</span>
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item trail-item trail-end">
                                                <span>Blog Details</span>
                                            </li>
                                        </ul>
                                    </nav>
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
                </section>
                <section className="blog-area pt-120 pb-120">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="blog--post--item">
                                    <div className="blog--post--content blog-details-content">
                                        <h2 className="blog--post--title">
                                            Pricing Policy for Pure Go
                                        </h2>
                                        <div className="post-text">
                                            <p>
                                                At Pure Go, we strive to provide our customers with transparent and fair pricing for our high-quality nutraceutical products. This Pricing Policy outlines how we determine and display prices on our website, including the inclusion of Goods and Services Tax (GST).
                                            </p>
                                            <div className="blog-details-wrap border-none">
                                                <h3 className="title">Price Display:</h3>
                                                <div className="b-details-list">
                                                    <ul className="list-wrap">
                                                        <li>
                                                            <i className="fas fa-check"></i>
                                                            Inclusive Pricing: All prices listed on our website are inclusive of 18% Goods and Services Tax (GST). This means that the price you see is the total amount you will pay at checkout, with no additional taxes added at that time.
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-check"></i>
                                                            Currency: All prices are displayed in [insert currency, e.g., USD, INR] and are subject to change without prior notice. The currency will be clearly indicated on the website for your convenience.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="blog-details-wrap border-none">
                                                <h3 className="title">Price Changes:</h3>
                                                <div className="b-details-list">
                                                    <ul className="list-wrap">
                                                        <li>
                                                            <i className="fas fa-check"></i>
                                                            Adjustments: While we aim to maintain consistent pricing, we reserve the right to change our prices at any time due to factors such as supplier costs, demand, or market conditions. Any changes will be reflected on our website.
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-check"></i>
                                                            Current Prices: The price applicable to your order will be the price displayed at the time of purchase. If there is a discrepancy between the displayed price and the price you are charged, please contact our customer service team for clarification.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="blog-details-wrap border-none">
                                                <h3 className="title">Discounts and Promotions:</h3>
                                                <div className="b-details-list">
                                                    <ul className="list-wrap">
                                                        <li>
                                                            <i className="fas fa-check"></i>
                                                            Promotional Pricing: From time to time, we may offer discounts, special promotions, or bundle deals. These promotions will be clearly indicated on our website, including the duration and terms of the offer.
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-check"></i>
                                                            Applicability: Discounts are applied at checkout and will be clearly shown in your order summary. Please note that promotions may be subject to specific terms and conditions.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="blog-details-wrap border-none">
                                                <h3 className="title">Payment Methods:</h3>
                                                <div className="b-details-list">
                                                    <ul className="list-wrap">
                                                        <li>
                                                            <i className="fas fa-check"></i>
                                                            Accepted Payment Methods: We accept various payment methods for your convenience, including credit/debit cards, digital wallets, and bank transfers. All payment options will be listed at checkout.
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-check"></i>
                                                            Security: We utilize secure payment gateways to ensure that your payment information is processed safely and confidentially.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="blog-details-wrap border-none">
                                                <h3 className="title">Customer Support:</h3>
                                                <div className="b-details-list">
                                                    <ul className="list-wrap">
                                                        <li>
                                                            <i className="fas fa-check"></i>
                                                            Email: gomzinutrition@gmail.com
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-check"></i>
                                                            Phone: +91 83200 77993.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p>
                                                We are excited to have you on board with Pure Go. Your health and wellness journey is important to us, and we are committed to providing you with the best experience possible. If you have any questions or concerns regarding these Terms and Conditions, please do not hesitate to reach out to us.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <HomeNutritionFooter />
        </>
    );
}

export default PricingPolicyCustomer;
