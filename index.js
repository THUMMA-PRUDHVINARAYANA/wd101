let userdataE1 = document.getElementById("user-data");

const FINDDATA = () => {
  let DisplayData = localStorage.getItem("user_entries");

  if (DisplayData) {
   DisplayDatat = JSON.parse(DisplayData);
  } else {
    DisplayData = [];
  }

  return DisplayData;
};

let user_entries = FINDDATA();

const displaydata = () => {
  const DisplayData = FINDDATA();

  const tabledata = DisplayData
    .map((entrydata) => {
      const NAME = `<td >${entrydata.name}</td>`;
      const EMAIL = `<td >${entrydata.email}</td>`;
      const PASSWORD = `<td >${entrydata.password}</td>`;
      const DOB = `<td >${entrydata.dob}</td>`;
      const TC = `<td >${entrydata.tc}</td>`;

      const ROW = `<tr> ${NAME} ${EMAIL} ${PASSWORD} ${DOB} ${TC} </tr>`;

      return ROW;
    })
    .join("\n");

  const table = `<table  class = "table-auto w-full" ><tr>
  
  <th >NAME</th>
  <th >EMAIL</th>
  <th >PASSWORD</th>
  <th >DOB</th>
  <th >Accepted terms?</th>

  </tr> ${tabledata} 
  </table>`;

  let details = document.getElementById("output");
  details.innerHTML = table;
};

const saveuserdata = (event) => {
  event.preventDefault();

  const NAME = document.getElementById("name").value;

  const EMAIL = document.getElementById("email").value;

  const PASSWORD = document.getElementById("password").value;

  const DOB = document.getElementById("dob").value;

  const TC = document.getElementById("tc").checked;

  const entry = {
    NAME,
    EMAIL,
    PASSWORD,
    DOB,
    TC,
  };

  user_entries.push(entry);

  localStorage.setItem("user_entries", JSON.stringify(user_entries));

  displaydata();
};

userdata.addEventListener("submit", saveuserdata);
displaydata();

const email = document.getElementById("email");

email.addEventListener("input", () => valid(email));

const sub = document.getElementById("sbutton");

sub.addEventListener("click", () => valid(email));

function valid(element) {
  const checkemail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (email.value == "" || !checkemail.test(email.value)) {
    element.setCustomValidity("The Email is not correct ");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}

const dob = document.getElementById("dob");

dob.addEventListener("input", () => validatedob(dob));

sub.addEventListener("click", () => validatedob(dob));

function validatedob(element) {
  const newtoday = new Date();
  const dobDatenew = new Date(dob.value);
  const ageinms = newtoday - dobDatenew;
  const agey = ageinms / 1000 / 60 / 60 / 24 / 365.25;

  if (agey < 18 || agey > 55) {
    element.setCustomValidity(
      "Age should be Greater than 18 and less than 55 "
    );
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}
