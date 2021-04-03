export const getUsername = async value => {
  const req = await fetch("http://localhost:3001/users");
  const res = await req.json();

  return res.some(
    ({ username }) => username.toLowerCase() === value.toLowerCase()
  );
};

export const getEmail = async value => {
  const req = await fetch("http://localhost:3001/users");
  const res = await req.json();

  return res.some(({ email }) => email.toLowerCase() === value.toLowerCase());
};

export const getPhoneNumber = async value => {
  const req = await fetch("http://localhost:3001/users");
  const res = await req.json();

  return res.some(({ phoneNumber }) => phoneNumber === value);
};
