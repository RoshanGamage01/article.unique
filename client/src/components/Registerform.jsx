import "../styles/register_and_login_form.scss";

function Registerform() {
  function btnRegisterOnAction() {}

  return (
    <section className="form">
      <div className="title">Register</div>

      <div className="form-main">
        <div className="form-get-name">
          <div>
            <label for="First Name">First Name</label>
            <input type="text" placeholder="First Name" name="first_name"/>
          </div>
          <div>
            <label for="Last Name">Last Name</label>
            <input type="text" placeholder="Last Name" name="last_name"/>
          </div>
        </div>

        <div className="form-get-security">
          <label for="E-mail">E-mail</label>
          <input type={"email"} placeholder="example@example.com" name="email"/>
          <label for="Password">Password</label>
          <input type={"password"} placeholder="Password" name="password"/>
        </div>
        <div className="btn">
          <button onClick={btnRegisterOnAction}>Register</button>
        </div>
      </div>
    </section>
  );
}

export default Registerform;
