import { useParams } from "react-router-dom"; 
import { useState, useEffect } from "react"
import axios from 'axios';

const RecipePage = () => {
    const recipeId = useParams().id;
    const [recipe, setRecipe] = useState({});

    const url = `https://api.punkapi.com/v2/beers/${recipeId}`;

    const getData = async () => {
        try {
          const { data } = await axios.get(url);
          setRecipe(data[0]);
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        getData();
    }, []);

    const {
        name,
        tagline,
        first_brewed,
        image_url,
        abv,
        ibu,
        target_fg,
        target_og,
        ebc,
        srm,
        ph,
        attenuation_level,
        volume,
        boil_volume,
        method,
        ingredients,
        food_pairing,
        brewers_tips,
        contributed_by,
      } = recipe;

      return (
        <div className="beer-detail-container">
          <div className="beer-info">
            <h1 className="beer-name">{name}</h1>
            <img src={image_url} alt={name} className="beer-image" />
            <p className="tagline">Tagline: {tagline}</p>
            <p className="first-brewed">First Brewed: {first_brewed}</p>
            <p className="abv">ABV: {abv}</p>
            <p className="ibu">IBU: {ibu}</p>
            <p className="target-fg">Target FG: {target_fg}</p>
            <p className="target-og">Target OG: {target_og}</p>
            <p className="ebc">EBC: {ebc}</p>
            <p className="srm">SRM: {srm}</p>
            <p className="ph">pH: {ph}</p>
            <p className="attenuation-level">Attenuation Level: {attenuation_level}</p>
            <p className="volume">Volume: {volume?.value} {volume?.unit}</p>
            <p className="boil-volume">Boil Volume: {boil_volume?.value} {boil_volume?.unit}</p>
            <div className="method">
              <h2>Method:</h2>
              <ul>
                <li>Mash Temp: {method?.mash_temp[0].temp.value} {method?.mash_temp[0].temp.unit}, Duration: {method?.mash_temp[0].duration}</li>
                <li>Fermentation Temp: {method?.fermentation.temp.value} {method?.fermentation.temp.unit}</li>
                <li>Twist: {method?.twist || 'N/A'}</li>
              </ul>
            </div>
            <div className="ingredients">
              <h2>Ingredients:</h2>
              <ul>
                {ingredients?.malt.map((item, index) => (
                  <li key={index}>{item.name}: {item.amount.value} {item.amount.unit}</li>
                ))}
                {ingredients?.hops.map((item, index) => (
                  <li key={index}>{item.name}: {item.amount.value} {item.amount.unit}, Add: {item.add}, Attribute: {item.attribute}</li>
                ))}
                <li>Yeast: {ingredients?.yeast}</li>
              </ul>
            </div>
            <div className="food-pairing">
              <h2>Food Pairing:</h2>
              <ul>
                {food_pairing?.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            </div>
            <p className="brewers-tips">Brewers Tips: {brewers_tips}</p>
            <p className="contributed-by">Contributed By: {contributed_by}</p>
          </div>
        </div>
      );
    };

export default RecipePage;
