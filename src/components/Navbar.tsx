import { Link } from "react-router";
import { FaShoppingCart, FaUser, FaReact } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { useState } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOnClickOutside(() => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <nav className="w-full h-full p-8 flex flex-row justify-between items-center bg-brand text-surface font-semibold">
      <div className="flex flex-row gap-4 text-lg ">
        <Link to="/">
          <FaReact className="hover:text-white" aria-label="Home" size={48} />
        </Link>
        <div className="sm:flex hidden">
          <Link
            to="/Products"
            aria-label="Products"
            className="hover:text-white p-2"
          >
            Products
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center gap-8">
        <input
          className="h-8 p-2 w-44 sm:w-56 bg-brand-light rounded-full focus:outline-none focus:ring-2 focus:ring-surface focus:text-surface placeholder:text-gray placeholder:w-20"
          type="text"
          id="product-search"
          placeholder="Search"
          aria-label="Search"
        ></input>
        <div className="sm:flex flex-row gap-8 hidden">
          <Link to="/Cart">
            <FaShoppingCart
              className="hover:text-white"
              aria-label="Cart"
              size={32}
            />
          </Link>
          <Link to="/Account">
            <FaUser
              className="hover:text-white"
              aria-label="Account"
              size={32}
            />
          </Link>
        </div>
      </div>
      <div ref={ref} className="sm:hidden">
        <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <IoMenu aria-label="Menu" size={48} />
        </button>
        {isOpen && (
          <div className="absolute top-30 right-0 h-auto w-full bg-surface-dark">
            <div className="flex flex-col">
              <Link
                to="/Products"
                aria-label="Products"
                className="text-black p-5"
              >
                <AiFillProduct />
                Products
              </Link>
              <hr />
              <Link to="/Cart" aria-label="Cart" className="text-black p-5">
                <FaShoppingCart />
                Cart
              </Link>
              <hr />
              <Link
                to="/Account"
                aria-label="Account"
                className="text-black p-5"
              >
                <FaUser />
                Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
