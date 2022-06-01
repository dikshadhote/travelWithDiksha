
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  //const parameter = search.substring(search.indexOf('=') + 1);  //this can be also used to extract city name 
  
  const cityParameter=new URLSearchParams(search);// search =?city=bengaluru
 const city=cityParameter.get("city");//extract city present after '='
  
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let response=await fetch(config.backendEndpoint+`/adventures?city=${city}`).then(res=>res.json());
     return response;
   }
   catch(err)
   {
      return null;
   }


}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  

 

  adventures.forEach( adventure => {
    let id=adventure.id;
    let name=adventure.name;
    let imageURL=adventure.image;
    let costPerHead=adventure.costPerHead;
    let currency=adventure.currency;
    let duration=adventure.duration;
    let category=adventure.category;
    
  let adventureCard=document.createElement('div');
  adventureCard.className="col-6 col-lg-3 mb-4 ";

    adventureCard.innerHTML=`<a href="detail/?adventure=${id}" id=${id}>
    <div class="category-banner">${category}</div>
      <div class="activity-card">

      <div>
        <img
          class="img-fluid card-img-top"
          src=${imageURL}
        />
      </div>
        <div class="activity-card-text text-md-center w-100 mt-3">
          <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <h5 class="text-left">${name}</h5>
            <p>₹${costPerHead}</p>
          </div>
            <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <h5 class="text-left">Duration</h5>
            <p>${duration} Hours</p>
          </div>
        </div>
      </div>
    </a>

`;
document.getElementById('data').appendChild(adventureCard);
    
  });



}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let localAdventureList=[];
  list.map(adventureListItem =>{
    if(adventureListItem.duration>=low && adventureListItem.duration<=high )
    {
      localAdventureList.push(adventureListItem);
    }
  })
  
  return localAdventureList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  let localAdventureList=[];
  list.map(adventureListItem =>{
    if(categoryList.includes(adventureListItem.category))
    {
      localAdventureList.push(adventureListItem);     
    }
  }   
  );

  if(categoryList.length==0)
  {
    return list;
  }
  else{
    return localAdventureList;
  }

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 
 // Place holder for functionality to work in the Stubs

 let filteredAdventure=[];
// let filteredAdventureTwice=[];
 if(filters.duration!="" && filters.category.length> 0 )
   {
     let duration=filters["duration"].split("-")
    filteredAdventure=filterByCategory(list,filters.category);
    filteredAdventure=filterByDuration(filteredAdventure,parseInt(duration[0]),parseInt(duration[1]));
    return filteredAdventure;
   }
 else if(filters.category.length > 0)
{
   filteredAdventure=filterByCategory(list,filters.category);
   return filteredAdventure;
}
else if(filters.duration!="")
{
  let duration=filters.duration;
  let durationArray= duration.split("-");
  let low=durationArray[0];
  let high=durationArray[1]
  filteredAdventure=filterByDuration(list,low,high);
  return filteredAdventure;
}
 else       
  return list; //should return list this is temp
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()

//let filterCategory=[...filters.category]
filters={
    'duration':filters.duration,
    'category':[...filters.category]
  };
  
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  let parsedObj=localStorage.getItem('filters');
 
  // Place holder for functionality to work in the Stubs
  //return null;
  return JSON.parse(parsedObj);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  let category=[...filters.category];
  
  if(category)
  {
    category.forEach(categoryElement=>{
      let pill=document.createElement('p');
      pill.innerHTML=categoryElement;
      pill.className="category-filter";
      document.getElementById('category-list').appendChild(pill);
    })
  }
   if(filters.duration)
  {
    
    let pill=document.createElement('p');
      pill.innerHTML=filters.duration+' (hrs)';
      pill.className="category-filter";
      document.getElementById('category-list').appendChild(pill);
  }
 
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
