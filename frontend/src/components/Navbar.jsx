import React from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#662671] ">
      <nav className="flex items-center justify-between px-12 py-5">
        <img src="/src/assets/nav-logo 9.png" alt="logo" className="h-8" />
        <div>
          <Popup
            trigger={
              <img
          src="/src/assets/nav-user-icon.png"
          alt="user-icon"
          className="h-8"
        />
            }
            modal
            nested
          >
            {(close) => (
              <div className="bg-white p-6 rounded-lg w-110 text-center shadow-2xl">
                <div className="flex justify-center gap-2">
                  <img
                    className="w-8 h-8"
                    src="/src/assets/delete-danger.png"
                    alt="danger"
                  />
                  <h3 className="text-lg font-extrabold mb-2">Logout</h3>
                </div>
                <p className="text-md text-gray-600 mb-6">
                  Are you sure you want to logout?
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={close}
                    className="px-7 py-2 border border-[#767676] rounded-3xl text-md text-[#767676]"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      close();
                    navigate("/logout");
                    }}
                    className="px-7 py-2 bg-[#662671] text-white rounded-3xl text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
