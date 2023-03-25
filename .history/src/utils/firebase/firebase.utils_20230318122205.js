import {initializeApp } from 'firebase/app';
//signInwith pop tells us which external provider we wanna add 
//maybe facebook or google or emailid....
//imorting signout method
import {getAuth,
    signInWithRedirect,
    signInWithPopup
,GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,signOut,
onAuthStateChanged
}
//we can also include facebookAuthprovider 
 from 'firebase/auth';
 import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAgH7MRGU2DO5uKWK_hpUnz1yk108xy_Js",
    authDomain: "gk-clothing-b0e37.firebaseapp.com",
    projectId: "gk-clothing-b0e37",
    storageBucket: "gk-clothing-b0e37.appspot.com",
    messagingSenderId: "242334756002",
    appId: "1:242334756002:web:d2e0f6bd9eb89300b3fbfb"
  };
  
  // Initialize Firebase app instance will help in CRUD
  const firebaseapp = initializeApp(firebaseConfig);

  const googleProvider=new GoogleAuthProvider();
  googleProvider.setCustomParameters({
     prompt:'select_account'
     });

     export const auth=getAuth();



     //we are going to do this since there are different provider going to sign in
     //with facebook or signin with github,these are all different providers that you can pull in....
//if added facebook provider we can just neede to export it...... 

     export const signInWithGooglePopup=()=>signInWithPopup(auth,googleProvider);
    //auth since auth is keeping in track of what user sign in
    //exporting signout layer and returning the promise
     export const signOutUser=async ()=> await signOut(auth);
     export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,googleProvider);

     export const db=getFirestore();
//async behaviour since we are going to call an api
//we can also write field="title"
//now after this we have our data in firestore the shop data
//now we need to pull down the data from firestore
//to our application.

export const addCollectionAndDocuments=async (collectionKey,objectsToAdd,field="title")=>{
const collectionRef=collection(db,collectionKey);
//we get a batch from the write batch method
//It makes a change in the databse 
//suppose my friend is giving me 100 from his balance of 1000
//then his account balance would be 900 and mine 1100
//means subtraction of 100 and addition of 100.
 //to get a a batch we need to create a batch class to store the batch which we taken from firebase 
 //it will take database.
 //writeBatch will return me a batch.
const batch=writeBatch(db);
//to use batch batch we need to create bunch of sets methods.
//objects here are from shopdata which are five objects .

objectsToAdd.forEach((object)=>{
//to use this object we first want to get the document reference.
//collection ref talls the method which dtabase we are using
// 
const docRef=doc(collectionRef,object[field].toLowerCase());
//we know firebase wil give us a document reference even if it doenot exit.

batch.set(docRef,object);

})
await batch.commit();
console.log("done");
};
//we will be using async since we are dealing with fire base.
 //start
export const getCategoriesAndDocuments=async ()=>{
//now first we need the collection reference.
const collectionRef = collection(db,'categories');
//from the collectionRef we are genrting a query that we imported from firebase
//this gives an object that gives a snapshot
const q=query(collectionRef);
//ability to fetch those documents and snapshots that we want -->getDoc
//the below changes every instance of firebase
// await Promise.reject(new Error('new Error Woops!!'))
const querySnapshot=await getDocs(q);
//this will give us an array of all of those individual documents inside
//and the snapshot are the actual data itself
//we are reducing over this array in order to finally end up with an object

// const categoryMap=querySnapshot.docs
//Mapping all the documents inorder to get the data
return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

// .reduce((acc,docSnapshot) => {

//         //destructing off the data fro the snapshot
//         const {title,items}=docSnapshot.data();
//         acc[title.toLowerCase()]=items;
//         return acc;
//     },{});
// return categoryMap;

};


export const createUserDocumentFromAuth=async (
    userAuth,
    additionalInformation={}
    )=>{
    if(!userAuth) return;
    const userDocRef=doc(db,'users',userAuth.uid);


    //snapshot allows us to get instance of our database and also allowss us to get the data..

    const userSnapshot=await getDoc(userDocRef)


//exists() is a bool type which says whether this data is there or not in our database.......
//if data exist it will run  and whole snapshot code will be skipped and return true or snapshot will gonna run.....

// console.log(userSnapshot.exists());
//if userdata exists i just want want to return back my userDocRef if 
//if not then i will create /set the document with the data from userrAuth in my collection
//the below things will occur if there is no snapshot present

if(!userSnapshot.exists()){
    //helps in knowing when this users are signing in
    const {displayName,email}=userAuth;
    const createAt=new Date(); 
    //inorder to set this doc we need try catch block means i want to try something asynchronous....
//get doc gives us the document then set doc allows us to set the document we will be setting doc using try and catch....
//if snapshot doesnt exist then we gonna set it inside our database,set the doc with this object

    try{
        //we are going to pass a doc reference and we want to poass data thatt we wanna set....

await setDoc(userDocRef,{
    displayName,
    email,
    createAt,
    ...additionalInformation,
});

    }
    catch(error){
        console.log('error creating the user',error.message);

    }
}
return userDocRef;
};
 //authenticateed user making async as we are setting somevalues 
export const createAuthUserWithEmailAndPassword=async(email,password)=>{
    //ways of protecting code from external services
   //adding a layer between the frontend code ant the utility of libraries we using...
    if(!email||!password) return;
    //awaited value since once it authenticate i wanna see what it gives back
    //gives us back some auth object...
    //this auth and user error doesnt allowed me to sleep
    return await createUserWithEmailAndPassword(auth,email,password);

}
  
export const signInAuthUserWithEmailAndPassword=async(email,password)=>{
    //ways of protecting code from external services
   //adding a layer between the frontend code ant the utility of libraries we using...
    if(!email||!password) return;
    //awaited value since once it authenticate i wanna see what it gives back
    //gives us back some auth object...
    //this auth and user error doesnt allowed me to sleep
    return await signInWithEmailAndPassword(auth,email,password);
}

//creating a hooper function
//it return back whatever we get back from onAuthChanged
//parameters are auth and a call back which we want to call whenever this method changes
//passing the callback method directly,whenever this function is going to be instantiate it will give us a callback.

export const onAuthStateChangedListener=(callback)=>onAuthStateChanged(auth,callback);