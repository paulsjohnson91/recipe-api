import { useEffect, useState } from "react";
import Search from "../components/Search";
import RecipeList from "../components/RecipeList";
import { getRecipes } from "../services/api";
import {useLocation} from "react-router-dom";

const Recipes = () => {
  const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  //
  // // Example: Get the value of a specific query parameter named "paramName"
  // const searchValue = queryParams.get('q');
  // console.log(searchValue);
  const [searchedQuery, setSearchedQuery] = useState();
  // const [searchedQuery, setSearchedQuery] = useState("pizza");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getSearchedResult = async () => {
      let result = await getRecipes(searchedQuery);
      if (result && result.recipes) {
        setRecipes(result.recipes);
      }
    };
    getSearchedResult();
  }, [searchedQuery]);

  return (
    <>
      <Search setSearchedQuery={setSearchedQuery} />
      <RecipeList recipes={recipes} searchedQuery={searchedQuery} />
    </>
  );
};

export default Recipes;
