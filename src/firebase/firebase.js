import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWAbvFeCMebHCn3WuMqYQ3rzL7ykUNmLk",
  authDomain: "hh-test-task.firebaseapp.com",
  projectId: "hh-test-task",
  storageBucket: "hh-test-task.appspot.com",
  messagingSenderId: "1090149306993",
  appId: "1:1090149306993:web:9fc927007611c17681c1d0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };