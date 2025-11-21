import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { registrationSchema, type RegistrationFormData } from '../utils/validation'
import { api } from '../api/client'
import { Loader2, CheckCircle2 } from 'lucide-react'
import SuccessModal from './SuccessModal'

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [registeredName, setRegisteredName] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  })

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setIsSubmitting(true)
      setError(null)

      await api.register(data)

      // Show success modal instead of navigating
      setRegisteredName(data.name)
      setShowSuccessModal(true)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
      console.error('Registration error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        name={registeredName}
      />
      <section id="registration-form" className="py-16 md:py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Register Now
              </h2>
              <p className="text-blue-100 text-lg md:text-xl">
                Fill out the form below to join the workshop
              </p>
            </div>

            <div className="w-full max-w-3xl mx-auto bg-gradient-to-tr from-[#975af4] via-[#2f7cf8] to-[#934cff] p-1 rounded-[32px] flex flex-col">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full bg-[#161a20] rounded-[30px] text-[#bab9b9] text-base md:text-lg flex flex-col gap-0">
                {/* Name Field */}

                {/* University ID Field */}
                {/* Registration Closed Banner (optional, remove if not needed) */}
                {/* <div className="w-full text-center py-4 text-2xl font-bold text-red-500">Registration Closed</div> */}
                <div className="w-full border-b-2 border-[#2563eb] px-6 pt-8 pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#2563eb] text-white font-bold">1</span>
                    <span className="text-lg md:text-xl font-semibold text-white">Personal Information</span>
                  </div>
                </div>
                <div className="w-full px-6 pt-6 pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-1">
                      <span className="font-semibold text-[#bab9b9] text-base mb-1">Full Name <span className="text-red-500">*</span></span>
                      <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className="input bg-[#181f32] text-white w-full p-4 rounded-lg border border-[#232b45] focus:border-[#2563eb] outline-none text-base md:text-lg"
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-semibold text-[#bab9b9] text-base mb-1">Student ID <span className="text-red-500">*</span></span>
                      <input
                        id="universityId"
                        type="text"
                        {...register('universityId')}
                        className="input bg-[#181f32] text-white w-full p-4 rounded-lg border border-[#232b45] focus:border-[#2563eb] outline-none text-base md:text-lg"
                        placeholder="235-35-016"
                      />
                      {errors.universityId && <p className="text-xs text-red-400 mt-1">{errors.universityId.message}</p>}
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-semibold text-[#bab9b9] text-base mb-1">Current Semester <span className="text-red-500">*</span></span>
                      <select
                        id="semester"
                        {...register('semester')}
                        className="input bg-[#181f32] text-white w-full p-4 rounded-lg border border-[#232b45] focus:border-[#2563eb] outline-none text-base md:text-lg"
                      >
                        <option value="">Select semester</option>
                        <option value="1st Semester">1st Semester</option>
                        <option value="2nd Semester">2nd Semester</option>
                        <option value="3rd Semester">3rd Semester</option>
                        <option value="4th Semester">4th Semester</option>
                        <option value="5th Semester">5th Semester</option>
                        <option value="6th Semester">6th Semester</option>
                        <option value="7th Semester">7th Semester</option>
                        <option value="8th Semester">8th Semester</option>
                        <option value="9th Semester">9th Semester</option>
                        <option value="10th Semester">10th Semester</option>
                        <option value="11th Semester">11th Semester</option>
                        <option value="12th Semester">12th Semester</option>
                      </select>
                      {errors.semester && <p className="text-xs text-red-400 mt-1">{errors.semester.message}</p>}
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-semibold text-[#bab9b9] text-base mb-1">Batch</span>
                      <input
                        id="batch"
                        type="text"
                        {...register('batch')}
                        className="input bg-[#181f32] text-white w-full p-4 rounded-lg border border-[#232b45] focus:border-[#2563eb] outline-none text-base md:text-lg"
                        placeholder="41"
                      />
                      {errors.batch && <p className="text-xs text-red-400 mt-1">{errors.batch.message}</p>}
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-semibold text-[#bab9b9] text-base mb-1">Email Address (University mail)</span>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="input bg-[#181f32] text-white w-full p-4 rounded-lg border border-[#232b45] focus:border-[#2563eb] outline-none text-base md:text-lg"
                        placeholder="232-35-016@diu.edu.bd"
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-semibold text-[#bab9b9] text-base mb-1">Phone Number(whatsapp)</span>
                      <input
                        id="whatsapp"
                        type="tel"
                        {...register('whatsapp')}
                        className="input bg-[#181f32] text-white w-full p-4 rounded-lg border border-[#232b45] focus:border-[#2563eb] outline-none text-base md:text-lg"
                        placeholder="+8801627******"
                      />
                      {errors.whatsapp && <p className="text-xs text-red-400 mt-1">{errors.whatsapp.message}</p>}
                    </label>
                  </div>
                </div>

                {/* WhatsApp Number Field */}

                {/* Batch Field */}

                {/* GitHub Account Field */}
                <div className="w-full border-b-2 border-[#2563eb] px-6 pt-8 pb-2 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#2563eb] text-white font-bold">2</span>
                    <span className="text-lg md:text-xl font-semibold text-white">Areas of Interest</span>
                  </div>
                </div>
                <div className="w-full px-6 pt-6 pb-2">
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-[#bab9b9] text-base mb-1">GitHub Account <span className="text-red-500">*</span></span>
                    <input
                      id="github"
                      type="text"
                      {...register('github')}
                      className="input bg-[#181f32] text-white w-full p-4 rounded-lg border border-[#232b45] focus:border-[#2563eb] outline-none text-base md:text-lg"
                      placeholder="username or https://github.com/username"
                    />
                    {errors.github && <p className="text-xs text-red-400 mt-1">{errors.github.message}</p>}
                    <p className="text-xs text-blue-200 mt-2">
                      Don't have a GitHub account?{' '}
                      <a
                        href="https://github.com/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-200 underline font-medium transition-colors duration-300"
                      >
                        Create one here
                      </a>
                    </p>
                  </label>
                </div>



                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-400/40 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm mx-6">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="w-full px-6 pb-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-gradient-to-tr from-[#975af4] via-[#2f7cf8] to-[#934cff] p-0.5 rounded-[16px] transition-all duration-300 hover:scale-105 active:scale-100 shadow-lg group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="block w-full h-full bg-[#181f32] rounded-[14px] py-3 md:py-4 text-lg md:text-xl font-bold text-white tracking-wide text-center group-hover:bg-[#232b45] transition-colors duration-300">
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin w-5 h-5" /> Registering...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400" /> Complete Registration
                        </span>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RegistrationForm
