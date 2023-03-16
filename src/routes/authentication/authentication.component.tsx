import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-forrm/sign-in-form.component";

import "./authentication.styles.scss";

export default function Authentication() {
  return (
    <div className="authentincation-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}
