export const validateEmail = (email: string): boolean => {
    return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
      email
    );
  };
  
  export const validatePassword = (password: string): boolean => {
    // eslint-disable-next-line no-useless-escape
    return /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).{6,20}$/.test(
      password
    );
  };
  
  export const validatePasswordRegister = (
    password: string,
    firstName: string,
    lastName: string
  ) => {
    let actualTest = null;
    const firstNames = firstName !== "" ? firstName.split(" ") : [];
    const lastNames = lastName !== "" ? lastName.split(" ") : [];
  
    for (let i = 0; i < firstNames.length; i++) {
      if (password.includes(firstNames[i])) {
        return {
          error: true,
          message: "La contraseña no puede contener tu nombre",
        };
      }
    }
    for (let i = 0; i < lastNames.length; i++) {
      if (password.includes(lastNames[i])) {
        return {
          error: true,
          message: "La contraseña no puede contener tu nombre",
        };
      }
    }
    actualTest = /(\w).{5,}/.test(password) && !/(\w).{21,}/.test(password);
    if (!actualTest) {
      return {
        error: true,
        message: "La contraseña debe tener entre 6 y 20 caracteres",
      };
    }
    actualTest = password.match(/^(?!.*\s)/);
    if (!actualTest) {
      return {
        error: true,
        message: "La contraseña no puede contener espacios",
      };
    }
    actualTest = password.match(/(.*[a-z])/);
    if (!actualTest) {
      return {
        error: true,
        message: "La contraseña debe tener al menos una letra minúscula",
      };
    }
    actualTest = password.match(/(.*[A-Z])/);
    if (!actualTest) {
      return {
        error: true,
        message: "La contraseña debe tener al menos una letra mayúscula",
      };
    }
    actualTest = password.match(/(.*\d)/);
    if (!actualTest) {
      return {
        error: true,
        message: "La contraseña debe tener al menos un número",
      };
    }
    actualTest = password.match(
      /(.*[\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\-\\=\\¡\\£\\_\\+\\`\\~\\.\\,\\<\\>\\/\\?\\;\\:\\'\\"\\\\|\\[\]\\{\\}])/
    );
    if (!actualTest) {
      return {
        error: true,
        message: "La contraseña debe tener al menos un caracter especial",
      };
    }
  
    return {
      error: false,
      message: "",
    };

  };
  
  export const validateName = (name: string): boolean => {
    return /^[A-Za-z\s]*$/.test(name);
  };
  
  export const validatePhoneNumber = (phoneNumber: string): boolean => {
    return /^[a-zA-Z]+$/.test(
      //numbers and + symbols only
      phoneNumber
    );
  };
  export const validateDNI = (phoneNumber: string): boolean => {
    return /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$|^[\d]$/g.test(phoneNumber);
  };
  
  export const validateCellphone = (phoneNumber: string): boolean =>
    /^([+]?[0-9])+$/im.test(phoneNumber);
  
  export const validateDirection = (phoneNumber: string): boolean => {
    return /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$|(\s)/.test(
      //letters, spaces and numbers only
      phoneNumber
    );
  };
  
  export const validateVisa = (cardNumber: string) => {
    return /^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber);
  };
  
  export const validateMasterCard = (cardNumber: string) => {
    return /^(?:5[1-5][0-9]{14})$/.test(cardNumber);
  };
  
  export const validateExpireDate = (expireDate: string) => {
    return /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(expireDate);
  };
  
  export const validateCvv = (cvv: string) => {
    return /^[0-9]{3,4}$/.test(cvv);
  };
  
  export const containOnlySpaces = (text: string): boolean =>
    text.trim().length === 0;
  
  export const notContainOnlySpaces = (text: string): boolean =>
    !containOnlySpaces(text);
  
  export const validateWebUrl = (url: string): boolean => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(url);
  };
  