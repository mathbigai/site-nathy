import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Approach from './components/sections/Approach'
import Navbar from './components/layout/Navbar'
import WhatsAppFloating from './components/ui/WhatsAppFloating'
import InstagramTimeline from './components/sections/InstagramTimeline'

function App() {
  return (
    <>
      <WhatsAppFloating phone="5565992191866" />
      <Navbar />
      <Header />

      <main>
        <Hero />
        <About />
        <Approach />
        <InstagramTimeline />
      </main>

      <Footer />
    </>
  )
}

export default App
