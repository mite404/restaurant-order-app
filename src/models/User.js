import usersArray from "../data/usersArray.js";

class User {
  constructor(name, cardNumber, cvv) {
    this.name = name;
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  addUser() {
    usersArray.push({
      name: this.name,
      cardNumber: this.cardNumber,
      cvv: this.cvv,
    });
    console.log(
      `Account info for ${this.name} added: ${JSON.stringify(usersArray)}`);
  }
}

export default User;
