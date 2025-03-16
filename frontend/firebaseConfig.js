import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBdCvsO7cqhiNfr8SRHeKR6UrWMQj0AR0s",
    authDomain: "student-performance-syst-a49d8.firebaseapp.com",
    projectId: "student-performance-syst-a49d8",
    storageBucket: "student-performance-syst-a49d8.firebasestorage.app",
    messagingSenderId: "367165941188",
    appId: "1:367165941188:web:842960799d42bc3930b091",
    measurementId: "G-J9SF94XH7Z"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider("microsoft.com");

export { auth, googleProvider, githubProvider, microsoftProvider };
