//user clicks button 
//consume API
//send back random image to html
let img = document.getElementsByTagName("img")
img[0].setAttribute("src", "https://images.dog.ceo/breeds/germanshepherd/n02106662_855.jpg")
img[0].style.width = "300px"
img[0].style.height= "300px"
// can do this as well img[0].src = path

//accessing button element and all its method properties
let button = document.getElementsByTagName("button")
//assign a listener for a click on the button
button[0].addEventListener("click", ()=>{
//consume api


//endpoint https://dog.ceo/api/breeds/image/random Fetch!
//json
//how much data- one object 
//what data looks like - message with image and success 

//HTTP request


//utilize the endpoint with correct method(verb)
const baseURL = "https://dog.ceo/api/breeds"
let route= "image/random"
let endpoint = `${baseURL}/${route}`

//get a response; if ok parse the data, else error
fetch (endpoint)
.then((response) => {
    console.log(response)

    if(response.ok){
        return response.json();
    }else {
        throw error ("broken")
    }
})

//do something with the parsed data(object)
.then(data =>{
  img[0].setAttribute("src", data.message)
  
  console.log(data)
  
})




//handle the error 
.catch(err =>{
    console.log(err);
})

})