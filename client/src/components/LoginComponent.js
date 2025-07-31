import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/user";
import Loader from "./Loader";

const LoginComponent = ({ history }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo || localStorage.getItem("userInfo")) {
      history.push("/");
    }
  }, [userInfo, history]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user, password));
  };

  // ✅ Handle error message safely
  let errorMessage = null;
  if (typeof error === "string") {
    errorMessage = error;
  } else if (error && typeof error === "object" && "message" in error) {
    errorMessage = error.message;
  }

  return (
    <div className="container">
      <h1>Log In</h1>

      {errorMessage && (
        <div className="dbmsg">{errorMessage}</div>
      )}

      {userInfo?.message && (
        <div className="dbmsg">{userInfo.message}</div>
      )}

      <form onSubmit={onSubmit} className="form">
        <div className="field">
          <label htmlFor="user">Username or Email</label>
          <input
            id="user"
            name="user"
            type="text"
            placeholder="Username or Email"
            value={user}
            onChange={(e) => setUser(e.target.value.trim().toLowerCase())}
            required
          />
          {error?.user && (
            <div className="validatemsg">{error.user}</div>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error?.password && (
            <div className="validatemsg">{error.password}</div>
          )}
        </div>

        <button type="submit">
          Login {loading && <Loader />}
        </button>
      </form>

      <p>
        Forgotten password? <Link to="/forgot">recover</Link>
      </p>
      <p>
        No account yet? <Link to="/user/register">register</Link>
      </p>
    </div>
  );
};

export default LoginComponent;
