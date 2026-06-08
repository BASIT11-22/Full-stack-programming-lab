import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as productActions from './actions/products';
import * as salesActions from './actions/sales';
import * as ownerActions from './actions/owners';
import * as requestActions from './actions/requests';
import * as settingsActions from './actions/settings';

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  quantity: number;
  storage?: string;
  color?: string;
  category: 'phone' | 'accessory';
}

export interface SaleItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Owner {
  id: string;
  name: string;
  storeName?: string;
  email: string;
  password?: string;
  phone: string;
  subscriptionStatus: 'active' | 'expired' | 'pending';
  joinDate: string;
  lastPaymentDate: string;
  lastPaymentAmount: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
}

export interface AdminSettings {
  email: string;
  password?: string;
  theme: 'light' | 'dark';
  currency: string;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  paymentMethod: 'cash' | 'card' | 'pending';
  timestamp: number;
  customerName?: string;
  pendingAmount?: number;
  dueDate?: string;
}

export interface CredentialRequest {
  id: string;
  ownerId: string;
  ownerName: string;
  newEmail?: string;
  newPassword?: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: number;
}

interface PosStore {
  products: Product[];
  sales: Sale[];
  owners: Owner[];
  requests: CredentialRequest[];
  adminSettings: AdminSettings;
  currentUser: { email: string; role: 'admin' | 'owner'; id?: string; name?: string; storeName?: string } | null;
  
  // Initialization
  initialize: () => Promise<void>;
  
  // Actions
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  recordSale: (sale: Omit<Sale, 'id' | 'timestamp'>) => Promise<void>;
  updateSaleStatus: (id: string, method: 'cash' | 'card') => Promise<void>;
  makePartialPayment: (id: string, amount: number) => Promise<void>;
  addOwner: (owner: Omit<Owner, 'id'>) => Promise<void>;
  updateOwner: (id: string, owner: Partial<Owner>) => Promise<void>;
  deleteOwner: (id: string) => Promise<void>;
  updateProfile: (data: { name?: string; storeName?: string }) => Promise<void>;
  addRequest: (request: Omit<CredentialRequest, 'id' | 'status' | 'timestamp'>) => Promise<void>;
  updateRequestStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  updateAdminSettings: (settings: Partial<AdminSettings>) => Promise<void>;
  
  // Auth
  login: (email: string, password: string) => boolean;
  logout: () => void;
  resetStore: () => void;
}

