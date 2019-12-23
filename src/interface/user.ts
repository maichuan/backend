export interface User {
  email: string
  password: string
  username: string
  gmailToken?: string
  facebookToken?: string
}

export interface PasswordCompare {
  password: string
  dbPassword: string
}
