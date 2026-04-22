export interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  image: string;
  availability: 'In Stock' | 'Out of Stock' | 'Limited Content';
}

export const products: Product[] = [
  {
    id: "1",
    title: "Pro Edition Laptop",
    description: "Ultra-slim design with peak performance hardware.",
    fullDescription: "Experience the ultimate productivity with our Pro Edition Laptop. Featuring a 14-inch Retina-grade display, the latest generation processor, and 32GB of ultra-fast RAM. Designed for creators and professionals who demand excellence on the go.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop",
    availability: 'In Stock'
  },
  {
    id: "2",
    title: "Ultra Vision Smartphone",
    description: "Capture every detail with our 108MP camera system.",
    fullDescription: "The Ultra Vision Smartphone redefines mobile photography. With a stunning 6.7-inch AMOLED display and a revolutionary 108MP quad-camera setup, you can capture breathtaking photos in any light. Powered by a 5000mAh battery for all-day use.",
    price: 999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop",
    availability: 'In Stock'
  },
  {
    id: "3",
    title: "Acoustix Headphones",
    description: "Industry-leading noise cancellation technology.",
    fullDescription: "Immerse yourself in pure sound with Acoustix. Our advanced active noise cancellation technology blocks out the world so you can focus on your music. Features premium leather ear cups and 40 hours of battery life on a single charge.",
    price: 349,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    availability: 'Limited Content'
  }
];
