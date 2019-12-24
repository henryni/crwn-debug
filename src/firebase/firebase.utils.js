import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAkqko2SKeVH4D0Y-PJyXU-B6x6zoG62FE",
    authDomain: "crwn-db-93465.firebaseapp.com",
    databaseURL: "https://crwn-db-93465.firebaseio.com",
    projectId: "crwn-db-93465",
    storageBucket: "crwn-db-93465.appspot.com",
    messagingSenderId: "237179155232",
    appId: "1:237179155232:web:173425f3f6e8408dee1d45",
    measurementId: "G-N7NW0BSE04"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;