export const useStore = create<PosStore>()(
  persist(
    (set, get) => ({
      products: [],
      sales: [],
      owners: [],
      requests: [],
      adminSettings: {
        email: 'info@softezm.com',
        password: 'Yaddda123!',
        theme: 'dark',
        currency: 'Rs.',
      },
      currentUser: null,

      initialize: async () => {
        try {
          const [products, sales, owners, requests, settings] = await Promise.all([
            productActions.getProducts(),
            salesActions.getSales(),
            ownerActions.getOwners(),
            requestActions.getRequests(),
            settingsActions.getAdminSettings(),
          ]);

          set({
            products: products as any,
            sales: sales.map(s => ({ ...s, timestamp: s.timestamp.getTime() })) as any,
            owners: owners.map(o => ({ ...o, joinDate: o.joinDate.toISOString(), lastPaymentDate: o.lastPaymentDate.toISOString(), nextPaymentDate: o.nextPaymentDate.toISOString() })) as any,
            requests: requests.map(r => ({ ...r, timestamp: r.timestamp.getTime() })) as any,
            adminSettings: settings ? {
              email: settings.email,
              password: settings.password,
              theme: settings.theme as any,
              currency: settings.currency
            } : get().adminSettings,
          });
        } catch (error) {
          console.error('Store initialization failed:', error);
        }
      },

      addProduct: async (productData) => {
        // Optimistic local update
        const tempId = 'temp-' + Math.random().toString(36).substr(2, 9);
        const newProduct = { ...productData, id: tempId } as Product;
        set((state) => ({ products: [newProduct, ...state.products] }));
        
        try {
          await productActions.addProduct(productData);
          const products = await productActions.getProducts();
          set({ products: products as any });
        } catch (error) {
          console.error('Backend sync failed (addProduct):', error);
          // Keep local state for offline usage
        }
      },

      updateProduct: async (id, updatedProduct) => {
        // Optimistic local update
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)),
        }));

        try {
          await productActions.updateProduct(id, updatedProduct);
          const products = await productActions.getProducts();
          set({ products: products as any });
        } catch (error) {
          console.error('Backend sync failed (updateProduct):', error);
          // Keep local state for offline usage
        }
      },

      deleteProduct: async (id) => {
        // Optimistic local update
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));

        try {
          await productActions.deleteProduct(id);
          const products = await productActions.getProducts();
          set({ products: products as any });
        } catch (error) {
          console.error('Backend sync failed (deleteProduct):', error);
          // Keep local state for offline usage
        }
      },

      recordSale: async (saleData) => {
        await salesActions.recordSale(saleData);
        const [sales, products] = await Promise.all([
          salesActions.getSales(),
          productActions.getProducts()
        ]);
        set({ 
          sales: sales.map(s => ({ ...s, timestamp: s.timestamp.getTime() })) as any,
          products: products as any
        });
      },

      updateSaleStatus: async (id, method) => {
        await salesActions.updateSaleStatus(id, method);
        const sales = await salesActions.getSales();
        set({ sales: sales.map(s => ({ ...s, timestamp: s.timestamp.getTime() })) as any });
      },

      makePartialPayment: async (id, amount) => {
        await salesActions.makePartialPayment(id, amount);
        const sales = await salesActions.getSales();
        set({ sales: sales.map(s => ({ ...s, timestamp: s.timestamp.getTime() })) as any });
      },

      addOwner: async (owner) => {
        await ownerActions.addOwner(owner);
        const owners = await ownerActions.getOwners();
        set({ owners: owners.map(o => ({ ...o, joinDate: o.joinDate.toISOString(), lastPaymentDate: o.lastPaymentDate.toISOString(), nextPaymentDate: o.nextPaymentDate.toISOString() })) as any });
      },

      updateOwner: async (id, owner) => {
        await ownerActions.updateOwner(id, owner);
        const owners = await ownerActions.getOwners();
        set({ owners: owners.map(o => ({ ...o, joinDate: o.joinDate.toISOString(), lastPaymentDate: o.lastPaymentDate.toISOString(), nextPaymentDate: o.nextPaymentDate.toISOString() })) as any });
      },

      deleteOwner: async (id) => {
        await ownerActions.deleteOwner(id);
        const owners = await ownerActions.getOwners();
        set({ owners: owners.map(o => ({ ...o, joinDate: o.joinDate.toISOString(), lastPaymentDate: o.lastPaymentDate.toISOString(), nextPaymentDate: o.nextPaymentDate.toISOString() })) as any });
      },

      updateProfile: async (data) => {
        const { currentUser } = get();
        if (!currentUser?.id) return;
        await ownerActions.updateOwner(currentUser.id, data);
        const owners = await ownerActions.getOwners();
        const updatedOwner = owners.find(o => o.id === currentUser.id);
        set({ 
          owners: owners.map(o => ({ ...o, joinDate: o.joinDate.toISOString(), lastPaymentDate: o.lastPaymentDate.toISOString(), nextPaymentDate: o.nextPaymentDate.toISOString() })) as any,
          currentUser: updatedOwner ? { ...currentUser, ...updatedOwner, joinDate: undefined, lastPaymentDate: undefined, nextPaymentDate: undefined } as any : currentUser
        });
      },

      addRequest: async (request) => {
        await requestActions.addRequest(request);
        const requests = await requestActions.getRequests();
        set({ requests: requests.map(r => ({ ...r, timestamp: r.timestamp.getTime() })) as any });
      },

      updateRequestStatus: async (id, status) => {
        await requestActions.updateRequestStatus(id, status);
        const [requests, owners] = await Promise.all([
          requestActions.getRequests(),
          ownerActions.getOwners()
        ]);
        set({ 
          requests: requests.map(r => ({ ...r, timestamp: r.timestamp.getTime() })) as any,
          owners: owners.map(o => ({ ...o, joinDate: o.joinDate.toISOString(), lastPaymentDate: o.lastPaymentDate.toISOString(), nextPaymentDate: o.nextPaymentDate.toISOString() })) as any
        });
      },

      updateAdminSettings: async (settings) => {
        const { adminSettings, products, sales } = get();
        const oldCurrency = adminSettings.currency;
        const newCurrency = settings.currency;

        await settingsActions.updateAdminSettings(settings);
        const updatedSettings = await settingsActions.getAdminSettings();
        
        if (updatedSettings) {
          const newState: any = {
            adminSettings: {
              email: updatedSettings.email,
              password: updatedSettings.password,
              theme: updatedSettings.theme as any,
              currency: updatedSettings.currency
            }
          };

          // If currency changed, convert all amounts
          if (newCurrency && newCurrency !== oldCurrency) {
            const rates: Record<string, number> = {
              'Rs.': 1,
              '$': 280,
              '€': 300,
              '£': 350,
              '¥': 1.9,
            };

            const oldRate = rates[oldCurrency] || 1;
            const newRate = rates[newCurrency] || 1;
            const conversionFactor = oldRate / newRate;

            newState.products = products.map(p => ({
              ...p,
              price: Number((p.price * conversionFactor).toFixed(2))
            }));

            newState.sales = sales.map(s => ({
              ...s,
              total: Number((s.total * conversionFactor).toFixed(2)),
              subtotal: Number((s.subtotal * conversionFactor).toFixed(2)),
              tax: Number((s.tax * conversionFactor).toFixed(2)),
              discount: Number((s.discount * conversionFactor).toFixed(2)),
              pendingAmount: s.pendingAmount ? Number((s.pendingAmount * conversionFactor).toFixed(2)) : undefined,
              items: s.items.map(item => ({
                ...item,
                price: Number((item.price * conversionFactor).toFixed(2))
              }))
            }));
          }

          set(newState);
        }
      },

      login: (email, password) => {
        const { adminSettings, owners } = get();
        const cleanEmail = email.trim();
        const cleanPassword = password.trim();
        
        if (cleanEmail === 'info@softezm.com' && cleanPassword === 'Yaddda123!') {
          set({ currentUser: { email: cleanEmail, role: 'admin', name: 'Super Admin' } });
          return true;
        }

        if (cleanEmail === adminSettings.email && cleanPassword === adminSettings.password) {
          set({ currentUser: { email: cleanEmail, role: 'admin', name: 'Admin' } });
          return true;
        }
        const owner = owners.find((o) => o.email === email && o.password === password);
        if (owner) {
          set({ currentUser: { email, role: 'owner', id: owner.id, name: owner.name, storeName: owner.storeName } });
          return true;
        }
        return false;
      },
      logout: () => set({ currentUser: null }),
      resetStore: () => set({ products: [], sales: [], owners: [], requests: [], currentUser: null }),
    }),
    {
      name: 'pos-storage',
    }
  )
);
