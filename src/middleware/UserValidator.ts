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
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  const nameRegex = /^[a-zA-ZÀ-ÿ]+(?:\s+[a-zA-ZÀ-ÿ]+)*$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,}$/;
  const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

  const invalidMessages = [];

  const { user } = req.body;

  if (!user) {
    return res.status(400).json({
      message: "User data is missing in the request body.",
      errors: ["The 'user' object is required."],
    });
  }

  if (!user.email || !emailRegex.test(user.email)) {
    invalidMessages.push("Email invalid");
  }

  if (!user.numberPhone || !phoneRegex.test(user.numberPhone)) {
    invalidMessages.push("Phone number invalid");
  }

  if (!user.name || !nameRegex.test(user.name)) {
    invalidMessages.push("Name invalid");
  }

  if (!user.password) {
    invalidMessages.push("Password is required");
  } else {
    if (!passwordRegex.test(user.password)) {
      invalidMessages.push(
        "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }
    if (user.password.length < 6 || user.password.length > 16) {
      invalidMessages.push(
        "The password must be between 6 and 16 characters long."
      );
    }
  }

  if (user.age === undefined || user.age < 10 || user.age > 100) {
    invalidMessages.push("Age must be between 10 and 100.");
  }

  if (!user.uniqueIdentification || !cpfRegex.test(user.uniqueIdentification)) {
    invalidMessages.push("CPF format invalid");
  } else if (!CPFTest(user.uniqueIdentification.replace(/\D/g, ""))) {
    invalidMessages.push("CPF is invalid");
  }

  if (user.numberPhone) {
    user.numberPhone = user.numberPhone.replace(/\D/g, "");
  }
  if (user.uniqueIdentification) {
    user.uniqueIdentification = user.uniqueIdentification.replace(/\D/g, "");
  }

  if (invalidMessages.length > 0) {
    return res.status(400).json({
      message: "An error occurred while validating user data.",
      errors: invalidMessages,
    });
  }

  next();
};
