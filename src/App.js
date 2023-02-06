import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ContentData } from "./Context";
import { useContext } from "react";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("deger")) || []
  );
  const addItem = (item) => {
    setCart([...cart, item]);
  };
  const removeItem = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };
  useEffect(() => {
    localStorage.setItem("deger", JSON.stringify(cart));
  }, [cart]);
  return (
    <ContentData.Provider value={{ addItem, products, cart, removeItem }}>
      <div className="App">
        <Navigation />

        {/* Routelar */}
        <main className="content">
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </main>
      </div>
    </ContentData.Provider>
  );
}

export default App;
