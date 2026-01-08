import React from 'react'


const AuthFooter = ({isSignUp, setIsSignUp}:any) => {
  return (
    <>
    <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-gray-600"
            >
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <span className="text-rose-500 font-semibold hover:text-rose-600">
                {isSignUp ? "Login" : "Sign Up"}
              </span>
            </button>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition font-semibold">
                Google
              </button>
              <button className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition font-semibold">
                Facebook
              </button>
            </div>
          </div>
        </>
  )
}

export default AuthFooter
