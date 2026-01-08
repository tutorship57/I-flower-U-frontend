import React from 'react'
import InputField from '../InputField'

interface AuthFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSignUp:boolean;
    formData:{
        email:string;
        password:string;
        name:string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        email: string;
        password: string;
        name: string;
    }>>;
}
const AuthForm = ({handleSubmit,isSignUp,formData,setFormData}:AuthFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <InputField
                    label="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Edward Johnson"
                    required={true}
                  />
                )}
                <InputField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  required={true}
                />
    
                <InputField
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  required={true}
                />
    
                {!isSignUp && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-rose-500 hover:text-rose-600"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
    
                <button
                  type="submit"
                  className="w-full py-4 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition font-semibold text-lg shadow-lg"
                >
                  {isSignUp ? "Create Account" : "Login"}
                </button>
              </form>
  )
}

export default AuthForm
