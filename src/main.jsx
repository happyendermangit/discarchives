import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CollectiblesPage from './collectibles'
import HomePage from './home'
import QuestsPage from './quests'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage
  },
  {
    path: "/collectibles",
    Component: CollectiblesPage
  },
  {
    path: "/quests",
    Component: QuestsPage
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
