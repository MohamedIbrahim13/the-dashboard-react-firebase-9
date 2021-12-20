import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase/config";
import { useAuth } from "./useAuth";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();
  const signUp = async (email, password, displayName, thumbnail) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (!cred) {
        throw new Error("Register Error");
      }
      const uploadPath = `thumbnails/${cred.user.uid}/${thumbnail.name}`;
      const spaceRef = ref(storage, uploadPath);
      const profilePic = await uploadBytes(spaceRef, thumbnail);
      const photoURL = await getDownloadURL(profilePic.ref);
      await updateProfile(cred.user, { displayName, photoURL });

      const userRef = doc(db, "users", cred.user.uid);
      await setDoc(userRef, { online: true, displayName, photoURL });
      dispatch({ type: "LOGIN", payload: cred.user });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { error, isPending, signUp };
};
