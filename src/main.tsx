import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from './App'
import theme from './config/theme'
import { Home } from './components/home/Home'
import { Game } from './components/game/Game';
import { Leaderboard } from './components/leaderboard/Leaderboard';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path='game' element={<Game />} />
            <Route path='leaderboard' element={<Leaderboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
