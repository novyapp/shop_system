import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

export default function SignIn() {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response);
  };

  return (
    <div>
      <h1>sign-in page</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>
    </div>
  );
}
