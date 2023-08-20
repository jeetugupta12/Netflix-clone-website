const API_KEY = "93787d37e4fac944652a6e450149288a";
const baseURL = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/original/";

const requests = [
    `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    `/discover/movie?api_key=${API_KEY}&with_genres=99`
]

async function fetchData() {
    for (let i = 0; i < 8; i++) {
        const response = await fetch(`${baseURL}${requests[i]}`);
        const data = await response.json();
        var movies = data.results;
        console.log(movies);
        createRows(movies, i)
    }
    return movies
}
fetchData();

const banner = document.getElementById("banner");
const bannerTitle = document.getElementById("banner-title");
const bannerDescription = document.getElementById('banner-description');
const container = document.getElementById("about-container");
const title = document.getElementById("title");
const date = document.getElementById("date");
const language = document.getElementById("language");
const rating = document.getElementById("rating");
const description = document.getElementById("description");
const close = document.getElementById('close');

const nav = document.getElementById("nav")
// fetch the banner data from api
async function fetchBannerData() {
    const bannerResponse = await fetch(`${baseURL}${requests[0]}`);
    const bannerData = await bannerResponse.json();
    var banners = bannerData.results;
    console.log(banners);
    const select = banners[Math.floor(Math.random() * banners.length)]
    console.log(select);
    
    banner.style.backgroundImage = `url(${imageUrl}${select.backdrop_path})`;
    bannerTitle.textContent = select.name;
    bannerDescription.textContent = select.overview;

}
fetchBannerData()

function createRows(movies, i) {
    movies.map((movie) => {
        const imag = document.getElementById(`image${i}`);
        const poster = document.createElement("img");
        if (i > 0) {
             poster.src = `${imageUrl}${movie.backdrop_path}`
            

        } 
        else {                         // for i=0 means for banner 
            poster.src = `${imageUrl}${movie.poster_path}`;
            poster.classList.add('largeImage');
        }
        poster.classList.add('image')
            imag.appendChild(poster);
        // when we click on the individual poster image
        poster.addEventListener("click", function () {
            console.log(movie)
             container.style.display = "flex";
            const moviePosterImg = document.getElementById("moviePosterImg");
            moviePosterImg.src = `${imageUrl}${movie.poster_path}`;
            title.textContent = (movie.name || movie.title || movie.original_name);
            date.textContent = movie.first_air_date;
            language.textContent = movie.original_language;
            rating.textContent = movie.vote_average;
            description.textContent = movie.overview
        })
        close.addEventListener("click", function () {
            container.style.display = "none"
        })
    })
}


 window.addEventListener("scroll", function () {
   async function ChangeBannerData() {
        const bannerResponse = await fetch(`${baseURL}${requests[0]}`);
        const bannerData = await bannerResponse.json();
        var banners = bannerData.results;
        console.log(banners);
        const select = banners[Math.floor(Math.random() * banners.length)]
        console.log(select);
        banner.style.backgroundImage = `url(${imageUrl}${select.backdrop_path})`;
        bannerTitle.textContent = select.name;
        bannerDescription.textContent = select.overview;
    
    }
    ChangeBannerData();
})