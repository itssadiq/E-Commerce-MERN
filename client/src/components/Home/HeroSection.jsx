import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-indigo-900 text-white overflow-hidden rounded-xl mb-12">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-30"
          src="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2000&auto=format&fit=crop"
          alt="Shopping Banner"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Summer Collection
        </h1>
        <p className="mt-4 text-xl text-indigo-100 max-w-3xl">
          Discover the latest trends in technology and fashion. Premium quality
          products curated just for you.
        </p>
        <div className="mt-8">
          <Link
            to="/products" // Or generic scroll to grid
            className="inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-indigo-900 hover:bg-indigo-50"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
