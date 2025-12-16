const passwordInput = document.getElementById("YourPassword");
const container = document.querySelector(".container");
const show = document.querySelector(".show");

const rules = {
  len: document.getElementById("len"),
  upper: document.getElementById("upper"),
  number: document.getElementById("number"),
  symbol: document.getElementById("symbol"),
};

function checkStrength(password){
  let strength = 0;

  if(password.length >= 8){
    rules.len.classList.add("active");
    strength++;
  } else rules.len.classList.remove("active");

  if(/[A-Z]/.test(password)){
    rules.upper.classList.add("active");
    strength++;
  } else rules.upper.classList.remove("active");

  if(/[0-9]/.test(password)){
    rules.number.classList.add("active");
    strength++;
  } else rules.number.classList.remove("active");

  if(/[^A-Za-z0-9]/.test(password)){
    rules.symbol.classList.add("active");
    strength++;
  } else rules.symbol.classList.remove("active");

  container.className = "container";
  if(strength <= 1) container.classList.add("weak");
  else if(strength <= 3) container.classList.add("moderate");
  else container.classList.add("strong");
}

passwordInput.addEventListener("input", e=>{
  checkStrength(e.target.value);
});

/* SHOW / HIDE */
show.onclick = ()=>{
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
  show.classList.toggle("hide");
};

/* GENERATE */
document.getElementById("generate").onclick = ()=>{
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let pass = "";
  for(let i=0;i<12;i++)
    pass += chars[Math.floor(Math.random()*chars.length)];

  passwordInput.value = pass;
  checkStrength(pass);
};

/* COPY */
document.getElementById("copy").onclick = ()=>{
  navigator.clipboard.writeText(passwordInput.value);
};
