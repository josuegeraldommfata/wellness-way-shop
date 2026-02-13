import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Product, Category, VideoTestimonial, Banner } from "@/data/mockData";
import { getAuthHeaders } from "@/contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
  type: "mercadopago" | "pix" | "boleto" | "credit_card" | "stripe" | "paypal" | "pagseguro";
  enabled: boolean;
  config: Record<string, string>;
}

export interface ShippingIntegration {
  id: string;
  name: string;
  type: "melhor_envio" | "correios" | "jadlog" | "azul_cargo" | "loggi" | "total_express";
  enabled: boolean;
  config: Record<string, string>;
}

interface StoreDataContextType {
  // Products
  products: Product[];
  loadingProducts: boolean;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  refreshProducts: () => Promise<void>;

  // Categories
  categories: Category[];
  loadingCategories: boolean;
  addCategory: (category: Omit<Category, "id">) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  refreshCategories: () => Promise<void>;

  // Subcategories
  subCategories: SubCategory[];
  addSubCategory: (subCategory: Omit<SubCategory, "id">) => void;
  updateSubCategory: (id: string, subCategory: Partial<SubCategory>) => void;
  deleteSubCategory: (id: string) => void;

  // Videos
  videoTestimonials: VideoTestimonial[];
  loadingVideos: boolean;
  addVideo: (video: Omit<VideoTestimonial, "id">) => Promise<void>;
  updateVideo: (id: string, video: Partial<VideoTestimonial>) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  refreshVideos: () => Promise<void>;

  // Orders
  orders: Order[];
  loadingOrders: boolean;
  addOrder: (order: Omit<Order, "id" | "createdAt">) => Promise<void>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>;
  refreshOrders: () => Promise<void>;

  // Payment Methods
  paymentMethods: PaymentMethod[];
  updatePaymentMethod: (id: string, config: Partial<PaymentMethod>) => Promise<void>;

  // Shipping
  shippingIntegrations: ShippingIntegration[];
  updateShippingIntegration: (id: string, config: Partial<ShippingIntegration>) => Promise<void>;

