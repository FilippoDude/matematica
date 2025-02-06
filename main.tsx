import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'

import MainPage from "./pages/main/mainPage.tsx"

// Importing contexts
import {AppContextProvider} from './contextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Routes>

            <Route path='/' element={<MainPage/>}></Route>

        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
