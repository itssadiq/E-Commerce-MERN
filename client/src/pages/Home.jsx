import Footer from "../components/Footer";
import HeroSection from "../components/Home/HeroSection";
import ProductCard from "../components/Home/ProductCard";
import Header from "../components/Header";
import { useGetAllProductsQuery } from "../services/product";

const Home = () => {
  const { data, isLoading, error } = useGetAllProductsQuery();
  const products = data?.products || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      {/* Hero Banner */}
      <HeroSection />

      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Latest Products
        </h2>
        <a
          href="/products"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hidden sm:block"
        >
          View all products &rarr;
        </a>
      </div>

      {/* Loading/Error States (Commented out for now) */}
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading products</div>
      ) : (
        <div>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
