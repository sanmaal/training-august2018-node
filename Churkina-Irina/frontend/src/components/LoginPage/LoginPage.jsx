import React, { Component } from "react";
import "./LoginPage.css";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "login"
    };

    this.toggleStatus = this.toggleStatus.bind(this);
  }

  toggleStatus() {
    this.state.status == "login"
      ? this.setState({ status: "signup" })
      : this.setState({ status: "login" });
  }

  render() {
    return (
      <div className="login-page-block">
        <h3>{this.state.status === "login" ? "Log In" : "Sign Up"}</h3>
        <form
          action={
            this.state.status === "login"
              ? "http://localhost:3000/login"
              : "http://localhost:3000/signup"
          }
          method="POST"
        >
          <label>
            <span>Login</span>
            <input type="text" name="user[username]" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="user[password]" />
          </label>
          <button type="submit">Submit</button>
          <span className="sign-up-request">
            {this.state.status == "login"
              ? "Don`t have any accounts here?"
              : "Already have an account?"}{" "}
            <button type="button" onClick={this.toggleStatus} id="sign-up">
              {this.state.status === "login" ? "Sign Up" : "Log In"}
            </button>
            !
          </span>
        </form>
      </div>
    );
  }
}
