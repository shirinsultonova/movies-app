const elList = document.querySelector(".movie-list");
const elTemplate = document.querySelector(".template").content;
const fragment = document.createDocumentFragment();
const myModal = document.querySelector(".modal");
const searchForm = document.querySelector(".search-form");
const ratingForm = document.querySelector(".rating-form");
const fromForm = document.querySelector(".from-form");
const sortForm = document.querySelector(".sort-form");
const sortSelect = document.querySelector(".sort-select")
const sortSelectA = document.querySelector(".sort-select-a");
const sortSelectZ = document.querySelector(".sort-select-z");
const formInput = document.querySelector(".search-input");
const formInputRating = document.querySelector(".rating-input");
const fromInputRating = document.querySelector(".from-input");
const toInputRating = document.querySelector(".to-input");
const elSelect = document.querySelector(".select");
const elSelectBtn = document.querySelector(".filter-btn");


const myArr = movies.splice(0, 101);

function findTime(date){
    return `${Math.floor(date / 60)} hr ${date % 60} min`
}

function showMovies(arr){
    elList.innerHTML = "";
    for (const movie of arr) {
        const clonedTemplate = elTemplate.cloneNode(true);
        
        clonedTemplate.querySelector(".movie-image").src = `http://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg`; 
        clonedTemplate.querySelector(".movie-title").textContent = movie.title
        clonedTemplate.querySelector(".movie-star").textContent = movie.imdb_rating;
        clonedTemplate.querySelector(".movie-year").textContent = movie.movie_year;
        clonedTemplate.querySelector(".movie-hour").textContent = findTime(movie.runtime);
        clonedTemplate.querySelector(".movie-categories").textContent = movie.Categories.split("|").join(", ")
        clonedTemplate.querySelector(".js-modal-btn").dataset.mybtn = movie.imdb_id
        fragment.appendChild(clonedTemplate)
    }   
    elList.appendChild(fragment)
}

function findImdbid(mybtn){
    let myFind = myArr.find(function(myMovie){
        return myMovie.imdb_id == mybtn
    })
    
    const modalTitle = document.querySelector(".modal-title");
    const modalStars = document.querySelector(".mymodal-stars");
    const modalHour = document.querySelector(".mymodal-hour");
    const modalCalendar = document.querySelector(".mymodal-calendar");
    const modalTriller = document.querySelector(".mymodal-triller");
    const modalSummary = document.querySelector(".mymodal-summary");
    const modalLink = document.querySelector(".mymodal-link").href = `https://www.imdb.com/title/${myFind.imdb_id}`;
    const modalIframe = document.querySelector(".mymodal-iframe").src = `https://www.youtube-nocookie.com/embed/${myFind.ytid}`
    
    modalTitle.textContent = myFind.title;
    modalStars.textContent = myFind.imdb_rating;
    modalHour.textContent = findTime(myFind.runtime);
    modalCalendar.textContent = myFind.movie_year;
    modalTriller.textContent = myFind.Categories.split("|").join(", ");
    modalSummary.textContent = myFind.summary;
}

elList.addEventListener("click", function(evt){
    if(evt.target.matches(".js-modal-btn")){
        findImdbid(evt.target.dataset.mybtn)
    }
})

// Stop Modal video
myModal.addEventListener("hidden.bs.modal", function(){
    let modalIframe = document.querySelector(".mymodal-iframe").src = ``
})
showMovies(myArr)

// Search movie
searchForm.addEventListener("keyup", function(evt){
    evt.preventDefault();
    let elInputVal = formInput.value;
    let elInputValLower = elInputVal.toLowerCase()
    let searchMovi = myArr.filter(film =>{
        let finded = film.title.toLowerCase()
        return finded.includes(elInputValLower)
    })
    showMovies(searchMovi)
})

// Select option filter
let genres = []
function filterMovies(myArr, select){
    myArr.forEach(film =>{
        const genresMovies = film.Categories.split("|")
        
        genresMovies.forEach(categorie =>{
            if(!genres.includes(categorie)){
                genres.push(categorie)
            }
        })
    })
    genres.sort()
    
    genres.forEach(find =>{
        let option = document.createElement("option");
        option.value = find.split(",", 1);
        option.textContent = find.split(",", 1);
        select.appendChild(option)
    })
    
    elSelectBtn.addEventListener("click", function(evt){
        evt.preventDefault();
        const selectValue = select.value;
        const findCategori = myArr.filter(item =>{
            return item.Categories.includes(selectValue)
        })
        showMovies(findCategori)
    })
}
filterMovies(myArr, elSelect)

// Rating search
ratingForm.addEventListener("keyup", function(evt){
    evt.preventDefault();
    let elInputVal = formInputRating.value;
    let elInputValNum = Number(elInputVal);
    const findRating = myArr.filter(item =>{
        return item.imdb_rating >= elInputValNum
    })
    showMovies(findRating)
})

// Year
fromForm.addEventListener("keyup", function(evt){
    evt.preventDefault()
    let elInputValFrom = fromInputRating.value;
    let elInputValTo = toInputRating.value;
    
    const findYear = myArr.filter(item =>{
        return elInputValFrom < item.movie_year && elInputValTo > item.movie_year
    })
    showMovies(findYear)
})



// Sort a-z
sortSelect.addEventListener("click", function(evt){

    if (evt.target.value == "a-z") {
        let sortName = myArr.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0)); 
        showMovies(sortName);
    }
    if (evt.target.value == "z-a") {
        let sortName = myArr.sort((a, b) => b.title.charCodeAt(0) - a.title.charCodeAt(0)); 
        showMovies(sortName);
    }

})
