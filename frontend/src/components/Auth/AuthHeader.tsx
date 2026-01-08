import React from 'react'

const AuthHeader = ({ isSignUp }: { isSignUp: boolean }) => {
  return (
    <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-4xl">🌸</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome to Blooming Dreams
          </h1>
          <p className="text-gray-600">
            {isSignUp
              ? "Create your account to get started"
              : "Login to your account"}
          </p>
    </div>
  )
}

export default AuthHeader
