import React, { useState } from "react";
import AuthForm from "../../components/Auth/AuthForm";
import AuthHeader from "../../components/Auth/AuthHeader";
import AuthFooter from"../../components/Auth/AuthFooter";
import { useNavBarStore } from "../../stores/navbar-store";
const LoginPage = () => {
  const {setCurrentPage} = useNavBarStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage("home");
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-pink-50 to-rose-50 py-12 px-4">
          <div className="max-w-md mx-auto ">
            <AuthHeader isSignUp={isSignUp} />
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <AuthForm
                handleSubmit={handleSubmit}
                isSignUp={isSignUp}
                formData={formData}
                setFormData={setFormData}
              />
              <AuthFooter isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
            </div>
          </div>
    </div>
  );
};

export default LoginPage;
