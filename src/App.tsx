import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import PortfolioGrid from './components/PortfolioGrid'
import Process from './components/Process'
import Services from './components/Services'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { SEED } from './data/projects'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white selection:bg-gold/30">
      {/* Background video */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4" />
      </div>

      <Navbar />
      <Hero />
      <TrustBar />
      <PortfolioGrid projects={SEED} />
      <Process />
      <Services />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  )
}
