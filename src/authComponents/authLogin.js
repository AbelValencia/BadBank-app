import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/context";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError('We sent you an email. Check your inbox')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card 
        bgcolor = "dark"
        header= "Login"
        body= {(
          <>
            <div>
            {error && <Alert message={error} />}

            <form
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="youremail@company.tld"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="*************"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                >
                  Sign In
                </button>
                <a
                  href="#!"
                  onClick={handleResetPassword}
                >
                  Forgot Password?
                </a>
              </div>
            </form>
            <button
              onClick={handleGoogleSignin}
            >
              Google login
            </button>
            <p>
              Don't have an account?
              <Link to="/register">
                Register
              </Link>
            </p>
          </div>
          </>
        )}
        />
      );
    
}