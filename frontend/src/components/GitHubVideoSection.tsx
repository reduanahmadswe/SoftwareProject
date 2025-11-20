const GitHubVideoSection = () => {
  return (
    <section className="py-16 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Don't Have a GitHub Account?
            </h2>
            <p className="text-blue-100">
              Watch this quick tutorial to create your GitHub account in minutes
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/20">
            {/* YouTube Video Embed */}
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/QUtk-Uuq9nE"
                title="How to Create a GitHub Account"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Alternative Links */}
            <div className="p-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://github.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                >
                  Create GitHub Account
                </a>
                <a
                  href="https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 text-white hover:bg-white/30 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border border-white/30 text-center"
                >
                  Read Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GitHubVideoSection
