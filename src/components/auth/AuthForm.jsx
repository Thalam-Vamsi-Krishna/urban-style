import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const checkPasswordInputRef = useRef();

  const sign_up_text = "Don't have an account ?";
  const login_text = "Already have an account ?";

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const forgetPasswordHandler = () => {
    navigate("/forget");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const checkPassword = checkPasswordInputRef.current?.value;
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3jx1GAPRIphdT0G0YGktwbAgH8pdfRh8";
    }
    if (!isLogin && enteredPassword === checkPassword) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3jx1GAPRIphdT0G0YGktwbAgH8pdfRh8";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed !";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken, data.email);
        if (isLogin) {
          alert("Successfully Logged In");
        } else {
          alert("Signed Up Successfully");
        }
        navigate("/", { replace: true });
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-sm w-full p-4">
          <div className="rounded-md p-8 shadow-md">
            <h2 className="text-2xl text-white font-semibold mb-6 text-center  bg-gray-500 rounded-md p-2">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  ref={emailInputRef}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  ref={passwordInputRef}
                  required
                />
              </div>
              {!isLogin && (
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    ref={checkPasswordInputRef}
                    required
                  />
                </div>
              )}
              <div
                className={`flex ${
                  isLogin ? "justify-between" : "justify-center"
                }`}
              >
                <button
                  type="submit"
                  className="w-[96px] bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
                {isLogin && (
                  <button
                    type="button"
                    className="text-blue-400 hover:underline p-2"
                    onClick={forgetPasswordHandler}
                  >
                    Forget Password?
                  </button>
                )}
              </div>
            </form>
            <div className="text-center mt-4">
              {isLogin ? (
                <>
                  {sign_up_text}{" "}
                  <button
                    className="text-blue-400 hover:underline"
                    onClick={switchAuthModeHandler}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  {login_text}{" "}
                  <button
                    className="text-blue-400 hover:underline"
                    onClick={switchAuthModeHandler}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
