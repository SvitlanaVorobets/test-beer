import { useState } from 'react';
import { Link } from 'react-router-dom';

const RecipesList = ({recipes, onSelectionChange}) => {
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (id, event) => {
        const isChecked = event.target.checked;

        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [id]: isChecked
        }));

        const selectedIds = Object.entries({
            ...checkedItems,
            [id]: isChecked,
          })
        const ids = []
        for(let it of selectedIds){
            if(it[1]) ids.push(it[0])
        }
        onSelectionChange(ids);
    };

    return(<>
        <div className="grid-container">
            { recipes?.map((item) => {
                const { id, name, tagline, first_brewed, description } = item;

                return(
                    <div key={id} className="grid-item">
                        <input
                            type="checkbox"
                            className='checkbox'
                            checked={checkedItems[id] || false} 
                            onChange={(event) => handleCheckboxChange(id, event)}
                        />
                        <h3>{id}. {name}</h3>
                        <p>{tagline}</p>
                        <hr />
                        <p>{description}</p>
                        <Link to={`/recipe/${id}`}>
                            <button>More detail</button>
                        </Link>
                        <p className="date">First brewed: {first_brewed}</p>
                    </div>
                )
            }) }
        </div>
    </>)
}

export default RecipesList;