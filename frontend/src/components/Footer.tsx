import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/40 backdrop-blur-md text-gray-300 py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About Section */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">About This Workshop</h3>
              <p className="text-sm leading-relaxed">
                Learn essential Git and GitHub skills for collaborative software development.
                Master version control, branching strategies, and team workflows.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://git-scm.com/doc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Git Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400 transition-colors"
                  >
                    GitHub Docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Create GitHub Account
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:info@example.com"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <div className="flex flex-col items-center justify-center mb-4">
              <span className="text-gray-400 mb-2 font-medium">Powered by</span>
              <img
                src="/diu_swe_sec_logos.png"
                alt="DIU, SWE Club, SEC Club logos"
                className="h-12 md:h-16 w-auto object-contain mx-auto"
                style={{ maxWidth: '420px' }}
              />
            </div>
            <p>
              © {currentYear} Git & GitHub Workshop. All rights reserved.
            </p>
            <p className="mt-2 text-gray-400">
              Developed by
              <a
                href="https://reduanahmadswe.site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 underline font-semibold transition-colors duration-200 ml-1"
              >
                Reduan Ahmad
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
