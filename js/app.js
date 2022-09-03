const newsCategory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const dataGet = await res.json();
  showCategories(dataGet.data.news_category);
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
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  const res = await fetch(url);
  const data = await res.json();
  showNews(data?.data);
};

const showNews = (allNews) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  allNews
    ? allNews.forEach((news) => {
        const div = document.createElement("div");
        div.classList.add(
          "card",
          "rounded-4",
          "mb-3",
          "col-lg-12",
          "col-md-12",
          "col-sm-6",
          "col-6"
        );
        div.innerHTML = `
    <div class="row g-0">
            <div class="col-md-4 p-3">
              <img
                src="${news.thumbnail_url}"
                class="img-fluid rounded-4 w-100"
                alt="..."
              />
            </div>
            <div class="col-md-8 position-relative">
              <div class="card-body">
                <h1 class="card-title fw-bold">
                  ${news.title}
                </h1>
                <p class="card-text text-des mb-5 mt-2 fs-5 p-1">
                  ${news.details}
                </p>
                <div class="row news-footer align-items-center">
                  <div
                    class="col-4 d-flex justify-content-evenly align-items-center"
                  >
                    <div class="author-img me-2">
                      <img
                        src="${news.author.img}"
                        alt=""
                      />
                    </div>
                    <div>
                      <h5 class="fw-bold">${
                        news.author.name !== null
                          ? news.author.name
                          : "Anonymous"
                      }</h5>
                      <p>${
                        news.author.published_date !== null
                          ? news.author.published_date.slice(0, 10)
                          : "2022-10-10"
                      }</p>
                    </div>
                  </div>
                  <div class="col-2 fs-2 py-3">
                    <i class="fa-regular fa-eye me-2"></i>${
                      news.total_view !== null ? news.total_view : "0"
                    }
                  </div>
                  <div
                    class="col-4 d-flex fs-2 justify-content-center align-content-center py-4"
                  >
                    <i class="fa-solid fa-star"></i
                    ><i class="fa-solid fa-star"></i
                    ><i class="fa-solid fa-star"></i
                    ><i class="fa-solid fa-star"></i
                    ><i class="fa-solid fa-star"></i>
                  </div>
                  <div class="col-2 fs-2 py-3 text-center">
                    <i class="fa-sharp fa-solid fa-arrow-right fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
        newsContainer.appendChild(div);
      })
    : "no data found";
};

// newsGet();

newsCategory();
