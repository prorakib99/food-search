const dataLoad = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
    .then(res => res.json())
    .then(data => foodLoad(data.meals))
}

const foodLoad = foods => {
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerText = '';

    foods.forEach(food => {
        // console.log(food);

        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food');
        foodDiv.innerHTML = `
        <div class="grid grid-cols-12 gap-6 items-center border border-[#100f0f1a] rounded-lg">
            <div class="col-span-5 w-full h-full">
                <img class="rounded-s-lg w-full h-full block img-fluid" src="${food.strMealThumb}" alt="">
            </div>
            <div class="pe-7 col-span-7 py-5 lg:py-1">
                <h4 class="text-[#403F3F] text-[25px] font-bold mb-4">${food.strMeal}</h4>
                <p class="text-[#706F6F] text-lg font-normal mb-6 ">${food.strInstructions.substring(0,120)}</p>
                <button data-bs-target="#food-btn" data-bs-toggle="modal" onclick="loadFoodDetails('${food.idMeal}')" class="text-[#FFC107] text-lg font-semibold underline hover:no-underline">View Details</button>
            </div>
        </div> 
        `;
        foodContainer.appendChild(foodDiv);
    });
}

const searchData = () => {
    const searchValue = document.getElementById('search-field').value;
    dataLoad(searchValue);
}

const loadFoodDetails = foodId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.meals[0]))
}

const displayDetails = details => {
    console.log(details);
    const foodTitle = document.getElementById('food-btnLabel');
    foodTitle.innerText = details.strMeal;

    const foodImage = document.getElementById('food-img');
    foodImage.src = details.strMealThumb;

    const category = document.getElementById('foodCategory');
    category.innerText = details.strCategory;

    const area = document.getElementById('foodArea');
    area.innerText = details.strArea;

    const instructions = document.getElementById('instructions');
    instructions.innerText = details.strInstructions;

    const youtube = document.getElementById('youtube');
    youtube.innerText = details.strYoutube;
    youtube.href = details.strYoutube;
}


dataLoad('fish');