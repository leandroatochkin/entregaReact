class User {                                    
  constructor(mail , password , id , role) {                           
    this.mail = mail;
    this.password = password;
    this.id = id;
    this.role = role;
  }
  buildUser() {
    return {
        mail: this.mail,
        password: this.password,
        id: this.id,
        role: this.role
    };
  }
}

export const clientUser = new User(`mail@user.com`, `123456`, `2`, `user`).buildUser()
export const adminUser = new User(`mail@admin.com`, `123456`, `1`, `admin`).buildUser()