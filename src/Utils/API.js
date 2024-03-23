import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const generateRandomRating = () => {
  return Math.floor(Math.random() * 6) + 1; // Generates a random rating between 1 and 5
};

export const fetchProducts = async () => {
  try {
    let response = await axios.get(`${BASE_URL}/search.php?s=`);
    const mealsWithRatings = response.data.meals.map((meal) => ({
      ...meal,
      rating: generateRandomRating(),
    }));
    // console.log("okkk", mealsWithRatings);
    return { meals: mealsWithRatings || [] };
  } catch (error) {
    console.error("Error fetching products: ", error);
    return { meals: [] };
  }
};

export const fetchProductsByCountry = async (country) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter.php?a=${country}`);
    const mealsWithRatings = response.data.meals.map((meal) => ({
      ...meal,
      rating: generateRandomRating(),
    }));

    const enrichedData = await Promise.all(
      mealsWithRatings.map(async (dish) => {
        const details = await fetchDishDetailsById(dish.idMeal);
        if (details) {
          return {
            ...dish,
            ...Object.fromEntries(
              Object.entries(details).filter(
                ([key]) => !(key in dish) && key !== "idMeal"
              )
            ),
          };
        }
        return dish;
      })
    );

    console.log("country", enrichedData);
    return { meals: enrichedData || [] };
  } catch (error) {
    console.error("Error fetching products by country:", error);
    return { meals: [] };
  }
};

export const fetchDishDetailsById = async (idMeal) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );

    const data = await response.json();
    console.log("data:", data);
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching dish details:", error);
    return null;
  }
};

export const fetchCountryList = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );

    const data = await response.json();
    console.log("data:", data);
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching country list:", error);
  }
};

export const fetchProductByName = async (searchQuery) => {
  try {
    console.log("search: ", searchQuery);
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
