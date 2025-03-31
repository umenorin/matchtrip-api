import { NextFunction, Request, Response } from "express";

function CPFTest(strCPF: string) {
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

export const userValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  const nameRegex = /^[a-zA-ZÀ-ÿ]+(?:\s+[a-zA-ZÀ-ÿ]+)*$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,}$/;
  const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

  const invalidMessages = [];

  //email
  if (!emailRegex.test(user.email) || !user.email) {
    invalidMessages.push("email invalid");
  }

  //number
  if (!phoneRegex.test(user.numberPhone) || !user.numberPhone) {
    invalidMessages.push("number phone invalid");
  }

  //name
  if (!nameRegex.test(user.name) || !user.name) {
    invalidMessages.push("name invalid");
  }

  //password
  if (!user.password) {
    invalidMessages.push("password invalid");
  }
  if (!passwordRegex.test(user.password)) {
    invalidMessages.push(
      "the password must contains uppercase letter, lowercase letter, number and specials caracters"
    );
  }
  if (user.password.length < 6 || user.password.length > 16) {
    invalidMessages.push(
      "the password must contains in minimun 6 caracters and maximun 16 caracteres"
    );
  }
  //message
  if (user.age < 10 || user.age > 100) {
    invalidMessages.push("the minimun age is 10 and the maximun age is 100");
  }

  //uniqueIdentification
  if (!cpfRegex.test(user.uniqueIdentification)) {
    invalidMessages.push("cpf lenght invalid");
  }

  if (!CPFTest(user.uniqueIdentification)) {
    invalidMessages.push("cpf invalid");
  }

  user.numberPhone = user.numberPhone.replace(/\D/g, "");
  user.uniqueIdentification = user.uniqueIdentification.replace(/\D/g, "");
  //JSON
  if (invalidMessages.length > 0) {
    res.status(400).json({
      message: "ocorred an error when you try create your user",
      errors: invalidMessages.map((element) => element),
    });
    return;
  }

  next();
};
