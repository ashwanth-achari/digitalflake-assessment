import React, { useState } from "react";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import bgImage from "/src/assets/home-bg.png";
import logo from "/src/assets/home-logo.png";
import eyeIcon from "/src/assets/hide-show.png";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { storeTokenInLS, API } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const URL = `${API}/api/auth/login`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(URL, options);
      const res_Data = await response.json();
      console.log("response data from login ", res_Data);

      if (response.ok) {
        storeTokenInLS(res_Data.token);
        setUser({ email: "", password: "" });
        toast.success("Login Successfull");
        navigate("/");
      } else {
        toast.error(
          res_Data.message ? res_Data.message : res_Data.extraDetails
        );
      }
    } catch (error) {
      console.log("login", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-start bg-contain bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-[#5C218B]/25"></div>
      <div className="relative z-10 bg-white w-120 rounded-xl shadow-lg px-8 py-15 flex flex-col gap-15 ml-65">
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="Digitalflake logo" className="h-20" />
          <p className="text-gray-500 text-sm">Welcome to Digitalflake admin</p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-600">
              Email-id
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              required
              autoComplete="off"
              value={user.email}
              onChange={handleInput}
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-purple-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
                className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none focus:border-purple-600"
              />
              <img
                src={eyeIcon}
                alt="show password"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 cursor-pointer opacity-60"
              />
            </div>
          </div>
          <p className="text-right text-sm text-purple-700 cursor-pointer">
            Forgot Password?
          </p>
          <button
            type="submit"
            className="mt-2 bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
