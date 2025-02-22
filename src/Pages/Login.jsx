import { useContext, useState } from "react";
import { BiSolidLogInCircle } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../providers/AuthProvider";
// import Swal from "sweetalert2";
import axios from "axios";
import AuthContext from "../AuthContext/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithEmailPassword } = useContext(AuthContext);
  const [hidePassword, setHidePassword] = useState(true);
  const from = location?.state?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = await result.user;
      toast.success(`${user?.displayName} is successfully logged in via Google`)
     
      // Swal.fire({
      //   position: "center",
      //   icon: "success",
      //   title: `${user?.displayName} is successfully logged in via Google`,
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
      navigate(from, { replace: true });

      // Prepare data for saving in the database
      const userData = {
        userID: user?.uid,
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        createdAt: new Date().toISOString(),
      };

      // Insert user data in the database
      await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData);
    } catch (error) {
      toast.error(error.response?.data?.message ||
        error.message ||
        "Something went wrong")
      // Swal.fire({
      //   position: "center",
      //   icon: "error",
      //   title:
      //     error.response?.data?.message ||
      //     error.message ||
      //     "Something went wrong",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
    }
  };

  const handleLoginWithEmailPass = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Log in an user
      const userCredential = await loginWithEmailPassword(email, password);
      const user = userCredential.user;

      if (user) {
        e.target.reset();
        toast.success(`${user?.displayName} is successfully logged in`)

        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: `${user?.displayName} is successfully logged in`,
        //   showConfirmButton: false,
        //   timer: 3000,
        // });
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message ||
        error.message ||
        "Something went wrong")
      // Swal.fire({
      //   position: "center",
      //   icon: "error",
      //   title:
      //     error.response?.data?.message ||
      //     error.message ||
      //     "Something went wrong",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
    }
  };

  return (
    <div>
      <h2 className="w-4/5 mx-auto md:text-4xl text-3xl font-bold pt-14 text-center">
        Login Form!
      </h2>
      <div className="md:w-full w-11/12 mx-auto flex justify-center items-center pt-4 pb-12">
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-md border border-gray-300">
        <div>
              <button
                onClick={handleGoogleLogin}
                className="btn w-full flex gap-3 justify-center items-center"
              >
                <FcGoogle className="text-2xl" />
                <span className="text-base text-gray-800 font-bold">
                  Login with Google
                </span>
              </button>
            </div>
            <div className="divider text-gray-600 font-medium">
              Or Login with Email
            </div>
          <form onSubmit={handleLoginWithEmailPass} className="card-body">
              <fieldset className="fieldset">
              <label className="fieldset-label">
                <span className="font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Type your Email"
                className="input w-full"
                required
              />
            </fieldset>
            <fieldset className="fieldset relative">
              <label className="fieldset-label">
                <span className="font-bold">Password</span>
              </label>
              <input
                type={hidePassword ? "password" : "text"}
                name="password"
                placeholder="Type your Password"
                className="input w-full"
                required
              />
              <button
                onClick={() => setHidePassword(!hidePassword)}
                className="absolute btn btn-xs top-9 right-3"
                type="button"
              >
                {hidePassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </fieldset>
            <div className="mt-4">
              <button type="submit" className="w-full flex gap-2 items-center btn bg-indigo-500 hover:bg-indigo-700 text-base text-white font-bold">
                <span>Login Now</span>
                <BiSolidLogInCircle className="text-xl" />
              </button>
            </div>
          </form>

          <p className="text-gray-700 font-semibold pb-8 text-center">
            If you are new in this site? Please{" "}
            <Link to="/register" className="text-rose-500 font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



