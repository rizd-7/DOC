function isValidEmail(email) {
  // Regular expression for a simple email validation
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}


const email = 'example@email.com';
if (isValidEmail(email)) {
  console.log(`${email} is a valid email address.`);
} else {
  console.log(`${email} is not a valid email address.`);
}
 