import { getUsername, getEmail, getPhoneNumber } from "./service";

export const submitValidator = async (errors, state) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const phoneRegex = /^(\+)?\s?\(?\d{1,4}\)?\s?\d{9,}$/;

  if (!state.firstName.trim()) {
    errors.firstName = "Enter first name";
  }

  if (!state.lastName.trim()) {
    errors.lastName = "Enter last name";
  }

  if (!state.gender) {
    errors.gender = "Select your gender";
  }

  if (!state.username.trim()) {
    errors.username = "Enter username";
  } else if (/[^\w]/.test(state.username.trim())) {
    errors.username =
      "Username can only contain alphabets, numbers and underscore";
  } else {
    const usernameExists = await getUsername(state.username.trim());

    if (usernameExists) {
      errors.username = "This username has been taken. Try another one";
    }
  }

  if (!state.email.trim()) {
    errors.email = "Enter email";
  } else if (!emailRegex.test(state.email.trim())) {
    errors.email = "Enter a valid email address";
  } else {
    const emailExists = await getEmail(state.username.trim());

    if (emailExists) {
      errors.email = "This email has been taken. Try another one";
    }
  }

  if (!state.phoneNumber.trim()) {
    errors.phoneNumber = "Enter phone number";
  } else if (!phoneRegex.test(state.phoneNumber.trim())) {
    errors.phoneNumber = "Enter a valid phone number";
  } else {
    const numberExists = await getPhoneNumber(state.username.trim());

    if (numberExists) {
      errors.phoneNumber = "This phone number has been taken. Try another one";
    }
  }

  if (!state.password) {
    errors.password = "Enter password";
  } else if (
    state.password.length < 6 ||
    !/[A-Z]/.test(state.password) ||
    !/[\d]/.test(state.password) ||
    !/[^a-z\d]/i.test(state.password)
  ) {
    errors.password =
      "Password must have an uppercase letter, a number, a symbol and be at least 6 characters";
  }

  if (!state.confirmPassword) {
    errors.confirmPassword = "Enter password confirmation";
  } else if (state.password !== state.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
};

export const validateFirstName = (e, setErrors, func) => {
  const { value } = e.target;

  if (!value.trim()) {
    setErrors(s => ({ ...s, firstName: "Enter first name" }));
  }

  func(e);
};

export const validateLastName = (e, setErrors, func) => {
  const { value } = e.target;

  if (!value.trim()) {
    setErrors(s => ({ ...s, lastName: "Enter last name" }));
  }

  func(e);
};

export const validateUsername = async (e, setErrors, func) => {
  const { value } = e.target;

  if (!value.trim()) {
    setErrors(s => ({ ...s, username: "Enter username" }));
  } else if (/[^\w]/.test(value.trim())) {
    setErrors(s => ({
      ...s,
      username: "Username can only contain alphabets, numbers and underscore",
    }));
  } else {
    const usernameExists = await getUsername(value.trim());

    if (usernameExists) {
      setErrors(s => ({
        ...s,
        username: "This username has been taken. Try another one",
      }));
    }
  }

  func(e);
};

export const validateEmail = async (e, setErrors, func) => {
  const { value } = e.target;
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!value.trim()) {
    setErrors(s => ({ ...s, email: "Enter email" }));
  } else if (!regex.test(value.trim())) {
    setErrors(s => ({ ...s, email: "Enter a valid email address" }));
  } else {
    const emailExists = await getEmail(value.trim());

    if (emailExists) {
      setErrors(s => ({
        ...s,
        email: "This email has been taken. Try another one",
      }));
    }
  }

  func(e);
};

export const validatePhoneNumber = async (e, setErrors, func) => {
  const { value } = e.target;
  const regex = /^(\+)?\s?\(?\d{1,4}\)?\s?\d{9,}$/;

  if (!value.trim()) {
    setErrors(s => ({ ...s, phoneNumber: "Enter phone number" }));
  } else if (!regex.test(value.trim())) {
    setErrors(s => ({ ...s, phoneNumber: "Enter a valid phone number" }));
  } else {
    const numberExists = await getPhoneNumber(value.trim());

    if (numberExists) {
      setErrors(s => ({
        ...s,
        phoneNumber: "This phone number has been taken. Try another one",
      }));
    }
  }

  func(e);
};

export const validatePassword = (e, setErrors, func) => {
  const { value } = e.target;

  if (!value) {
    setErrors(s => ({ ...s, password: "Enter password" }));
  } else if (
    value.length < 6 ||
    !/[A-Z]/.test(value) ||
    !/[\d]/.test(value) ||
    !/[^a-z\d]/i.test(value)
  ) {
    setErrors(s => ({
      ...s,
      password:
        "Password must have an uppercase letter, a number, a symbol and be at least 6 characters",
    }));
  }

  func(e);
};

export const validateConfPassword = ({ e, password, setErrors, func }) => {
  const { value } = e.target;

  if (!value) {
    setErrors(s => ({ ...s, confirmPassword: "Enter password confirmation" }));
  } else if (password !== value) {
    setErrors(s => ({ ...s, confirmPassword: "Passwords do not match" }));
  }

  func(e);
};
