//import
import { ValidationError } from "yup";

//interface
interface Errors {
  [key: string]: string;
}

//funcao
export default function getValidationErros(err: ValidationError): Errors {

  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }  
  });
  
  return validationErrors
}