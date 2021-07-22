var firebaseConfig = {
  apiKey: "AIzaSyAZBGqrz1J8Icj2XjQXXQLoLQRBXZ8kHpo",
  authDomain: "forms---homework.firebaseapp.com",
  projectId: "forms---homework",
  storageBucket: "forms---homework.appspot.com",
  messagingSenderId: "51346525732",
  appId: "1:51346525732:web:22ad1c2adfcf0bd75192b1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const form = document.forms[0];
const body = document.querySelector("body");
const emailUser = document.querySelector("#emailInput").value;
const passUser = document.querySelector("#passwordInput").value;

const btnLogOut = document.querySelector("#logOut");

const formOfnotes = document.querySelector("#writeNote");
const textAreaPlace = document.querySelector("#textNote");
const notesContainer = document.querySelector("#allNotes");
const btnAddNotes = document.querySelector("#btnAddNote");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(`E-mai: ${form.email.value}, Hasło ${form.pass.value}`);
  const operation = e.submitter.id
  const users = JSON.parse(localStorage.getItem('Users')) || []

  const SignInData = {
    email: form.email.value,
    password: form.pass.value,
  };

  formOfnotes.style.display = "none";

  const isUserExist = users?.some(user => (
    user.email === form.email.value
  ))

  // const isUserPasswordCorrect = users?.some(user => (
  //   user.password === form.pass.value
  // ))

  function rejestracja() {
    const promise = auth.createUserWithEmailAndPassword(form.email.value, form.pass.value);
    promise.catch(e => alert(e.message))
  }

  function logowanie() {
    const promise = auth.signInWithEmailAndPassword(form.email.value, form.pass.value);
    promise.catch(e => alert(e.message))
  }

  if (operation === 'login') {
    logowanie()
    // if (isUserExist && isUserPasswordCorrect) {
    //   localStorage.setItem("userLogin", JSON.stringify(SignInData))
    // }
  }

  if (operation === 'signup') {
    rejestracja()
    // if (!isUserExist) {
    //   const newUsers = JSON.stringify([...users, SignInData]);
    //   localStorage.setItem('Users', newUsers);
    //   localStorage.setItem("userLogin", JSON.stringify(SignInData));

    // }
  }

  auth.onAuthStateChanged(function (user) {

    // const loggedInUser = JSON.parse(localStorage.getItem("userLogin"));
    const notes = JSON.parse(localStorage.getItem('Notes')) || {}

    if (user) {
      form.style.display = "none"; 
      formOfnotes.style.display = "none";

      const logInText = document.createElement("p");
      logInText.innerText = `Zostałeś automatycznie zalogowany : ${user.email}`;
      body.appendChild(logInText);

      btnLogOut.style.display = "block";
      btnLogOut.addEventListener("click", userLogOut);

      notes[user.email]?.forEach((note) => {
        const li = document.createElement("li");
        li.innerText = note
        notesContainer.appendChild(li);
      })
    } else {
      form.style.display = "block";
    }

    // formOfnotes.addEventListener("submit", function (e) {
    //   preventdefault();
    //   const newNote = e.target.textNote.value;
    //   const newNotes = JSON.stringify({ ...notes, [user.email]: [...notes?.[user.email] || [], newNote] });
    //   localStorage.setItem('Notes', newNotes);
    //   window.location.reload();
      
    // });
  }
  );
});

function userLogOut() {
  auth.signOut()
  
  window.location.reload();
}



// function afterLogged() {

//   const loggedInUser = JSON.parse(localStorage.getItem("userLogin"));
//   const notes = JSON.parse(localStorage.getItem('Notes')) || {}


//   if (loggedInUser) {
//     form.style.display = "none";``
//     formOfnotes.style.display = "block";

//     const logInText = document.createElement("p");
//     logInText.innerText = `Zostałeś automatycznie zalogowany : ${loggedInUser.email}`;
//     body.appendChild(logInText);

//     btnLogOut.style.display = "block";
//     btnLogOut.addEventListener("click", userLogOut);

//     notes[loggedInUser.email]?.forEach((note) => {
//       const li = document.createElement("li");
//       li.innerText = note
//       notesContainer.appendChild(li);
//     })
//   } else {
//     form.style.display = "block";
//   }

//   formOfnotes.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const newNote = e.target.textNote.value;
//     const newNotes = JSON.stringify({...notes, [loggedInUser.email]: [...notes?.[loggedInUser.email] || [], newNote ]});
//     localStorage.setItem('Notes', newNotes);
//     window.location.reload();
//   });
// }




