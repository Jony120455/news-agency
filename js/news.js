const Url = 'https://openapi.programming-hero.com/api/news/categories';
const allcatagory = async () => {
    try {
        const res = await fetch(Url);
        const data = await res.json();

        const Data = data.data.news_category;
        const List = document.getElementById('tab-item');
        Data.forEach((element) => {
            const listItem = document.createElement('li');
            listItem.classList.add('nav-item');
            listItem.setAttribute('role', 'presentation');
            listItem.innerHTML = `
            <button class="nav-link" id="pills-profile-tab" onclick="loadNews('${element.category_id}');toogleSpinner(true)" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">${element.category_name}</button>`

            List.appendChild(listItem);
        })
    }
    catch (error) {
        console.log(error);
    }
}
//------- load news 
const loadNews = (category) => {
    const url =  `https://openapi.programming-hero.com/api/news/category/${category}`
    try {
        fetch(url)
            .then(res => res.json())
            .then(res => display(res.data))
    }
    catch (error) {
        console.log('error');
    }
}

function compare(x, y) {
    if (x.total_view < y.total_view) return 1;
    else if (x.total_view > y.total_view) return -1;
    else return 0;
}

const display = (datas) => {
    const dataItem = document.getElementById('news-item');
    dataItem.innerHTML = '';
    const totalItem = document.getElementById('result');
    if (datas.length > 0) {
        totalItem.innerText = datas.length + ' items found';

    }
    else {
        totalItem.innerText = 'No results found';
        toogleSpinner(false);
    }
    datas.sort(compare);


    for (const data of datas) {
        const Div = document.createElement('div');
        Div.classList.add('row');
        Div.innerHTML = `
        <div class="col-md-4">
            <img src="${data.thumbnail_url}" class=" rounded w-100 h-100 py-3" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body pt-4">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">${data.details}</p>
              <div class="d-flex pt-5 justify-content-between">
                <div class="author-details">
                  <img class="rounded-circle" src="${data.author.img}" alt="">
                  <span class="text-primary">${data.author.name != null ? data.author.name : "not found"}</span>
                </div>
                <div class="view pt-4">
                  <i class="fas fa-eye"></i>
                  <span class="text-primary">${data.total_view != null ? data.total_view : "no view"}</span>
                </div>
                <div class="readMore pt-3">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary detailsBtn" onclick="newsDetails('${data._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Read Deatils
                    </button> 
                </div>
              </div>
            </div>
        </div>
                
        `;
        dataItem.appendChild(Div);
        toogleSpinner(false);
    }
}
const toogleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none')
    }
}
//news details

const newsDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    try {
        fetch(url)
            .then(res => res.json())
            .then(res => displayNewsDetails(res.data[0]))
    }
    catch (error) {
        console.log('error');
    }

}
const displayNewsDetails = (id) => {
    const modalTitle = document.getElementById('Modal');
    modalTitle.innerText = id.title;
    const modalImage = document.getElementById('img');
    modalImage.src = id.image_url;
    const modalDetails = document.getElementById('details');
    modalDetails.innerText = id.details .slice(0, 200);
    const authorImage = document.getElementById('author-img');
    authorImage.src = id.author.img;
    const authorTitle = document.getElementById('author-name');
    authorTitle.innerText = id.author.name;
    const totalViwers = document.getElementById('view')
    totalViwers.innerText = id.total_view;

}