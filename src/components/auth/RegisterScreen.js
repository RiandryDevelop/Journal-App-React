import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import { useForm } from "../../hooks/useForm";
import { setError, removeError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "Hernando",
    email: "nando@gmail.com",
    password: "123456",
    password2: "123456",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          "Password should be at least 6 characters and match each other"
        )
      );
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <div className="login-box">
        <h2 className="auth__title">Register</h2>

        <form
          onSubmit={handleRegister}
          className="animate__animated animate__fadeIn animate__faster"
        >
          {msgError && <div className="auth__alert-error">{msgError}</div>}

          <div className="user-box">
            <input
              type="text"
              placeholder="Name"
              name="name"
              autoComplete="off"
              value={name}
              onChange={handleInputChange}
            />
          </div>

          <div className="user-box">
            <input
              type="text"
              placeholder="Email"
              name="email"
              autoComplete="off"
              value={email}
              onChange={handleInputChange}
            />
          </div>

          <div className="user-box">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>

          <div className="user-box">
            <input
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-5">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Register
          </button>

          <Link to="/auth/login" className="link">
            Already registered?
          </Link>
        </form>
      </div>
    </>
  );
};
