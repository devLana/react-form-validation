import { useState } from "react";
import Button from "./Components/Button";
import {
  submitHandler,
  validateConfPassword,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePhoneNumber,
  validateUsername,
} from "./validator";

const App = () => {
  const [visibility, setVisibility] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = e => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      const container = document.querySelector(
        ".form-group:nth-of-type(2) > .form-control"
      );
      container.classList.remove("form-error");
      setErrors({ ...errors, gender: "" });
    }

    setState({ ...state, [name]: value });
  };

  const handleFocus = e => {
    const { name, parentElement } = e.target;
    parentElement.classList.remove("form-error");
    setErrors({ ...errors, [name]: "" });
  };

  const handleBlur = e => {
    const { name, parentElement } = e.target;

    if (errors[name]) {
      parentElement.classList.add("form-error");
    }
  };

  const passwordFocus = e => {
    const { name, parentElement } = e.target;

    const containerOne = document.querySelector(
      ".form-group:nth-of-type(5) > .form-control:first-child"
    );

    const containerTwo = document.querySelector(
      ".form-group:nth-of-type(5) > .form-control:last-child"
    );

    parentElement.classList.add("password--active");

    if (name === "password") {
      containerOne.classList.remove("form-error");
    } else if (name === "confirmPassword") {
      containerTwo.classList.remove("form-error");
    }

    setErrors({ ...errors, [name]: "" });
  };

  const passwordBlur = e => {
    const { name, parentElement } = e.target;

    const containerOne = document.querySelector(
      ".form-group:nth-of-type(5) > .form-control:first-child"
    );

    const containerTwo = document.querySelector(
      ".form-group:nth-of-type(5) > .form-control:last-child"
    );

    parentElement.classList.remove("password--active");

    if (name === "password" && errors[name]) {
      containerOne.classList.add("form-error");
    } else if (name === "confirmPassword" && errors[name]) {
      containerTwo.classList.add("form-error");
    }
  };

  const togglePassword = e => {
    e.preventDefault();
    setVisibility(s => !s);
  };

  const goBack = () => {
    setIsValid(false);
    setState({
      firstName: "",
      lastName: "",
      gender: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container">
      {isValid ? (
        <div className="form--success">
          <header className="form--success__header">
            Registration Successful
          </header>
          <div className="form--success__body">
            {Object.entries(state).map(([name, value], index) => (
              <>
                {name === "confirmPassword" ? null : (
                  <p className="form--success__item" key={index}>
                    <strong>{name}:</strong>
                    <span>{value}</span>
                  </p>
                )}
              </>
            ))}
          </div>
          <footer className="form--success__footer">
            <button onClick={goBack}>Go Back</button>
          </footer>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={e => submitHandler({ e, state, setErrors, setIsValid })}
        >
          <div className="form-group">
            <div
              className={
                errors.firstName ? "form-control form-error" : "form-control"
              }
            >
              <label htmlFor="first-name">First Name</label>
              <input
                id="first-name"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={e => validateFirstName(e, setErrors, handleBlur)}
                value={state.firstName}
              />
              {errors.firstName && (
                <p className="error__box">{errors.firstName}</p>
              )}
            </div>
            <div
              className={
                errors.lastName ? "form-control form-error" : "form-control"
              }
            >
              <label htmlFor="last-name">Last Name</label>
              <input
                id="last-name"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={e => validateLastName(e, setErrors, handleBlur)}
                value={state.lastName}
              />
              {errors.lastName && (
                <p className="error__box">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <div
              className={
                errors.gender ? "form-control form-error" : "form-control"
              }
            >
              <p className="radio__label">Select Your Gender</p>
              <div className="radio__input__container">
                <div className="radio__wrapper">
                  <label htmlFor="male">Male</label>
                  <input
                    id="male"
                    type="radio"
                    name="gender"
                    onChange={handleChange}
                    value="male"
                  />
                </div>
                <div className="radio__wrapper">
                  <label htmlFor="female">Female</label>
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    onChange={handleChange}
                    value="female"
                  />
                </div>
              </div>
              {errors.gender && <p className="error__box">{errors.gender}</p>}
            </div>
          </div>
          <div className="form-group">
            <div
              className={
                errors.username ? "form-control form-error" : "form-control"
              }
            >
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                autoComplete="on"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={e => validateUsername(e, setErrors, handleBlur)}
                value={state.username}
              />
              {errors.username && (
                <p className="error__box">{errors.username}</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <div
              className={
                errors.email ? "form-control form-error" : "form-control"
              }
            >
              <label htmlFor="email">E-Mail</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={e => validateEmail(e, setErrors, handleBlur)}
                value={state.email}
              />
              {errors.email && <p className="error__box">{errors.email}</p>}
            </div>
            <div
              className={
                errors.phoneNumber ? "form-control form-error" : "form-control"
              }
            >
              <label htmlFor="phone-number">Phone Number</label>
              <input
                id="phone-number"
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={e => {
                  const { value } = e.target;

                  if (/[^\d+\s()]/.test(value)) return;
                  handleChange(e);
                }}
                onFocus={handleFocus}
                onBlur={e => validatePhoneNumber(e, setErrors, handleBlur)}
                value={state.phoneNumber}
              />
              {errors.phoneNumber && (
                <p className="error__box">{errors.phoneNumber}</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <div
              className={
                errors.password ? "form-control form-error" : "form-control"
              }
            >
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={visibility ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  onFocus={passwordFocus}
                  onBlur={e => validatePassword(e, setErrors, passwordBlur)}
                  onChange={handleChange}
                  value={state.password}
                />
                <Button
                  passwordFocus={passwordFocus}
                  passwordBlur={passwordBlur}
                  togglePassword={togglePassword}
                  visibility={visibility}
                />
              </div>
              {errors.password && (
                <p className="error__box">{errors.password}</p>
              )}
            </div>
            <div
              className={
                errors.confirmPassword
                  ? "form-control form-error"
                  : "form-control"
              }
            >
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  id="confirm-password"
                  type={visibility ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  onFocus={passwordFocus}
                  onBlur={e => {
                    const { password } = state;
                    validateConfPassword({
                      e,
                      password,
                      setErrors,
                      func: passwordBlur,
                    });
                  }}
                  onChange={handleChange}
                  value={state.confirmPassword}
                />
                <Button
                  passwordFocus={passwordFocus}
                  passwordBlur={passwordBlur}
                  togglePassword={togglePassword}
                  visibility={visibility}
                />
              </div>
              {errors.confirmPassword && (
                <p className="error__box">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="form-control">
              <input id="submit" type="submit" value="Submit" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default App;
