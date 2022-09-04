document.getElementById("blog-btn").addEventListener("click", () => {
  const allNewsDataContainer = document.getElementById(
    "all-news-data-container"
  );
  const blog = document.getElementById("blog-container");
  dyCategory.classList.remove("d-flex");
  dyCategory.classList.add("d-none");
  allNewsDataContainer.classList.add("d-none");
  blog.classList.remove("d-none");
});

document.getElementById("news-btn").addEventListener("click", () => {
  const allNewsDataContainer = document.getElementById(
    "all-news-data-container"
  );
  const dyCategory = document.getElementById("dyCategory");
  const blog = document.getElementById("blog-container");
  dyCategory.classList.add("d-flex");
  dyCategory.classList.remove("d-none");
  allNewsDataContainer.classList.remove("d-none");
  blog.classList.add("d-none");
});

const newsCategory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((dataGet) => showCategories(dataGet.data.news_category))
    .catch((err) => console.log(err));
};
const showCategories = (categories) => {
  const dynamicCategory = document.querySelector(".dynamic-category");
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.classList.add("nav-link");
    li.setAttribute("onclick", `newsGet("${category.category_id}")`);
    li.innerHTML = `<a class="nav-link" href="#">${category.category_name}</a>`;
    dynamicCategory.appendChild(li);
  });
  const myloader = document.getElementById("myloader");
  myloader.classList.add("d-none");
};

const newsGet = async (categoryId) => {
  const catSpin = document.getElementById("category-spin");
  catSpin.classList.remove("d-none");
  catSpin.classList.add("d-flex");
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  const dataCountContainer = document.getElementById("data-count-container");
  dataCountContainer.classList.add("d-none");
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNews(data.data))
    .catch((error) => console.log(error));
};

const showNews = (allNews) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  const dataCountContainer = document.getElementById("data-count-container");
  dataCountContainer.classList.remove("d-none");
  const dataCount = document.getElementById("data-count");
  dataCount.innerHTML = allNews.length;
  allNews && allNews.length !== 0
    ? allNews.forEach((news) => {
        const div = document.createElement("div");
        div.classList.add("card", "rounded-4", "mb-3", "col-12");
        div.innerHTML = `
    <div class="row g-0">
            <div class="col-lg-4 col-md-4 col-sm-12 col-12  p-3">
              <img
                src="${news.thumbnail_url}"
                class="img-fluid rounded-4 w-100"
                alt="..."
              />
            </div>
            <div class="col-lg-8 col-md-8 col-sm-12 col-12 position-relative">
              <div class="card-body">
                <h1 class="card-title fw-bold news-title">
                  ${news.title}
                </h1>
                <p class="card-text text-des mb-5 mt-2 p-lg-1">
                  ${news.details}
                </p>
                <div class="row news-footer align-items-center">
                  <div
                    class="col-lg-4 col-md-4 col-sm-5 col-5 d-flex justify-content-evenly align-items-center"
                  >
                    <div class="author-img me-2">
                      <img class="img-fluid"
                        src="${news.author.img}"
                        alt=""
                      />
                    </div>
                    <div>
                      <h5 class="fw-bold author-name">${
                        news.author.name !== null || news.author.name === ""
                          ? news.author.name
                          : "No Data Found"
                      }</h5>
                      <p class="date-published">${
                        news.author.published_date !== null
                          ? news.author.published_date.slice(0, 10)
                          : "2022-10-10"
                      }</p>
                    </div>
                  </div>
                  <div class="col-lg-2 col-lg-2 col-sm-2 col-2 views">
                    <i class="fa-regular fa-eye me-lg-2 me-1"></i>${
                      news.total_view !== null
                        ? news.total_view
                        : "No data found"
                    }
                  </div>
                  <div
                    class="col-lg-4 col-md-4 col-sm-3 col-2 d-flex justify-content-center align-content-center stars"
                  >
                    <i class="fa-solid fa-star"></i
                    ><i class="fa-solid fa-star"></i
                    ><i class="fa-solid fa-star"></i
                    ><i class="fa-solid fa-star"></i
                    ><i class="fa-solid fa-star"></i>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-2 col-2 fs-5 px-lg-3 px-md-3 pe-sm-3 ps-3 text-center">
                    <i  onclick="showDetails('${
                      news._id
                    }')" type="button" data-bs-toggle="modal" data-bs-target="#newsModal" class="fa-sharp fa-solid fa-arrow-right fs-1 cursor-pointer"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
        newsContainer.appendChild(div);
      })
    : alert("No Data Found");

  const catSpin = document.getElementById("category-spin");
  catSpin.classList.remove("d-flex");
  catSpin.classList.add("d-none");
};

const showDetails = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();
  showNewsDetails(data.data);
};

const showNewsDetails = (newsData) => {
  const modalTitle = document.getElementById("newsModalLabel");
  const modalBody = document.getElementById("modal-body");
  newsData?.forEach((data) => {
    modalTitle.innerText = `${data.title}`;
    modalBody.innerHTML = `
    <div class="author-img me-2"><img class="img-fluid" src="${
      data.author.img
    }" alt=""/></div>
      Author Name : <h2>${
        data.author.name !== null || data.author.name === ""
          ? data.author.name
          : "No Data Found"
      }</h2>

      Views :  <i class="fa-regular fa-eye me-1"></i>${
        data.total_view !== null ? data.total_view : "No Data Found"
      }
      <br>
      Published Date : <p class="date-published">${
        data.author.published_date !== null
          ? data.author.published_date
          : "No data Found"
      }</p>
      News Details : <p class="card-text mb-5 mt-2 p-lg-1">${data.details}</p>
      News Rating : ${data.rating.number} [ ${data.rating.badge} ]

    
    `;
  });
};

newsGet("07");

newsCategory();
