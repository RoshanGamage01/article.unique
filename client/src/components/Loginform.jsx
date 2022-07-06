import "../styles/register_and_login_form.scss";

function Loginform() {
  function btnLoginOnAction() {}

  return (
    <section className="form">
      <div className="title">Log In</div>

      <div className="form-main">
        <div className="form-get-security">
          <label for="E-mail">E-mail</label>
          <input type={"email"} placeholder="example@example.com"  name="email"/>
          <label for="Password">Password</label>
          <input type={"password"} placeholder="Password" name="password"/>
        </div>
        <div className="btn">
          <button onClick={btnLoginOnAction}>Log In</button>
        </div>
      </div>
    </section>
  );
}

export default Loginform;
