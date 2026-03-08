import React, { useState } from "react";
import AuthForm from "../../components/Auth/AuthForm";
import AuthHeader from "../../components/Auth/AuthHeader";
import AuthFooter from"../../components/Auth/AuthFooter";
import { useNavBarStore } from "../../stores/navbar-store";
import { authService } from "../../services/auth";
import { useAuthStore } from "../../stores/auth-store";
import { useNavigate } from "react-router";
import { useCartStore } from "../../stores/cart-store";
import toastifyService from "../../shared/toastify";

const LoginPage = () => {
  const {setCurrentPage} = useNavBarStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
    user_name: "",
  });
  const Navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerData = {
        user_email: formData.user_email,
        user_password: formData.user_password,
        user_name: formData.user_name,
    }
    const loginData = {
        user_email: formData.user_email,
        user_password: formData.user_password,
    }
    try {
      if (isSignUp) {
      await toastifyService.promise( authService.register(registerData),
      {
        pending: 'Creating your account...',
        success: 'Account Create Successfully !',
        error: 'Account Creation Failed Please Try Again',
      })
      setIsSignUp(false)
    }else{
     await toastifyService.promise( authService.login(loginData),
    {
        pending: 'Login to account ....',
        success: 'Welcome back !',
        error: 'Login Failed Please Try Again',
    }
    )
     await Promise.all([
      useAuthStore.getState().fetchCurrentUser(),
      useCartStore.getState().setCart_id()
     ])
     setCurrentPage("home");
     Navigate("/");
    }
    } catch (error) {
      console.log("Login Error")
      console.log(error);
    }
  };

  return (
    <div className=" min-h-screen  bg-linear-to-br from-pink-50 to-rose-50 py-12 px-4">
          <div className="max-w-md mx-auto nf-fade-1">
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
