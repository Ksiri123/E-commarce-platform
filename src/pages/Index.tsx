import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CartProvider } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";

const featuredProducts = [
  {
    id: "1",
    name: "Peace Lily",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
  },
  {
    id: "2",
    name: "Japanese Maple",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
  },
  {
    id: "3",
    name: "Rose Bush",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
  },
  {
    id: "4",
    name: "koyo plant",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
  },
  {
    id: "5",
    name: "Green Suclant plant",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1455793222120-98f37a8d4ede?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnRzfGVufDB8fDB8fHww",
  },
  {
    id: "4",
    name: "Lush Green plant",
    price: 89.99,
    image: "https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHBsYW50c3xlbnwwfHwwfHx8MA%3D%3D",
  },
];
const flowerProducts = [
  {
    id: "6",
    name: "Red Roses",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322",
  },
  
  {
    id: "7",
    name: "Sunflowers",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651",
  },
  {
    id: "8",
    name: "Tulips",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102",
  },
  {
    id: "9",
    name: "yellow Roses",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1688335698978-0c8336c6da70?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "10",
    name: "Rocho flower",
    price: 22.99,
    image: "https://plus.unsplash.com/premium_photo-1698514275643-7ee462175a6b?q=80&w=1572&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "11",
    name: "Frank flores",
    price: 149.99,
    image: "https://plus.unsplash.com/premium_photo-1676068243733-df1880c2aef8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZsb3dlcnN8ZW58MHx8MHx8fDA%3D",
  },
];

const treeProducts = [
  {
    id: "12",
    name: "Oak Tree",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
  },
  {
    id: "13",
    name: "Pine Tree",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
  },
  {
    id: "14",
    name: "Maple Tree",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
  },
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState('plants');

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    toast.success(`Viewing ${section} collection`, {
      description: `Browse our beautiful ${section} selection`,
      duration: 2000,
    });
  };

  const renderProducts = () => {
    switch (currentSection) {
      case 'flowers':
        return (
          <>
            <h2 className="mb-8 text-3xl font-bold text-center">Beautiful Flowers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {flowerProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </>
        );
      case 'trees':
        return (
          <>
            <h2 className="mb-8 text-3xl font-bold text-center">Majestic Trees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {treeProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </>
        );
      default:
        return (
          <>
            <h2 className="mb-8 text-3xl font-bold text-center">Featured Plants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar onSectionChange={handleSectionChange} />
        <Hero />
        <div className="container mx-auto py-16">
          {renderProducts()}
        </div>
      </div>
    </CartProvider>
  );
};

 


export default Index;