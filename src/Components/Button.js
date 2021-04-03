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

export default Button;