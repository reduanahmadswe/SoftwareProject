import { CheckCircle, MessageCircle, Mail, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ThankYou = () => {
  const discordInvite = 'https://discord.gg/dt2yS4ET'

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
        <div className="container mx-auto px-4 py-16 pt-24">
          <div className="max-w-3xl mx-auto">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-400/20 rounded-full mb-6 backdrop-blur-sm border border-green-400/30">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Registration Successful!
              </h1>
              <p className="text-xl text-blue-100">
                Thank you for registering for the Git & GitHub workshop
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Email Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border-2 border-blue-400/30 transition-transform duration-200 hover:scale-[1.03] hover:border-blue-400/60 hover:bg-blue-400/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-blue-300" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Check Your Email</h2>
                </div>
                <p className="text-blue-100">
                  A confirmation email has been sent to your registered email address with
                  workshop details and next steps.
                </p>
              </div>

              {/* Discord Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border-2 border-indigo-400/30 transition-transform duration-200 hover:scale-[1.03] hover:border-indigo-400/60 hover:bg-indigo-400/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-400/20 rounded-lg flex items-center justify-center mr-4">
                    <MessageCircle className="w-6 h-6 text-indigo-300" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Join Discord</h2>
                </div>
                <p className="text-blue-100 mb-4">
                  Connect with other participants, ask questions, and stay updated on the
                  latest workshop information.
                </p>
                <a
                  href={discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Join Discord Server
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 mb-8 border border-white/20 transition-transform duration-200 hover:scale-[1.03] hover:border-blue-400/60 hover:bg-blue-400/10">
              <h2 className="text-2xl font-bold text-white mb-6">What's Next?</h2>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-bold mr-4 flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Check your email confirmation
                    </h3>
                    <p className="text-blue-100">
                      Look for our email with workshop schedule and preparation materials
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-bold mr-4 flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Join our Discord community
                    </h3>
                    <p className="text-blue-100">
                      Connect with instructors and fellow participants
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-bold mr-4 flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Set up your GitHub account
                    </h3>
                    <p className="text-blue-100">
                      Make sure your GitHub account is ready for the workshop
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-bold mr-4 flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Install Git on your computer
                    </h3>
                    <p className="text-blue-100">
                      Download and install Git from{' '}
                      <a
                        href="https://git-scm.com/downloads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-200 underline"
                      >
                        git-scm.com
                      </a>
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <a
                href="/"
                className="inline-flex items-center text-blue-300 hover:text-blue-200 font-semibold"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default ThankYou
