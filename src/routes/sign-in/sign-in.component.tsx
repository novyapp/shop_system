import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

export default function SignIn() {
  useEffect(() => {
    log();
  }, []);

  const log = async () => {
    const response = await getRedirectResult(auth);
    console.log(response);
    if (response) {
      const userDocRef = await createUserDocumentFromAuth(response.user);
      console.log(userDocRef);
    }
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>sign-in page</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with google redirect
      </button>
      <SignUpForm />
    </div>
  );
}
