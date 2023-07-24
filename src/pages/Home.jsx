import { useState, useEffect } from "react"
import axios from 'axios';
import { create } from 'zustand';

import RecipesList from "../components/RecipesList";

const useRecipesStore = create((set) => ({
    recipes: [],
    curPosition: 0,
    pageNumber: 1,
    setRecipes: (data) => set((state) => ({ recipes: data })),
    setCurPosition: (curPosition) => set((state) => ({ curPosition })),
    setPageNumber: (pageNumber) => set((state) => ({ pageNumber })),
}));

const Home = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const recipes = useRecipesStore((state) => state.recipes);
    const setRecipes = useRecipesStore((state) => state.setRecipes);
    const recipesPerPage = 15;

    const curPosition = useRecipesStore((state) => state.curPosition);
    const setCurPosition = useRecipesStore((state) => state.setCurPosition);

    const pageNumber = useRecipesStore((state) => state.pageNumber);
    const setPageNumber = useRecipesStore((state) => state.setPageNumber); 

    const url = `https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=${recipesPerPage}`;

    const getData = async () => {
        try {
          const { data } = await axios.get(url);
          setRecipes(data);
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        getData();
    }, []);
  
    const handleSelectionChange = (selectedIds) => {
        setSelectedItems(selectedIds);
    };

    const handleDelete = () => {
        const updatedRecipes = recipes.filter((recipe) => !selectedItems.map(Number).includes(recipe.id));
        setSelectedItems([]); 
        updateArray(updatedRecipes)
    };

    const updateArray = async(updatedRecipes) => {
        let url = '';
        if(curPosition === 0){
            setPageNumber(pageNumber + 1);
            url = `https://api.punkapi.com/v2/beers?page=${pageNumber + 1}&per_page=${recipesPerPage}`;
        } else {
            url = `https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=${recipesPerPage}`;
        }
        const { data } = await axios.get(url);

        const limit = recipesPerPage - updatedRecipes.length
        const arr = [...updatedRecipes, ...data.slice(curPosition, curPosition + limit)];

        setRecipes(arr);
        if(curPosition + limit >= recipesPerPage){
            setCurPosition(0)
        } else {
            setCurPosition(curPosition + limit) 
        }
    }

    return (<>
        {selectedItems.length > 0 && 
            (<button onClick={handleDelete} className="delete-button">
                Delete
            </button>)
        }
        
        <RecipesList recipes={recipes} onSelectionChange={handleSelectionChange}/>
    </>);
}

export default Home;