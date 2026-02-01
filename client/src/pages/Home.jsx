import HeroSection from "../components/Home/HeroSection";
import ProductCard from "../components/Home/ProductCard";

const Home = () => {
  // TODO: Replace this dummy data with data from your RTK Query (e.g., data.products)
  const products = [
    {
      _id: "1",
      name: "Sony WH-1000XM5 Headphones",
      description: "Noise canceling headphones with 30hr battery.",
      price: 348.0,
      category: "Electronics",
      inStock: true,
      imageURL:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    },
    {
      _id: "2",
      name: "MacBook Air M3",
      description: "Supercharged by M3. The world's most popular laptop.",
      price: 1099.99,
      category: "Computers",
      inStock: true,
      imageURL:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=1000&auto=format&fit=crop",
    },
    {
      _id: "3",
      name: "Canon EOS R50",
      description: "Compact mirrorless camera for content creators.",
      price: 679.99,
      category: "Cameras",
      inStock: false,
      imageURL:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    },
    {
      _id: "4",
      name: "Mechanical Keyboard",
      description: "Q1 Pro wireless custom mechanical keyboard.",
      price: 199.0,
      category: "Accessories",
      inStock: true,
      imageURL:
        "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  // Logic placeholder
  // const { data, isLoading, error } = useGetProductsQuery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      {/* {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading products</div>
      ) : ( */}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* )} */}
    </div>
  );
};

export default Home;
