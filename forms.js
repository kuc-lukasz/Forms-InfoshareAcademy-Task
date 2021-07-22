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

  const isUserPasswordCorrect =  users?.some(user => (
    user.password === form.pass.value
  ))


  if (operation === 'login') {
    if (isUserExist && isUserPasswordCorrect) {
      localStorage.setItem("userLogin", JSON.stringify(SignInData))
    } else { window.alert("Wprowadziłeś złe hasło") }
  }


  if (operation === 'signup') {
    if (!isUserExist) {
      const newUsers = JSON.stringify([...users, SignInData]);
      localStorage.setItem('Users', newUsers);
      localStorage.setItem("userLogin", JSON.stringify(SignInData));

    } else { window.alert("Użytkownik o podanym loginie istnieje w bazie danych") };

  }

  
  afterLogged();
});

function afterLogged() {
  const loggedInUser = JSON.parse(localStorage.getItem("userLogin"));
  const notes = JSON.parse(localStorage.getItem('Notes')) || {}


  if (loggedInUser) {
    form.style.display = "none";``
    formOfnotes.style.display = "block";

    const logInText = document.createElement("p");
    logInText.innerText = `Zostałeś automatycznie zalogowany : ${loggedInUser.email}`;
    body.appendChild(logInText);

    btnLogOut.style.display = "block";
    btnLogOut.addEventListener("click", userLogOut);

    notes[loggedInUser.email]?.forEach((note) => {
      const li = document.createElement("li");
      li.innerText = note
      notesContainer.appendChild(li);
    })
  } else {
    form.style.display = "block";
  }

  formOfnotes.addEventListener("submit", function (e) {
    e.preventDefault();
    const newNote = e.target.textNote.value;
    const newNotes = JSON.stringify({...notes, [loggedInUser.email]: [...notes?.[loggedInUser.email] || [], newNote ]});
    localStorage.setItem('Notes', newNotes);
    window.location.reload();
  });
}


function userLogOut() {
  localStorage.removeItem("userLogin");
  window.location.reload();
}

afterLogged();
