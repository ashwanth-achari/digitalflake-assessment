import React from "react";

function Navbar() {
  return (
    <div className="bg-[#662671] ">
      <nav className="flex items-center justify-between px-12 py-5">
        <img src="/src/assets/nav-logo 9.png" alt="logo" className="h-8" />
        <img
          src="/src/assets/nav-user-icon.png"
          alt="user-icon"
          className="h-8"
        />
      </nav>
    </div>
  );
}

export default Navbar;
