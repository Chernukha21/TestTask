let btn = document.querySelector('#submit');
let form = document.querySelector('#form');
let input = document.querySelector('#search');
let btnDel = document.querySelector('.button_del');
const BaseUrl = 'http://universities.hipolabs.com/search?country=';


getFromStorage();
const request = (country) => {
    return Promise.resolve().then(() => {
        return fetch(`${BaseUrl}${country}`)
            .then(response => {
                if (!response.ok) {
                    throw `${response.status} - ${response.statusText}`;
                }
                return response.json();
            })
    })
}
function getFromStorage(){
    let takeState = localStorage.getItem('state');
    const state = JSON.parse(takeState);
    console.log(state);
    //так и не додумался как сохранить состояние(((
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    renderTable();
});

function renderTable(country){
    country = input.value;
    country = country.toLocaleLowerCase().trim();
    request(country).then(data => data.map((university, index) => {
        index = index + 1;
        const country = document.querySelector('.table_rows');
        let dataToStore = JSON.stringify(data);
        localStorage.setItem('state', dataToStore);
        const state = JSON.parse(dataToStore);
        country.insertAdjacentHTML('beforeend', `
        <tr>
            <th scope="row">${index}</th>
             <td>${university.country}</td>
             <td>${university.name}</td>
             <td><a href="${university.web_pages[0]}">${university.web_pages[0]}</a></td>   
             <td><input type="checkbox" class="check"></td>
        </tr>
        `)
    }));
}
document.addEventListener('change', e => {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    const amountPlace = document.querySelector('.amount');
    amountPlace.textContent = checked.length;
});

btnDel.addEventListener('click', (e) => {
    const country = document.querySelector('.table_rows');
    country.innerHTML = "";
});


