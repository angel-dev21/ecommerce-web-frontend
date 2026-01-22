import { Routes, Route } from "react-router";
import Home from "./routes/Home.tsx";
import Products from "./routes/Products.tsx";
import Cart from "./routes/Cart.tsx";
import Account from "./routes/Account.tsx";
import SignUp from "./routes/SignUp.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
