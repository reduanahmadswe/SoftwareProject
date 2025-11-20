import { Code2, Users, BookOpen, GitBranch, GitMerge, Terminal, Sparkles } from 'lucide-react'

const About = () => {
    const features = [
        {
            icon: <Code2 className="w-10 h-10" />,
            title: 'Version Control Basics',
            description: 'Learn fundamental Git commands and workflows for tracking code changes effectively.',
        },
        {
            icon: <GitBranch className="w-10 h-10" />,
            title: 'Branching & Merging',
            description: 'Master branching strategies and merge techniques for parallel development.',
        },
        {
            icon: <Users className="w-10 h-10" />,
            title: 'Team Collaboration',
            description: 'Collaborate seamlessly with team members using pull requests and code reviews.',
        },
        {
            icon: <GitMerge className="w-10 h-10" />,
            title: 'Conflict Resolution',
            description: 'Handle merge conflicts confidently and maintain clean code history.',
        },
        {
            icon: <Terminal className="w-10 h-10" />,
            title: 'CLI & Tools',
            description: 'Get comfortable with Git command-line interface and popular Git tools.',
        },
        {
            icon: <BookOpen className="w-10 h-10" />,
            title: 'Best Practices',
            description: 'Follow industry-standard practices for commit messages and workflow patterns.',
        },
    ]

    return (
        <section id="about" className="py-20 bg-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            About This Workshop
                        </h2>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Master the essential skills for modern software development. Learn Git and GitHub
                            from the ground up with hands-on projects and real-world scenarios.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="w-full max-w-[260px] mx-auto bg-gradient-to-tr from-[#975af4] via-[#2f7cf8] to-[#934cff] p-1 rounded-[32px] flex flex-col transition-all duration-300 hover:scale-105 cursor-pointer group"
                            >
                                {/* Card Content Only */}
                                <div className="w-full h-full bg-[#161a20] rounded-[30px] text-[#838383] text-xs p-[18px] flex flex-col gap-3.5">
                                    {/* Icon */}
                                    <div className="text-white transition-transform duration-300 group-hover:scale-110">
                                        {feature.icon}
                                    </div>
                                    {/* Title */}
                                    <p className="font-semibold text-[#bab9b9] text-base">
                                        {feature.title}
                                    </p>
                                    {/* Description */}
                                    <p className="text-[#838383] text-xs leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* What You'll Learn Section - Redesigned as Cards */}
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                        What You'll Learn
                    </h3>
                    <div className="w-full max-w-3xl mx-auto bg-gradient-to-tr from-[#975af4] via-[#2f7cf8] to-[#934cff] p-1 rounded-[32px] flex flex-col transition-all duration-300 hover:scale-105 cursor-pointer group mb-16">
                        <div className="w-full h-full bg-[#161a20] rounded-[30px] text-[#838383] text-xs p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12">
                            {/* Core Concepts */}
                            <div className="flex-1">
                                <p className="font-semibold text-[#bab9b9] text-lg mb-3">Core Concepts</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="text-blue-300 mr-3 text-xl font-bold">✓</span>
                                        <span className="text-[#bab9b9] text-base">Git initialization and repository setup</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-300 mr-3 text-xl font-bold">✓</span>
                                        <span className="text-[#bab9b9] text-base">Staging, committing, and pushing changes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-300 mr-3 text-xl font-bold">✓</span>
                                        <span className="text-[#bab9b9] text-base">Working with remote repositories</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-300 mr-3 text-xl font-bold">✓</span>
                                        <span className="text-[#bab9b9] text-base">Understanding Git history and logs</span>
                                    </li>
                                </ul>
                            </div>
                            {/* Advanced Topics */}
                            <div className="flex-1">
                                <p className="font-semibold text-[#bab9b9] text-lg mb-3">Advanced Topics</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="text-blue-300 mr-3 text-xl font-bold">✓</span>
                                        <span className="text-[#bab9b9] text-base">Feature branching and Git Flow</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-300 mr-3 text-xl font-bold">✓</span>
                                        <span className="text-[#bab9b9] text-base">Pull requests and code reviews</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-300 mr-3 text-xl font-bold">✓</span>
                                        <span className="text-[#bab9b9] text-base">Rebasing and cherry-picking</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-300 mr-3 text-xl font-bold">✓</span>
                                        <span className="text-[#bab9b9] text-base">GitHub Actions and CI/CD basics</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Workshop Details */}
                    <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-300 mb-2">Hands-on</div>
                            <p className="text-blue-100">Practical exercises and real projects</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-300 mb-2">Interactive</div>
                            <p className="text-blue-100">Live coding and Q&A sessions</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-300 mb-2">Free</div>
                            <p className="text-blue-100">No cost, just your time and dedication</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
