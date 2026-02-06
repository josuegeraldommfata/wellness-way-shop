import React, { createContext, useContext, useState, ReactNode } from "react";
import { products as initialProducts, categories as initialCategories, videoTestimonials as initialVideos, Product, Category, VideoTestimonial, Banner } from "@/data/mockData";

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  parentCategoryId: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  customerCep: string;
  customerAddress: string;
  customerNeighborhood: string;
  customerCity: string;
  customerState: string;
  items: { productId: string; productName: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  trackingCode?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: "mercadopago" | "pix" | "boleto" | "credit_card";
  enabled: boolean;
  config: Record<string, string>;
}

export interface ShippingIntegration {
  id: string;
  name: string;
  type: "melhor_envio" | "correios" | "jadlog";
  enabled: boolean;
  config: Record<string, string>;
}

interface StoreDataContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Subcategories
  subCategories: SubCategory[];
  addSubCategory: (subCategory: Omit<SubCategory, "id">) => void;
  updateSubCategory: (id: string, subCategory: Partial<SubCategory>) => void;
  deleteSubCategory: (id: string) => void;
  
  // Videos
  videoTestimonials: VideoTestimonial[];
  addVideo: (video: Omit<VideoTestimonial, "id">) => void;
  updateVideo: (id: string, video: Partial<VideoTestimonial>) => void;
  deleteVideo: (id: string) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt">) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  
  // Payment Methods
  paymentMethods: PaymentMethod[];
  updatePaymentMethod: (id: string, config: Partial<PaymentMethod>) => void;
  
  // Shipping
  shippingIntegrations: ShippingIntegration[];
  updateShippingIntegration: (id: string, config: Partial<ShippingIntegration>) => void;
  
  // Banners
  banners: Banner[];
  addBanner: (banner: Omit<Banner, "id" | "order">) => void;
  updateBanner: (id: string, banner: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;
  reorderBanners: (orderedIds: string[]) => void;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

const generateId = () => Math.random().toString(36).substring(2, 9);

// Mock orders
const mockOrders: Order[] = [
  {
    id: "ord-1",
    customerName: "Maria",
    customerLastName: "Silva",
    customerEmail: "maria@email.com",
    customerPhone: "(11) 99999-9999",
    customerCep: "01310-100",
    customerAddress: "Av. Paulista, 1000",
    customerNeighborhood: "Bela Vista",
    customerCity: "São Paulo",
    customerState: "SP",
    items: [{ productId: "1", productName: "MOUNJARO 15mg (Lilly)", quantity: 1, price: 3300 }],
    total: 3300,
    status: "delivered",
    createdAt: "2025-01-20T10:30:00Z",
    trackingCode: "BR123456789",
  },
  {
    id: "ord-2",
    customerName: "João",
    customerLastName: "Santos",
    customerEmail: "joao@email.com",
    customerPhone: "(21) 98888-8888",
    customerCep: "22041-080",
    customerAddress: "Rua Copacabana, 500",
    customerNeighborhood: "Copacabana",
    customerCity: "Rio de Janeiro",
    customerState: "RJ",
    items: [
      { productId: "2", productName: "TG - 15mg (Indufar)", quantity: 2, price: 1800 },
    ],
    total: 3600,
    status: "processing",
    createdAt: "2025-02-01T14:20:00Z",
  },
  {
    id: "ord-3",
    customerName: "Ana",
    customerLastName: "Oliveira",
    customerEmail: "ana@email.com",
    customerPhone: "(83) 97777-7777",
    customerCep: "58000-000",
    customerAddress: "Rua das Flores, 200",
    customerNeighborhood: "Centro",
    customerCity: "João Pessoa",
    customerState: "PB",
    items: [{ productId: "3", productName: "RETATRUTIDE 40mg (Synedica)", quantity: 1, price: 2500 }],
    total: 2500,
    status: "pending",
    createdAt: "2025-02-05T09:15:00Z",
  },
];

// Default payment methods
const defaultPaymentMethods: PaymentMethod[] = [
  {
    id: "pm-1",
    name: "Mercado Pago",
    type: "mercadopago",
    enabled: false,
    config: {
      publicKey: "",
      accessToken: "",
    },
  },
  {
    id: "pm-2",
    name: "PIX",
    type: "pix",
    enabled: true,
    config: {
      pixKey: "",
      pixName: "LipoImports",
    },
  },
];

// Default shipping integrations
const defaultShippingIntegrations: ShippingIntegration[] = [
  {
    id: "ship-1",
    name: "Melhor Envio",
    type: "melhor_envio",
    enabled: false,
    config: {
      token: "",
      sandboxMode: "true",
    },
  },
  {
    id: "ship-2",
    name: "Correios",
    type: "correios",
    enabled: true,
    config: {},
  },
];

// Default banners
const defaultBanners: Banner[] = [
  {
    id: "banner-1",
    title: "EMAGREÇA COM QUALIDADE E SEGURANÇA",
    subtitle: "Produtos importados, originais e com entrega rápida para transformar sua rotina.",
    buttonText: "COMPRAR AGORA",
    buttonLink: "/loja",
    image: "",
    isActive: true,
    order: 1,
  },
];

export function StoreDataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem("lipoimports_products");
    return stored ? JSON.parse(stored) : initialProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const stored = localStorage.getItem("lipoimports_categories");
    return stored ? JSON.parse(stored) : initialCategories;
  });

  const [subCategories, setSubCategories] = useState<SubCategory[]>(() => {
    const stored = localStorage.getItem("lipoimports_subcategories");
    return stored ? JSON.parse(stored) : [];
  });

  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>(() => {
    const stored = localStorage.getItem("lipoimports_videos");
    return stored ? JSON.parse(stored) : initialVideos;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem("lipoimports_orders");
    return stored ? JSON.parse(stored) : mockOrders;
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    const stored = localStorage.getItem("lipoimports_payments");
    return stored ? JSON.parse(stored) : defaultPaymentMethods;
  });

  const [shippingIntegrations, setShippingIntegrations] = useState<ShippingIntegration[]>(() => {
    const stored = localStorage.getItem("lipoimports_shipping");
    return stored ? JSON.parse(stored) : defaultShippingIntegrations;
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const stored = localStorage.getItem("lipoimports_banners");
    return stored ? JSON.parse(stored) : defaultBanners;
  });

  // Persist to localStorage
  const persist = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Products
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: generateId() };
    const updated = [...products, newProduct];
    setProducts(updated);
    persist("lipoimports_products", updated);
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...product } : p));
    setProducts(updated);
    persist("lipoimports_products", updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    persist("lipoimports_products", updated);
  };

  // Categories
  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = { ...category, id: generateId() };
    const updated = [...categories, newCategory];
    setCategories(updated);
    persist("lipoimports_categories", updated);
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, ...category } : c));
    setCategories(updated);
    persist("lipoimports_categories", updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    persist("lipoimports_categories", updated);
  };

  // Subcategories
  const addSubCategory = (subCategory: Omit<SubCategory, "id">) => {
    const newSubCategory = { ...subCategory, id: generateId() };
    const updated = [...subCategories, newSubCategory];
    setSubCategories(updated);
    persist("lipoimports_subcategories", updated);
  };

  const updateSubCategory = (id: string, subCategory: Partial<SubCategory>) => {
    const updated = subCategories.map((s) => (s.id === id ? { ...s, ...subCategory } : s));
    setSubCategories(updated);
    persist("lipoimports_subcategories", updated);
  };

  const deleteSubCategory = (id: string) => {
    const updated = subCategories.filter((s) => s.id !== id);
    setSubCategories(updated);
    persist("lipoimports_subcategories", updated);
  };

  // Videos
  const addVideo = (video: Omit<VideoTestimonial, "id">) => {
    const newVideo = { ...video, id: generateId() };
    const updated = [...videoTestimonials, newVideo];
    setVideoTestimonials(updated);
    persist("lipoimports_videos", updated);
  };

  const updateVideo = (id: string, video: Partial<VideoTestimonial>) => {
    const updated = videoTestimonials.map((v) => (v.id === id ? { ...v, ...video } : v));
    setVideoTestimonials(updated);
    persist("lipoimports_videos", updated);
  };

  const deleteVideo = (id: string) => {
    const updated = videoTestimonials.filter((v) => v.id !== id);
    setVideoTestimonials(updated);
    persist("lipoimports_videos", updated);
  };

  // Orders
  const addOrder = (order: Omit<Order, "id" | "createdAt">) => {
    const newOrder = { ...order, id: `ord-${generateId()}`, createdAt: new Date().toISOString() };
    const updated = [...orders, newOrder];
    setOrders(updated);
    persist("lipoimports_orders", updated);
  };

  const updateOrder = (id: string, order: Partial<Order>) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, ...order } : o));
    setOrders(updated);
    persist("lipoimports_orders", updated);
  };

  // Payment Methods
  const updatePaymentMethod = (id: string, config: Partial<PaymentMethod>) => {
    const updated = paymentMethods.map((p) => (p.id === id ? { ...p, ...config } : p));
    setPaymentMethods(updated);
    persist("lipoimports_payments", updated);
  };

  // Shipping
  const updateShippingIntegration = (id: string, config: Partial<ShippingIntegration>) => {
    const updated = shippingIntegrations.map((s) => (s.id === id ? { ...s, ...config } : s));
    setShippingIntegrations(updated);
    persist("lipoimports_shipping", updated);
  };

  // Banners
  const addBanner = (banner: Omit<Banner, "id" | "order">) => {
    const maxOrder = banners.length > 0 ? Math.max(...banners.map(b => b.order)) : 0;
    const newBanner: Banner = { ...banner, id: generateId(), order: maxOrder + 1 };
    const updated = [...banners, newBanner];
    setBanners(updated);
    persist("lipoimports_banners", updated);
  };

  const updateBanner = (id: string, banner: Partial<Banner>) => {
    const updated = banners.map((b) => (b.id === id ? { ...b, ...banner } : b));
    setBanners(updated);
    persist("lipoimports_banners", updated);
  };

  const deleteBanner = (id: string) => {
    const updated = banners.filter((b) => b.id !== id);
    setBanners(updated);
    persist("lipoimports_banners", updated);
  };

  const reorderBanners = (orderedIds: string[]) => {
    const updated = banners.map(b => ({
      ...b,
      order: orderedIds.indexOf(b.id)
    }));
    setBanners(updated);
    persist("lipoimports_banners", updated);
  };

  return (
    <StoreDataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        subCategories,
        addSubCategory,
        updateSubCategory,
        deleteSubCategory,
        videoTestimonials,
        addVideo,
        updateVideo,
        deleteVideo,
        orders,
        addOrder,
        updateOrder,
        paymentMethods,
        updatePaymentMethod,
        shippingIntegrations,
        updateShippingIntegration,
        banners,
        addBanner,
        updateBanner,
        deleteBanner,
        reorderBanners,
      }}
    >
      {children}
    </StoreDataContext.Provider>
  );
}

export function useStoreData() {
  const context = useContext(StoreDataContext);
  if (context === undefined) {
    throw new Error("useStoreData must be used within a StoreDataProvider");
  }
  return context;
}
