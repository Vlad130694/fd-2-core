import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { API_KEY } from "../../constants/envValues";

export class Database {
    constructor() {
        const firebaseConfig = {
            apiKey: API_KEY,
            authDomain: "it-todo-list-9fa20.firebaseapp.com",
            projectId: "it-todo-list-9fa20",
            storageBucket: "it-todo-list-9fa20.appspot.com",
            messagingSenderId: "220699410940",
            appId: "1:220699410940:web:753e231f31dd8bd46a3279",
            measurementId: "G-GR32FBGMRS"
          };

          const app = initializeApp(firebaseConfig);
          this._database = getFirestore(app);
    }

    create(collectionKey, body) {
        const collectionRef = collection(this._database, collectionKey);
        return addDoc(collectionRef, body);
    }
    read(collectionKey) {
        const collectionRef = collection(this._database, collectionKey);
        return getDocs(collectionRef).then((documents) => {
            return documents.docs.map((doc) => ({ ...doc.data(), id: doc.id}))
        });
    }
    update(collectionKey, id, body) {
 const document = doc(this._database, collectionKey, id);
 return updateDoc(document, body);
    }
    delete(collectionKey, id) {
        const document = doc(this._database, collectionKey, id);
        return deleteDoc(document);
    }

    static getInstance() {
        if(!Database.instance) {
        Database.instance = new Database()
    }

    return Database.instance
    }
}