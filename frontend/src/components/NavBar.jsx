import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Mechanical Tool Fittings"); // default active
  const drawerRef = useRef(null);

  const navItems = [
    "Mechanical Tool Fittings",
    "Hydraulic Tools and Supplies",
    "Spare Parts",
    "Automotive Supplies",
    "Chains and Ropes",
    "New Arrivals",
  ];

  // Close drawer when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    }
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

  const Logo = () => (
    <div className="flex items-center gap-0">
      <div className="p-1 mr-0">
        <div className="bg-blue-900 px-2 py-1 text-white font-bold text-lg rounded-lg shadow-lg shadow-blue-500/80">
          ED
        </div>
      </div>
      <div className="p-1 ml-0">
        <div className="bg-black px-2 py-1 text-white font-bold text-lg rounded-lg shadow-lg shadow-blue-500/80">
          E
        </div>
      </div>
    </div>
  );

  return (
    <div className="navbar bg-base-100  fixed top-0 left-0 right-0 z-50 px-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]">
      {/* Left section: Logo + Nav items (desktop) */}
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">{Logo()}</a>

        {/* Nav items left-aligned */}
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                className={activeItem === item ? "active font-semibold" : ""}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right section */}
      <div className="flex-none gap-2">
        {/* Cart Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 
                     13l-2.293 2.293c-.63.63-.184 
                     1.707.707 1.707H17m0 0a2 2 0 
                     100 4 2 2 0 000-4zm-8 2a2 2 0 
                     11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="btn btn-ghost"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div
          ref={drawerRef}
          className="absolute top-16 right-2 w-64 bg-base-200 shadow-xl z-50 p-4 rounded-box animate-slideIn"
        >
          <ul className="menu menu-vertical gap-3">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  className={`rounded-lg p-3 transition-all ${
                    activeItem === item
                      ? "active bg-primary text-primary-content font-bold shadow-md"
                      : "hover:bg-base-300"
                  }`}
                  onClick={() => {
                    setActiveItem(item);
                    setIsDrawerOpen(false); // close drawer when clicked
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