  // Banners
  banners: Banner[];
  loadingBanners: boolean;
  addBanner: (banner: Omit<Banner, "id" | "order">) => Promise<void>;
  updateBanner: (id: string, banner: Partial<Banner>) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  reorderBanners: (orderedIds: string[]) => Promise<void>;
  refreshBanners: () => Promise<void>;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

const generateId = () => Math.random().toString(36).substring(2, 9);

// Default payment methods (fallback)
const defaultPaymentMethods: PaymentMethod[] = [
  { id: "pm-1", name: "Mercado Pago", type: "mercadopago", enabled: false, config: { publicKey: "", accessToken: "" } },
  { id: "pm-2", name: "PIX", type: "pix", enabled: true, config: { pixKey: "", pixName: "LipoImports" } },
  { id: "pm-3", name: "Stripe", type: "stripe", enabled: false, config: { publishableKey: "", secretKey: "" } },
  { id: "pm-4", name: "PayPal", type: "paypal", enabled: false, config: { clientId: "", clientSecret: "", sandboxMode: "true" } },
  { id: "pm-5", name: "PagSeguro", type: "pagseguro", enabled: false, config: { email: "", token: "", sandboxMode: "true" } },
];

// Default shipping integrations (fallback)
const defaultShippingIntegrations: ShippingIntegration[] = [
  { id: "ship-1", name: "Melhor Envio", type: "melhor_envio", enabled: false, config: { token: "", sandboxMode: "true" } },
  { id: "ship-2", name: "Correios", type: "correios", enabled: true, config: {} },
  { id: "ship-3", name: "JadLog", type: "jadlog", enabled: false, config: { apiKey: "", sandboxMode: "true" } },
  { id: "ship-4", name: "Azul Cargo", type: "azul_cargo", enabled: false, config: { clientId: "", clientSecret: "", sandboxMode: "true" } },
  { id: "ship-5", name: "Loggi", type: "loggi", enabled: false, config: { apiKey: "", sandboxMode: "true" } },
  { id: "ship-6", name: "Total Express", type: "total_express", enabled: false, config: { username: "", password: "", sandboxMode: "true" } },
];

export function StoreDataProvider({ children }: { children: ReactNode }) {
  // Products - from API
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Categories - from API
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Subcategories - localStorage (no backend endpoint for these yet)
  const [subCategories, setSubCategories] = useState<SubCategory[]>(() => {
    const stored = localStorage.getItem("lipoimports_subcategories");
    return stored ? JSON.parse(stored) : [];
  });

  // Videos - from API
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  // Orders - from API
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Payment Methods - localStorage with API fallback
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    const stored = localStorage.getItem("lipoimports_payments");
    return stored ? JSON.parse(stored) : defaultPaymentMethods;
  });

  // Shipping - localStorage with API fallback
  const [shippingIntegrations, setShippingIntegrations] = useState<ShippingIntegration[]>(() => {
    const stored = localStorage.getItem("lipoimports_shipping");
    return stored ? JSON.parse(stored) : defaultShippingIntegrations;
  });

  // Banners - from API
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingBanners, setLoadingBanners] = useState(true);

  // === FETCH FUNCTIONS ===

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos da API:', error);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias da API:', error);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/videos`);
      if (response.ok) {
        const data = await response.json();
        setVideoTestimonials(data);
      }
    } catch (error) {
      console.error('Erro ao carregar videos da API:', error);
    } finally {
      setLoadingVideos(false);
    }
  }, []);

  const fetchBanners = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/banners`);
      if (response.ok) {
        const data = await response.json();
        setBanners(data);
      }
    } catch (error) {
      console.error('Erro ao carregar banners da API:', error);
    } finally {
      setLoadingBanners(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos da API:', error);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  // Load all data from API on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchVideos();
    fetchBanners();
    fetchOrders();
  }, [fetchProducts, fetchCategories, fetchVideos, fetchBanners, fetchOrders]);

  // === PRODUCTS (API) ===

  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(product),
      });
      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(product),
      });
      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  // === CATEGORIES (API) ===

  const addCategory = async (category: Omit<Category, "id">) => {
    try {
      const response = await fetch(`${API_URL}/api/categories`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(category),
      });
      if (response.ok) {
        await fetchCategories();
      }
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    try {
      const response = await fetch(`${API_URL}/api/categories/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(category),
      });
      if (response.ok) {
        await fetchCategories();
      }
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        await fetchCategories();
      }
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
    }
  };

  // === SUBCATEGORIES (localStorage - no backend endpoint) ===

  const persist = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

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

  // === VIDEOS (API) ===

  const addVideo = async (video: Omit<VideoTestimonial, "id">) => {
    try {
      const response = await fetch(`${API_URL}/api/videos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(video),
      });
      if (response.ok) {
        await fetchVideos();
      }
    } catch (error) {
      console.error('Erro ao criar video:', error);
    }
  };

  const updateVideo = async (id: string, video: Partial<VideoTestimonial>) => {
    try {
      const response = await fetch(`${API_URL}/api/videos/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(video),
      });
      if (response.ok) {
        await fetchVideos();
      }
    } catch (error) {
      console.error('Erro ao atualizar video:', error);
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/videos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        await fetchVideos();
      }
    } catch (error) {
      console.error('Erro ao deletar video:', error);
    }
  };

  // === ORDERS (API) ===

  const addOrder = async (order: Omit<Order, "id" | "createdAt">) => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(order),
      });
      if (response.ok) {
        await fetchOrders();
      }
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  };

  const updateOrder = async (id: string, order: Partial<Order>) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(order),
      });
      if (response.ok) {
        await fetchOrders();
      }
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
    }
  };

  // === PAYMENT METHODS ===

  const updatePaymentMethod = async (id: string, config: Partial<PaymentMethod>) => {
    try {
      const response = await fetch(`${API_URL}/api/settings/payments/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(config),
      });

      if (response.ok) {
        const updatedMethod = await response.json();
        const updated = paymentMethods.map((p) => (p.id === id ? updatedMethod : p));
        setPaymentMethods(updated);
        persist("lipoimports_payments", updated);
      } else {
        // Fallback local
        const updated = paymentMethods.map((p) => (p.id === id ? { ...p, ...config } : p));
        setPaymentMethods(updated);
        persist("lipoimports_payments", updated);
      }
    } catch (error) {
      console.error('Error updating payment method:', error);
      const updated = paymentMethods.map((p) => (p.id === id ? { ...p, ...config } : p));
      setPaymentMethods(updated);
      persist("lipoimports_payments", updated);
    }
  };

  // === SHIPPING ===

  const updateShippingIntegration = async (id: string, config: Partial<ShippingIntegration>) => {
    try {
      const response = await fetch(`${API_URL}/api/settings/shipping/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(config),
      });

      if (response.ok) {
        const updated = shippingIntegrations.map((s) => (s.id === id ? { ...s, ...config } : s));
        setShippingIntegrations(updated);
        persist("lipoimports_shipping", updated);
      } else {
        const updated = shippingIntegrations.map((s) => (s.id === id ? { ...s, ...config } : s));
        setShippingIntegrations(updated);
        persist("lipoimports_shipping", updated);
      }
    } catch (error) {
      console.error('Error updating shipping integration:', error);
      const updated = shippingIntegrations.map((s) => (s.id === id ? { ...s, ...config } : s));
      setShippingIntegrations(updated);
      persist("lipoimports_shipping", updated);
    }
  };

  // === BANNERS (API) ===

  const addBanner = async (banner: Omit<Banner, "id" | "order">) => {
    try {
      const response = await fetch(`${API_URL}/api/banners`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(banner),
      });
      if (response.ok) {
        await fetchBanners();
      }
    } catch (error) {
      console.error('Erro ao criar banner:', error);
    }
  };

  const updateBanner = async (id: string, banner: Partial<Banner>) => {
    try {
      const response = await fetch(`${API_URL}/api/banners/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(banner),
      });
      if (response.ok) {
        await fetchBanners();
      }
    } catch (error) {
      console.error('Erro ao atualizar banner:', error);
    }
  };

  const deleteBanner = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/banners/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        await fetchBanners();
      }
    } catch (error) {
      console.error('Erro ao deletar banner:', error);
    }
  };

  const reorderBanners = async (orderedIds: string[]) => {
    try {
      const response = await fetch(`${API_URL}/api/banners/reorder`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ orderedIds }),
      });
      if (response.ok) {
        await fetchBanners();
      }
    } catch (error) {
      console.error('Erro ao reordenar banners:', error);
    }
  };

  return (
    <StoreDataContext.Provider
      value={{
        products,
        loadingProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts: fetchProducts,
        categories,
        loadingCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        refreshCategories: fetchCategories,
        subCategories,
        addSubCategory,
        updateSubCategory,
        deleteSubCategory,
        videoTestimonials,
        loadingVideos,
        addVideo,
        updateVideo,
        deleteVideo,
        refreshVideos: fetchVideos,
        orders,
        loadingOrders,
        addOrder,
        updateOrder,
        refreshOrders: fetchOrders,
        paymentMethods,
        updatePaymentMethod,
        shippingIntegrations,
        updateShippingIntegration,
        banners,
        loadingBanners,
        addBanner,
        updateBanner,
        deleteBanner,
        reorderBanners,
        refreshBanners: fetchBanners,
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
