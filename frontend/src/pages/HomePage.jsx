import React from "react";
import Navbar from "../components/NavBar.jsx";
import CategoryCarousel from "../components/CategoryCarousel.jsx";
import PopularPicks from "../components/PopularPicks.jsx";
import Footer from "../components/Footer.jsx";

const HomePage = () => {

  // Sample items for the CategoryCarousel
  const items = [
    { id: 1, title: "Power Tools", imageSrc: "https://picsum.photos/1200/800?random=1" },
    { id: 2, title: "Hand Tools", imageSrc: "https://picsum.photos/1200/800?random=2" },
    { id: 3, title: "Welding & Soldering", imageSrc: "https://picsum.photos/1200/800?random=3" },
    { id: 4, title: "Material Handling & Packagings", imageSrc: "https://picsum.photos/1200/800?random=4" },
    { id: 5, title: "Fasteners", imageSrc: "https://picsum.photos/1200/800?random=5" },
    { id: 6, title: "Abrasives", imageSrc: "https://picsum.photos/1200/800?random=6" },
    { id: 7, title: "Pneumatics", imageSrc: "https://picsum.photos/1200/800?random=7" },
    { id: 8, title: "Hydraulics", imageSrc: "https://picsum.photos/1200/800?random=8" },
    { id: 9, title: "Cutting Tools & Machining", imageSrc: "https://picsum.photos/1200/800?random=9" },
    { id: 10, title: "Industrial Plant Machineries", imageSrc: "https://picsum.photos/1200/800?random=10" },
    { id: 11, title: "New Arrivals", imageSrc: "https://picsum.photos/1200/800?random=11" },

    // ...more items
  ];

  return (
    <div>
      <Navbar />

      {/* Landing Image Section */}
      <div className="relative w-full h-[80vh]">
        {/* Background image */}
        <img
          src="hero_section.jpg" // Replace with your image URL
          alt="Landing"
          className="w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Optional centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg uppercase">
            Welcome <br />to <br /><span className="">Ed-Michaels</span> Enterprise
          </h1>
          <p className="mt-4 text-lg md:text-xl drop-shadow-md">
            High quality tools & supplies, always reliable and ready.
          </p>
          <button className="btn btn-primary mt-6">Shop Now</button>
        </div>
      </div>

      {/* Category Carousel Section */}
      <div className="max-w-[97vw] mx-auto my-6 px-6 bg-base-200 rounded-2xl border border-base-200 shadow-[inset_0_0_18px_rgba(0,0,0,0.06)] overflow-hidden">

        <CategoryCarousel title="ALL CATEGORIES (11)" items={items} />

      </div>

      {/* Popular Picks Section */}
        <PopularPicks />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default HomePage;
