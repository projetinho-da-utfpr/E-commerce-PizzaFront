import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Produto from './paginas/produto/produto.jsx'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import { PizzaContextProvider } from './context/pizzascontext.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />
},
{
  path: '/pizza',
  element: <Produto />
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PizzaContextProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </PizzaContextProvider>

  </React.StrictMode>,
)
