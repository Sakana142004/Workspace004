const button = document.querySelector("button");
button.addEventListener("click",()=>{
  if(navigator.geolocation){
   button.innerText = "Allow to detect location";
   navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  else{
    button.innerText = "Your browser not support";
  }
});
function onSuccess(position){
    button.innerText = "Detecting your location...";
  let {latitude,longitude} = position.coords;
  let apikey = 'e2fda669ad5a48b89efd1b1b15829de8';
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`)
  .then(response => response.json()).then(result => {
    let allDetails = result.results[0].components;
    let {county, postcode, country,state,road,road_reference} = allDetails;
    button.innerText = `${county},${postcode},${country},${state},${road},${road_reference}`;
    console.table(allDetails);
  }).catch(()=>{
    button.innerText = "Something went wrong";
  })
}
function onError(error){
  if(error.code == 1){
    button.innerText = "Your browser not support";
  }
  else if(error.code == 2){
    button.innerText = "Your location is not available";
  }
  else{
    button.innerText = "Something went wrong";
  }
  button.setAttribute("disabled","true");
}
