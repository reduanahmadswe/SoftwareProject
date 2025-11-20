import { Github, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const scrollToSection = (sectionId: string) => {
        if (location.pathname !== '/') {
            window.location.href = `/#${sectionId}`
        } else {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
        setIsMenuOpen(false)
    }

    const navLinks = [
        { name: 'Home', sectionId: 'hero' },
        { name: 'About', sectionId: 'about' },
        { name: 'Register', sectionId: 'registration-form' },
    ]

    return (
        <nav className="bg-white/10 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo - scroll to Hero section on click */}
                    <button
                        className="flex items-center space-x-2 focus:outline-none"
                        onClick={() => scrollToSection('hero')}
                        style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
                        aria-label="Go to Hero section"
                    >
                        <Github className="w-8 h-8 text-blue-300" />
                        <span className="text-xl font-bold text-white">
                            Git & GitHub Workshop
                        </span>
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.sectionId!)}
                                className="text-blue-100 hover:text-white font-medium transition-colors"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/10"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-white/10">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.sectionId!)}
                                    className="text-left text-blue-100 hover:text-white font-medium transition-colors"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
