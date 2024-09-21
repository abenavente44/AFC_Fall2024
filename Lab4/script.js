document.addEventListener("DOMContentLoaded", () => {
  // Image Carousel and Menu Info
  const imgArray = ["street.jpg", "burritos.jpg", "salad.jpg", "chalupa.jpg", "flautas.jpg"];
  const menuInfoArray = [
      { title: "Street Tacos", description: "Description: A vibrant street scene of three tacos with a side of rice and beans.", price: 10.5 },
      { title: "Burritos", description: "Description: Delicious burritos filled with fresh ingredients.", price: 8.99 },
      { title: "Salad", description: "Description: A healthy and colorful salad.", price: 7.25 },
      { title: "Chalupas", description: "Description: A tasty chalupa with all the fixings.", price: 9.75 },
      { title: "Flautas", description: "Description: Three fried tacos served with a side of rice and beans.", price: 10.75 }
  ];

  const nextImage = document.getElementById("next");
  const prevImage = document.getElementById("prev");
  const img = document.getElementById("image2");
  const menuInfo = document.getElementById("menu-info");
  let counter = 0;

  const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });

  const updateContent = () => {
      img.src = `./assets/${imgArray[counter]}`; 
      img.alt = menuInfoArray[counter].title;
      const { title, description, price } = menuInfoArray[counter];
      menuInfo.innerHTML = `<h2>${title}</h2><div>${description}</div><div style="margin-top: 10px;">Price: ${formatter.format(price)}</div>`;
  };

  nextImage.addEventListener("click", () => {
      counter++;
      if (counter >= imgArray.length) {
          counter = 0;
      }
      updateContent();
  });

  prevImage.addEventListener("click", () => {
      counter--;
      if (counter < 0) {
          counter = imgArray.length - 1;
      }
      updateContent();
  });

  // Display the word "Menu" above the title
  const menuHeader = document.createElement("h1");
  menuHeader.innerText = "Menu";
  menuInfo.parentNode.insertBefore(menuHeader, menuInfo);

  updateContent(); 

});
  // Form Validation
  document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hiring2');
  const fnameInput = document.getElementById("fname");
  const lnameInput = document.getElementById("lname");
  const ageInput = document.getElementById("age");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const address1Input = document.getElementById("address1");
  const address2Input = document.getElementById("address2");
  const cityInput = document.getElementById("city");
  const stateInput = document.getElementById("state");
  const maritalStatusInputs = document.querySelectorAll('input[name="isMarried"]');
  const favoriteColorInputs = document.querySelectorAll('input[type="checkbox"]');
  const descriptionInput = document.getElementById("description");
  const charCount = document.createElement('div');
  form.reset(); 
 descriptionInput.parentElement.appendChild(charCount);
 updateCharCount();

descriptionInput.addEventListener("input", updateCharCount);

function updateCharCount() {
     const remaining = 30 - descriptionInput.value.length;
     charCount.innerText = `${remaining} characters remaining`;
 }
form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        charCount.id = "charCount";
        charCount.innerText = '';
    
const age = parseInt(ageInput.value);
console.log("Age input value:", ageInput.value);
if (isNaN(age) || age < 21 || age > 99) {
       alert("Age must be a number between 21 and 99.");
       return; 
 }
  // Validate Phone Number
const phonePattern = /^\d{3}-\d{3}-\d{4}$/; // Pattern for 111-222-3333
if (!phonePattern.test(phoneInput.value)) {
      alert("Phone number must be in the format 111-222-3333.");
      return;
}
// Validate Description Length and Check if Empty
if (descriptionInput.value.trim() === '') {
    alert("Description cannot be empty.");
    descriptionInput.focus();
    return; 
}  
console.log("First Name:", fnameInput.value);
console.log("Last Name:", lnameInput.value);
console.log("Address 1:", address1Input.value);
console.log("Address 2:", address2Input.value);
console.log("City:", cityInput.value)
console.log("State:", stateInput.value);
console.log("Age:", ageInput.value);
console.log("Phone:", phoneInput.value);
console.log("Email:", emailInput.value);
console.log("Password:", passwordInput.value);
console.log("More Info:", descriptionInput.value);
 let maritalStatus = '';
 maritalStatusInputs.forEach(input => {
     if (input.checked) {
         maritalStatus = input.value;
     }
 });
 console.log("Marital Status:", maritalStatus);
 const favoriteColors = [];
 favoriteColorInputs.forEach(input => {
     if (input.checked) {
         favoriteColors.push(input.value);
     }
 });
console.log("Favorite Colors:", favoriteColors.join(', '));
alert("Form submitted successfully!");
form.submit(); 

});

});








  