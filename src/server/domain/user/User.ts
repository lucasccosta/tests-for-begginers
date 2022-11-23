class User {
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(name: string, email: string, password: string) {
    this._name = name;
    this._email = email;
    this._password = password;
    this.validate();
  }

  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }

  validate() {
    if (this.name.length == 0) {
      throw new Error("Please insert a valid name");
    }
    if (this.email.length == 0) {
      throw new Error("Please insert a valid email");
    }
    if (this.password.length < 8) {
      throw new Error("Please insert a password with at least 8 characters");
    }
    if (this.password.includes(this.name)) {
      throw new Error("Password can't contain your name");
    }
  }

  changeEmail(email: string): void {
    this._email = email;
  }

  changePassword(password: string): void {
    this._password = password;
  }
}

export { User };
