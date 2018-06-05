// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $DateTimeInput = document.querySelector("#date");
var $CityInput = document.querySelector("#city");
var $StateInput = document.querySelector("#state");
var $CountryInput = document.querySelector("#country");
var $ShapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $recordCounter = document.querySelector("#recordCounter");
var $pages = document.querySelector("#pages");
var $loadBtn = document.querySelector("#load");
var $nextBtn = document.querySelector("#next");
var $prevBtn = document.querySelector("#prev");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$loadBtn.addEventListener("click", handleReloadButtonClick);
$nextBtn.addEventListener("click", handleNextButtonClick);
$prevBtn.addEventListener("click", handlePrevButtonClick);
$pages.addEventListener("change", handlePagesChange);

// Set filteredData to dataSet initially
var filteredData = dataSet;
var count = 0;

// Define Event handler functions
// handleNextButtonClick increments count and renders
function handleNextButtonClick() {
    count++;
    renderTable();
}
// handlePrevButtonClick decrements count and renders
function handlePrevButtonClick() {
    count--;
    renderTable();
}

// handlePagesChange renders for new record count selected
function handlePagesChange() {
    renderTable();
}
function handleReloadButtonClick() {
    count = 0;
    filteredData = dataSet;
    $DateTimeInput.value = '';
    $CityInput.value = '';
    $StateInput.value = '';
    $CountryInput.value = '';
    $ShapeInput.value = '';

    renderTable();
}


// renderTable renders the filteredData to the tbody
function renderTable() {
    // clear previously rendered table
    $tbody.innerHTML = "";

    // Get number of records to be rendered
    var pages = Number(document.getElementById("pages").value);

    // Initialize local variables
    var start = count * pages + 1;
    var end = start + pages - 1;
    var btn;

    // Adjusts records displayed for end of data and state of Next button
    if (end > filteredData.length) {
      end = filteredData.length;
      btn = document.getElementById("next");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("next");
      btn.disabled = false;
    }

    // Adjusts state of Previous button
    if (start == 1) {
      btn = document.getElementById("prev");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("prev");
      btn.disabled = false;
    }


    // Displays record counts and loads records into table
    $recordCounter.innerText = "From Record: " + start + " to: " + end + " of " + filteredData.length;
    for (var i = 0; i < pages; i++) {
        // Get get the current location object and its fields
        var location = filteredData[i+(count * pages)];
        var fields = Object.keys(location);
        // Create a new row in the tbody, set the index to be i + startingIndex
        var $row = $tbody.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
        // For every field in the location object, create a new cell at set its inner text to be the current value at the current location's field
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = location[field];
        }
    }
}

function handleSearchButtonClick() {
    var filterDate = $DateTimeInput.value.trim();
    var filterCity = $CityInput.value.trim().toLowerCase();
    var filterState = $StateInput.value.trim().toLowerCase();
    var filterCountry = $CountryInput.value.trim().toLowerCase();
    var filterShape = $ShapeInput.value.trim().toLowerCase();

    if (filterDate != "") {
        filteredData = filteredData.filter(function (date) {
        var dataDate = date.datetime;
        return dataDate === filterDate;
        });
    }
    if (filterCity != "") {
        filteredData = filteredData.filter(function (city) {
        var dataCity = city.city;
        return dataCity === filterCity;
        });
    }
    if (filterState != "") {
        filteredData = filteredData.filter(function (state) {
        var dataState = state.state;
        return dataState === filterState;
        });
    }
    if (filterCountry!= "") {
        filteredData = filteredData.filter(function (country) {
        var dataCountry = country.country;
        return dataCountry === filterCountry;
        });
    }
    if (filterShape!= "") {
        filteredData = filteredData.filter(function (shape) {
        var dataShape = shape.shape;
        return dataShape === filterShape;
        });
    }
    renderTable();
}
// function handleSearchButtonClick() {
  
//     // Format the user's search by removing leading and trailing whitespac
//   var filterDateTime = $DateTimeInput.value.trim();

//   // Set filteredData to an array of all locationes whose "DateTime" matches the filter
//   filteredData = dataSet.filter(function(location) {
//     var locationDateTime = location.datetime;

//     // If true, add the location to the filteredData, otherwise don't add it to filteredlocationes
//     return locationDateTime === filterDateTime;
//   });
//   renderTable();
// }

// function handleSearchButtonClick1() {
//     // Format the user's search by removing leading and trailing whitespac
//     var filterDateTime = $CityInput.value.trim().toLowerCase();
  
//     // Set filteredData to an array of all locationes whose "DateTime" matches the filter
//     filteredData = dataSet.filter(function(location) {
//       var locationDateTime = location.city;
  
//       // If true, add the location to the filteredData, otherwise don't add it to filteredlocationes
//       return locationDateTime === filterDateTime;
//     });
//     renderTable();
//   }

// Render the table for the first time on page load
renderTable();