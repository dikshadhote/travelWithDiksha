import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
let searchArr=search.split('=');
let adventureId=searchArr[1];
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let adventureDetails=await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`).then(res=>res.json());
   // console.log(adventureDetails);
    return adventureDetails;
    
  }
  catch(err)
  {
    return null;
  }
 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  
  // 1. Add the details of the adventure to the HTML DOM
  let name=document.getElementById('adventure-name');
  name.innerHTML=adventure.name;
  let subTitle=document.getElementById('adventure-subtitle');
  subTitle.innerHTML=adventure.subtitle;

  let images=document.getElementById('photo-gallery');
 
 
  for(let i=0;i<adventure.images.length;i++)
  {
    let imageInCard=document.createElement('img');
    imageInCard.className='activity-card-image pl-3 pr-3';
    imageInCard.setAttribute("src",adventure.images[i]); 
    images.appendChild(imageInCard);
       
  }

 
  

  let adventureContent=document.getElementById('adventure-content');
  adventureContent.innerHTML=adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" id="carousel-inner">

    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
</div>`;

  images.map((image, idx) => {
    let ele = document.createElement("div");
    ele.className = `carousel-item ${idx === 0 ? "active" : ""}`;
    ele.innerHTML = `
    <img
        src=${image}
        alt=""
        srcset=""
        class="activity-card-image pb-3 pb-md-0"
      />
          `;

    document.getElementById("carousel-inner").appendChild(ele);
  });
    
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

if(adventure.available)
{
  document.getElementById("reservation-panel-sold-out").style.display = "none";
  document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
  document.getElementById("reservation-panel-available").style.display="block";
}
else{
  document.getElementById("reservation-panel-available").style.display = "none";
  document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
  document.getElementById("reservation-panel-sold-out").style.display = "block";
}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  
  document.getElementById("reservation-cost").innerHTML=adventure.costPerHead*persons;
 
}


//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 
  $("#myForm").on("submit", function (e) {
    //prevent Default functionality
    e.preventDefault();
    var data = $(this).serialize() + "&adventure=" + adventure.id;
    let url = config.backendEndpoint + "/reservations/new";
    $.ajax({
      url: url,
      type: "POST",
      data: data,
      success: function (response) {
        alert("Success!");
        window.location.reload();
      },
      error: function (xhr, textStatus, errorThrown) {
        alert("Failed!");
      },
    });
  });

}



//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS

  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  if(adventure.reserved)
  {
    //document.getElementById('reserved-banner');
    document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
