import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Abordagem from './components/sections/Abordagem'
import Servicos from './components/sections/Servicos'
import CTA from './components/sections/CTA'
import Contato from './components/sections/Contato'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Header />

      <main>
        <Hero />
        <About />
        <Abordagem />
        <Servicos />
        <CTA />
        <Contato />
      </main>

      <Footer />
    </>
  )
}

export default App
