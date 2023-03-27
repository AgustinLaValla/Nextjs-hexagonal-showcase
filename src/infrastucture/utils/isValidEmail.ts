const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

export const isValidEmail = (email: string) => regExp.test(String(email).toLowerCase());

export const isEmail = (email: string) => isValidEmail(email)
  ? undefined
  : 'Invalid email format'