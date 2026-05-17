import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const defaultProducts = [
  { id: 1, name: "Orange Cream", price: 199.00, image: "/images/i1.png", stock: 15, seller: "Coca-Cola Co." },
  { id: 2, name: "Coke Lime", price: 199.00, image: "/images/i2.png", stock: 20, seller: "Coca-Cola Co." },
  { id: 3, name: "Coke Raspberry", price: 249.00, image: "/images/i3.png", stock: 10, seller: "Coca-Cola Co." },
  { id: 4, name: "Coke Mango", price: 249.00, image: "/images/i4.png", stock: 5, seller: "Coca-Cola Co." },
  { id: 5, name: "Cherry Coke", price: 199.00, image: "/images/i5.png", stock: 25, seller: "Coca-Cola Co." },
  { id: 6, name: "Coke Apple", price: 299.00, image: "/images/i6.png", stock: 8, seller: "Coca-Cola Co." }
];

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('cocaColaProducts');
    return saved ? JSON.parse(saved) : defaultProducts;
  });
  
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cocaColaCart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cocaColaProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cocaColaCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  }

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const addProduct = (newProduct) => {
    setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
  };

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{ products, cart, addToCart, removeFromCart, updateProduct, addProduct, removeProduct }}>
      {children}
    </AppContext.Provider>
  );
};
