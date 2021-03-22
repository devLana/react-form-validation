import { useState } from "react";

const App = () => {
  const [visibility, setVisibility] = useState(false);

  const passwordFocus = e => {
    const passwordWrapper = e.target.parentElement;
    passwordWrapper.style.border = "0.1rem solid rgba(0, 102, 0, 0.5)";
    passwordWrapper.style.boxShadow = "0 0 0.2rem 0.2rem #0f0";
  };

  const passwordBlur = e => {
    const passwordWrapper = e.target.parentElement;
    passwordWrapper.style.border = "0.1rem solid rgba(0, 102, 0, 0.5)";
    passwordWrapper.style.boxShadow = "none";
  };

  const togglePassword = e => {
    e.preventDefault();
    setVisibility(s => !s);
  };

  return (
    <div className="container">
      <form noValidate>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              name="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="form-control">
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="email">E-Mail</label>
            <input id="email" type="email" name="email" placeholder="E-mail" />
          </div>
          <div className="form-control">
            <label htmlFor="phone-number">Phone Number</label>
            <input
              id="phone-number"
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper password__container">
              <input
                id="password"
                type={visibility ? "text" : "password"}
                name="password"
                placeholder="Password"
                onFocus={passwordFocus}
                onBlur={passwordBlur}
              />
              <button
                className="toggle-password__container"
                onFocus={passwordFocus}
                onBlur={passwordBlur}
                onClick={togglePassword}
              >
                <span className="password--toggler">
                  {visibility ? (
                    <i class="far fa-eye"></i>
                  ) : (
                    <i className="far fa-eye-slash"></i>
                  )}
                </span>
              </button>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-wrapper confirm-password__container">
              <input
                id="confirm-password"
                type={visibility ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onFocus={passwordFocus}
                onBlur={passwordBlur}
              />
              <button
                className="toggle-password__container"
                onFocus={passwordFocus}
                onBlur={passwordBlur}
                onClick={togglePassword}
              >
                <span className="password--toggler">
                {visibility ? (
                    <i class="far fa-eye"></i>
                  ) : (
                    <i className="far fa-eye-slash"></i>
                  )}
                </span>
              </button>
            </div>
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

export default App;
