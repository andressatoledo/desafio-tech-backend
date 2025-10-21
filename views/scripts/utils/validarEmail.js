// export function validarEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   console.log(regex.test(email));
//   return regex.test(email);
// }

export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  email = email.trim(); // remove espaços extras
  console.log("Email validado:", email);
  console.log("Resultado:", regex.test(email));
  return regex.test(email);
}
