import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useRegisterModal from "../../hooks/useRegisterModal";
import PopUpModal from "./PopupModal";
import ModalHead from "./ModalHead";
import toast from "react-hot-toast";
import useLoginModal from "../../hooks/useLoginModal";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import InputField from "../popup-modal/InputField";
import { loginUser } from "../../../lib/api/Authen";
import { setCurrentUser } from "../../../lib/redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";  
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth"; 
import { jwtDecode } from "jwt-decode";
import googleLogo from "../../../assets/google.png"; // Import Google logo image


const schema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data) => {
      try{
        setIsLoading(true);
        const result = await dispatch(loginUser(data.email, data.password));
        setIsLoading(false);
       
      // Store token in localStorage (or sessionStorage as in loginUser function)
      if (result.user) {
        dispatch(setCurrentUser(result.user));
        //console.log("User after login:", result);
        //localStorage.setItem("currentUser", JSON.stringify(result));
        toast.success("Login successful !")
        loginModal.onClose();
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Invalid email or password!");
      console.error("Login error:", error);
    }
    },
    [loginModal, dispatch ]
  );

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      const refreshToken = user.stsTokenManager.refreshToken;
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        accessToken: token,
        refreshToken: refreshToken,
      };
      console.log("User Info:", userInfo);
      const response = await fetch(
        `http://localhost:5176/api/v1/users/create-google-user?displayName=${encodeURIComponent(
          user.displayName
        )}&email=${encodeURIComponent(user.email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create Google user");
      }

      const apiResult = await response.json();
      console.log("API Result:", apiResult);

      const jwtToken = apiResult.token;
      const userFromJwt = jwtDecode(jwtToken);
      sessionStorage.setItem("token", jwtToken);
      sessionStorage.setItem("user", JSON.stringify(userFromJwt));

      dispatch(setCurrentUser(userFromJwt));
      toast.success("Google login successful!");
      loginModal.onClose();
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Google login failed!");
    }
  };

  const toogle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal ])


  const handleClickForgotPassword = () => {
    loginModal.onClose();
    navigate("/forgot-password");
  };

  {
    /*----------------RENDER INSIDE MODAL COMPONENT WITH PROPS---------*/
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ModalHead
        title="Welcome back ! "
        subtitle="Login to your account"
      />

      <InputField
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <InputField
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3 ">
      <button onClick={handleGoogleLogin} disabled={isLoading} className="btn-google-login flex items-center justify-center gap-2">
        <img src={googleLogo} alt="Google Logo" className="w-6 h-6" />
        Login with Google
      </button>
      <hr />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Are you new ? </div>
          <div
            onClick={toogle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
      <div className="text-neutral-500 text-center mt-2 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Forgot your password ? </div>
          <div
            onClick={handleClickForgotPassword}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Click here
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PopUpModal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel={isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Login"}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
