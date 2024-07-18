// import React from 'react';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AnimeGallery from './components/AnimeGallery';
function App() {

  return (
    <div className="app-container">
      <main className="max-w-7xl mx-auto bg-[#0F1117]">
        <Hero />
        <AnimeGallery />
        <Footer />
      </main>
    </div>
  )
}

export default App
