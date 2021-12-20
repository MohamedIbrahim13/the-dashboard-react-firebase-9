import { useEffect, useState, useRef } from "react";
import {
  collection,
  onSnapshot,
  where,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (c, _q, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const q = useRef(_q).current;
  const orderby = useRef(_orderBy).current;
  useEffect(() => {

      setIsPending(true);
      let collectionRef = collection(db, c);
      if (q) {
        collectionRef = query(collectionRef, where(...q));
      }
      if (orderby) {
        collectionRef = query(collectionRef, orderBy(...orderby));
      }
      const unsubCollection = onSnapshot(collectionRef, snapshot => {
        if (snapshot.empty) {
          setIsPending(false);
          setError("No Projects found!!!");
        }
        let newArr = [];
        snapshot.docs.forEach(doc => {
          newArr.push({ ...doc.data(), id: doc.id });
        });
        setIsPending(false);
        setDocuments(newArr);
      });
      return () => unsubCollection();
    
    
  }, [c, q, orderby]);
  return { documents, isPending, error };
};
