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
    li.innerHTML = `<a class="nav-link active" href="#">${category.category_name}</a>`;
    dynamicCategory.appendChild(li);
  });
};

newsCategory();
