import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './store/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          className="toastBody"
        />
      </BrowserRouter>
  </AuthProvider>
)

