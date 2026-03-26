const AuthHeader = ({ isSignUp }: { isSignUp: boolean }) => {
  return (
    <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
            <img
              src="/logo_ifloweru.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome to IflowerU
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
