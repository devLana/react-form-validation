import { getUsername, getEmail, getPhoneNumber } from "./service";

export const submitValidator = async state => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const phoneRegex = /^(\+)?\s?\(?\d{1,4}\)?\s?\d{9,}$/;

  const errors = {};

  if (!state.firstName.trim()) {
    errors.firstName = "Enter first name";
  }

  if (!state.lastName.trim()) {
    errors.lastName = "Enter last name";
  }

  if (!state.gender) {
    errors.gender = "Select your gender";
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
    const emailExists = await getEmail(state.email.trim());

    if (emailExists) {
      errors.email = "This email has been taken. Try another one";
    }
  }

  if (!state.phoneNumber.trim()) {
    errors.phoneNumber = "Enter phone number";
  } else if (!phoneRegex.test(state.phoneNumber.trim())) {
    errors.phoneNumber = "Enter a valid phone number";
  } else {
    const numberExists = await getPhoneNumber(state.phoneNumber.trim());

    if (numberExists) {
      errors.phoneNumber = "This phone number has been taken. Try another one";
    }
  }

  return errors;
};

export const validateFirstName = (e, errorValidator, func) => {
  const { name, value } = e.target;

  if (!value.trim()) {
    errorValidator(name, "Enter first name");
  }

  func(e);
};

export const validateLastName = (e, errorValidator, func) => {
  const { name, value } = e.target;

  if (!value.trim()) {
    errorValidator(name, "Enter last name");
  }

  func(e);
};

export const validateUsername = async (e, errorValidator, func) => {
  const { name, value } = e.target;

  if (!value.trim()) {
    errorValidator(name, "Enter username");
  } else if (/[^\w]/.test(value.trim())) {
    errorValidator(
      name,
      "Username can only contain alphabets, numbers and underscore"
    );
  } else {
    const usernameExists = await getUsername(value.trim());

    if (usernameExists) {
      errorValidator(name, "This username has been taken. Try another one");
    }
  }

  func(e);
};

export const validateEmail = async (e, errorValidator, func) => {
  const { name, value } = e.target;
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!value.trim()) {
    errorValidator(name, "Enter email");
  } else if (!regex.test(value.trim())) {
    errorValidator(name, "Enter a valid email address");
  } else {
    const emailExists = await getEmail(value.trim());

    if (emailExists) {
      errorValidator(name, "This email has been taken. Try another one");
    }
  }

  func(e);
};

export const validatePhoneNumber = async (e, errorValidator, func) => {
  const { name, value } = e.target;
  const regex = /^(\+)?\s?\(?\d{1,4}\)?\s?\d{9,}$/;

  if (!value.trim()) {
    errorValidator(name, "Enter phone number");
  } else if (!regex.test(value.trim())) {
    errorValidator(name, "Enter a valid phone number");
  } else {
    const numberExists = await getPhoneNumber(value.trim());

    if (numberExists) {
      errorValidator(name, "This phone number has been taken. Try another one");
    }
  }

  func(e);
};

export const validatePassword = (e, errorValidator, func) => {
  const { name, value } = e.target;

  if (!value) {
    errorValidator(name, "Enter password");
  } else if (
    value.length < 6 ||
    !/[A-Z]/.test(value) ||
    !/[\d]/.test(value) ||
    !/[^a-z\d]/i.test(value)
  ) {
    errorValidator(
      name,
      "Password must have an uppercase letter, a number, a symbol and be at least 6 characters"
    );
  }

  func(e);
};

export const validateConfPassword = ({ e, password, errorValidator, func }) => {
  const { name, value } = e.target;

  if (!value) {
    errorValidator(name, "Enter password confirmation");
  } else if (password !== value) {
    errorValidator(name, "Passwords do not match");
  }

  func(e);
};

export const validateImages = ({ e, errorValidator, state, setState }) => {
  const { name, files } = e.target;
  const imageTypes = ["image/png", "image/jpeg", "image/gif"];
  const maxSize = 4 * 1024 * 1024;
  const limit = 3;
  let size;

  if (maxSize < 1024) {
    size = maxSize + " bytes";
  } else if (maxSize >= 1024 && maxSize < 1048576) {
    size = (maxSize / 1024).toFixed(1) + " KB";
  } else if (maxSize >= 1048576) {
    size = (maxSize / 1048576).toFixed(1) + " MB";
  }

  if (files.length > limit) {
    errorValidator(name, `You can only select ${limit} images`);
  } else if (files.length + state.images.length > limit) {
    errorValidator(name, `You can only select ${limit} images`);
  } else {
    const newImages = Array.from(files);

    newImages.forEach(image => {
      if (!imageTypes.includes(image.type)) {
        errorValidator(name, "Selected images can only be of type png/jpg/gif");
      } else if (image.size > maxSize) {
        errorValidator(name, `Selected images cannot exceed ${size}`);
      } else {
        setState(s => ({ ...s, images: [...s.images, image] }));
        errorValidator(name, "");
      }
    });
  }
};
