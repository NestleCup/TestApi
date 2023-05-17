const api_key = "c3a27a07-8dbc-4a98-a690-49351cf6df33";
const api_url =
    'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const api_url_search =
    'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='
const api_url_movie_details = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"

getMovies(api_url);
// feth
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": api_key,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}

// _________________________


function getClassByRate(vote) {
    if (vote >= 7) {
        return "green"
    } else if (vote > 5) {
        return "orange";
    } else {
        return "red";
    }
}


function showMovies(data) {
    const moviesEL = document.querySelector(".movies");
    // очищаем поиск
    document.querySelector(".movies").innerHTML = ""

    data.films.forEach((movie) => {
        // console.log(movie)
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
                <div class="movie__cover-inner">
          
                    <img class="movier__cover"
                        src="${movie.posterUrlPreview}"
                        alt="$">
       
                <div class="movie__cover--darkened"></div>
                </div>
                <div class="movie__info">
                    <div class="movie__block">
                        <div class="movie__title">${movie.nameRu}</div>
                        <div class="movie__category">${movie.genres.map(
            (genre) => `${genre.genre}`
        )}</div>  
                        <div class="movie__year">${movie.year} год </div>
                        <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
                    </div>
                    <button class="button__open" id="myBtn">Подробнее</button>
                </div>
                `;
        movieEl.addEventListener("click", () => openModal(movie.filmId))
        moviesEL.appendChild(movieEl);
    });
}
// подробнее

// --------------

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiUrlSearch = `${api_url_search}${search.value}`
    if (search.value) {
        getMovies(apiUrlSearch);

        search.value = ""
    }
});

// модальное окно
// // const btn = document.querySelector(".button__open");
// // const closeBtn = document.querySelector(".button__close");


// // function OpenSearh(){
// //     btn.onclick = function() {
// //     modal.style.display = "block";
// // }
// // closeBtn.onclick = function() {
// //     modal.style.display = "none";
// // }
// // window.onclick = function(event) {
// //     if (event.target == modal) {
// //         modal.style.display = "none";
// //     }
// // }
// // }
const modalEl = document.getElementById("modal");

async function openModal(id) {

    const resp = await fetch(api_url_movie_details + id, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": api_key,
        },
    });
    const respData = await resp.json();

    modalEl.classList.add("modal--show");

    modalEl.innerHTML = `
            <div class="modal__container">
            <button class="button__close">X</button>
            <div class="modal__img">
                <img class="modal__cover"
                    src="${respData.posterUrl}" alt="">
            </div>
            <div class="modal__info">
                <div clas="modal__title">${respData.nameRu}</div>
                <div class="modal__genre">Жанр: ${respData.genres.map((el) => `<span>${el.genre}</span>`)} </div>
                 <div class="modal__runtime">Продолжительность: ${respData.filmLength}минуты</div>
              <a href="${respData.webUrl}" class="modal__site"> ${respData.webUrl}</a>
                <div class="modal__overview">${respData.description}</</div>
            </div>
            </div>
        `
    const btnClose = document.querySelector(".button__close")
    btnClose.addEventListener("click", () => closeModal())
}

function closeModal() {
    modalEl.classList.remove("modal--show")
}
window.addEventListener("click", (e) => {
    if (e.target === modalEl) {
        closeModal()
    }
})



// formValid

let FormVal = document.querySelector('.form-wrap'),
    formInputs = document.querySelectorAll('.form-input'),
    inputEmail = document.querySelector('.form-input__email'),
    inputPassword = document.querySelector('.form-input__password'),
    inputCheckbox = document.querySelector('.checkbox__input');


function ValidateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function ValidateCount(country) {
    let re = new RegExp(`.co$`);
    return re.test(String(country).toLowerCase());
}
function ValidatePassword(password) {
    let re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    return re.test(String(password).toLowerCase());
}


FormVal.onsubmit = function () {
    let emailVal = inputEmail.value,
        PasswordVal = inputPassword.value;
    emptyInputs = Array.from(formInputs).filter(input => input.value === '')

    formInputs.forEach(function (input) {
        if (input.value === '') {
            input.classList.add('_error');
        } else {
            input.classList.remove('_error');
        }
    });

    if (emptyInputs.length !== 0) {
        console.log('inputs not filled')
        return false;
    }

    if (!ValidateEmail(emailVal)) {
        console.log('Email not valid');
        inputEmail.classList.add('_error');
        return false;
    } else {
        inputEmail.classList.remove('_error');
    }

    if (ValidateCount(emailVal)) {
        console.log('Email from Columbia');
        inputEmail.classList.add('_error');
        return false;
    } else {
        inputEmail.classList.remove('_error');
    }

    if (!inputCheckbox.checked) {
        console.log('Checkbox not cheked');
        inputCheckbox.classList.add('_error');
        return false;
    } else {
        inputCheckbox.classList.remove('_error')
    }
    if (ValidatePassword(PasswordVal)) {
        console.log('Password not valid');
        inputPassword.classList.add('_error');
        return false;
    } else {
        inputPassword.classList.remove('_error');
    }
}
// ________________________________

const registerForm = document.getElementById('form');


const onSubmit = async (e) => {
    e.preventDefault();
    const data = {};

    const formDate = new FormData(registerForm);

    formDate.forEach((value, key) => data[key] = value);

    delete data?.agreement;

    const response = await fetch('http://localhost:3000/profiles',
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
    const responseData = await response.json();
    console.log(responseData);
}


