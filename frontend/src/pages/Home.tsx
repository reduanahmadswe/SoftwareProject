import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import GitHubVideoSection from '../components/GitHubVideoSection'
import RegistrationForm from '../components/RegistrationForm'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Azure Depths Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <div className="pt-16">
          <Hero />
          <About />
          <GitHubVideoSection />
          <RegistrationForm />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home
