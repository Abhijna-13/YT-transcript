import AuthPanel from '../components/AuthPanel'
import CursorGlow from '../components/CursorGlow'
import DashboardPreview from '../components/DashboardPreview'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import SecuritySection from '../components/SecuritySection'
import TranscriptDemo from '../components/TranscriptDemo'

export default function LandingPage() {
  return (
    <main className="relative">
      <CursorGlow />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TranscriptDemo />
      <DashboardPreview />
      <SecuritySection />
      <AuthPanel />
      <Footer />
    </main>
  )
}
