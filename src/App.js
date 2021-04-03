import { useState } from "react";

const App = () => {
  const [visibility, setVisibility] = useState(false);

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

    parentElement.style.border = "0.1rem solid rgba(0, 102, 0, 0.5)";
    parentElement.style.boxShadow = "0 0 0.5rem -0.1rem #0f0";

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

    parentElement.removeAttribute("style");

    if (name === "password" && errors[name]) {
      containerOne.classList.add("form-error");
    } else if (name === "confirmPassword" && errors[name]) {
      containerTwo.classList.add("form-error");
    }
  };

  const togglePassword = () => setVisibility(s => !s);

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form noValidate onSubmit={submitHandler}>
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
              onBlur={e => {
                const { value } = e.target;

                if (!value.trim()) {
                  setErrors({ ...errors, firstName: "Enter first name" });
                }

                handleBlur(e);
              }}
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
              onBlur={e => {
                const { value } = e.target;

                if (!value.trim()) {
                  setErrors({ ...errors, lastName: "Enter last name" });
                }

                handleBlur(e);
              }}
              value={state.lastName}
            />
            {errors.lastName && <p className="error__box">{errors.lastName}</p>}
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
              onBlur={e => {
                const { value } = e.target;

                if (!value.trim()) {
                  setErrors({ ...errors, username: "Enter username" });
                } else if (/[^\w]/.test(value)) {
                  setErrors({
                    ...errors,
                    username:
                      "Username can only contain alphabets, numbers and underscore",
                  });
                }

                handleBlur(e);
              }}
              value={state.username}
            />
            {errors.username && <p className="error__box">{errors.username}</p>}
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
              onBlur={e => {
                const { value } = e.target;
                const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

                if (!value.trim()) {
                  setErrors({ ...errors, email: "Enter email" });
                } else if (!regex.test(value)) {
                  setErrors({
                    ...errors,
                    email: "Enter a valid email address",
                  });
                }

                handleBlur(e);
              }}
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
              onBlur={e => {
                const { value } = e.target;
                const regex = /^(\+)?\s?\(?\d{1,4}\)?\s?\d{9,}$/;

                if (!value.trim()) {
                  setErrors({ ...errors, phoneNumber: "Enter phone number" });
                } else if (!regex.test(value)) {
                  setErrors({
                    ...errors,
                    phoneNumber: "Enter a valid phone number",
                  });
                }

                handleBlur(e);
              }}
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
                onBlur={e => {
                  const { value } = e.target;

                  if (!value.trim()) {
                    setErrors({ ...errors, password: "Enter password" });
                  } else if (
                    value.length < 6 ||
                    !/[A-Z]/.test(value) ||
                    !/[\d]/.test(value) ||
                    !/[^a-z\d]/i.test(value)
                  ) {
                    setErrors({
                      ...errors,
                      password:
                        "Password must have an uppercase letter, a number, a symbol and be at least 6 characters",
                    });
                  }

                  passwordBlur(e);
                }}
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
            {errors.password && <p className="error__box">{errors.password}</p>}
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
                  const { value } = e.target;

                  if (!value.trim()) {
                    setErrors({
                      ...errors,
                      confirmPassword: "Enter password confirmation",
                    });
                  } else if (state.password && state.password !== value) {
                    setErrors({
                      ...errors,
                      confirmPassword: "Passwords do not match",
                    });
                  }

                  passwordBlur(e);
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
    </div>
  );
};

const Button = ({
  passwordFocus,
  passwordBlur,
  togglePassword,
  visibility,
}) => (
  <button
    className="toggle-password__container"
    onFocus={passwordFocus}
    onBlur={passwordBlur}
    onClick={togglePassword}
  >
    <span className="password--toggler">
      {visibility ? (
        <i className="far fa-eye"></i>
      ) : (
        <i className="far fa-eye-slash"></i>
      )}
    </span>
  </button>
);

export default App;
