import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch a single document

    setIsPending(true);
    const docRef = doc(db, c, id);
    const unsubDoc = onSnapshot(docRef, doc => {
      if (doc.exists) {
        setIsPending(false);
        setDocument({ ...doc.data(), id: doc.id });
      } else {
        setIsPending(false);
        setError("No data found!!!");
      }
    });
    return () => unsubDoc();
  }, [c, id]);
  return { isPending, error, document };
};
