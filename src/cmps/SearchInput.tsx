import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useClickOutside } from "../hooks";

import { IngObj } from "../types/ingredient";
import { RecipeObj } from "../types/recipe";

import { ingredientService } from "../services/ingredient.service";
import { recipeService } from "../services/recipe.service";

import SvgIcon from "./SvgIcon";

import { setRecipe } from "../store/actions/recipes.action";
import { addIngToPantry, removeIngFromPantry } from "../store/actions/user.action";
import { selectLoggedinUser } from "../store/reducers/user.slice";

type SearchInputProps = {
    isPantry: boolean
};
type SearchHandlerObj = {
    searchValue: string
    searchResults: IngObj[] | { name: string, _id: string }[]
}

const SearchInput: React.FC<SearchInputProps> = ({ isPantry }) => {
    const dispatch = useAppDispatch()
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [searchHandler, setSearchHandler] = useState<SearchHandlerObj>({ searchValue: '', searchResults: [] })

    const { searchValue, searchResults } = searchHandler

    const pantry = useAppSelector(selectLoggedinUser).pantry

    const handleInputFocus = (): void => {
        setIsInputFocused(!isInputFocused);
    };


    const handleSearchResult = (res: IngObj | { name: string, _id: string }): void => {
        isPantry ?
            isIngInPantry(res as IngObj) ? dispatch(removeIngFromPantry(res as IngObj)) : dispatch(addIngToPantry(res as IngObj))
            :
            dispatch(setRecipe(res._id))

        resetSearchResults()
    }
    const resetSearchResults = (): void => {

        setSearchHandler(() => ({ searchResults: [], searchValue: '' }))
    }
    const onSearchResults = async (): Promise<void> => {
        let res: IngObj[] | RecipeObj[]

        if (searchValue.trim() === '') return resetSearchResults()

        if (isPantry) {
            res = ingredientService.searchIng(searchValue)
            res = res.slice(0, 6)
        } else {
            res = await recipeService.fetchRecipesBySearch(searchValue)
        }
        setSearchHandler((prevState) => ({ ...prevState, searchResults: res }))
    }

    useEffect(() => {
        const searchTimer = setTimeout(() => {
            onSearchResults()
        }, 500);
        return () => {
            clearTimeout(searchTimer);
        };
    }, [searchValue]);

    const isIngInPantry = (ing: IngObj): boolean => {
        return pantry.some(aisle => aisle.ings.some(i => i._id === ing._id))
    }

    return (

        <div ref={useClickOutside(() => resetSearchResults())} className={`search-input-container ${isInputFocused ? 'input-focused' : ''}`}>
            <SvgIcon iconName="search" className="search-input-icon" />
            <input type="text" className="ellipsis" value={searchValue}
                onChange={(ev) => setSearchHandler((prevState) => ({ ...prevState, searchValue: ev.target.value }))}
                onFocus={handleInputFocus}
                onBlur={handleInputFocus}
                placeholder={isPantry ? "Add/Remove/Paste ingredients" : "Find..."} />
            {searchResults.length !== 0 &&
                <ul className="search-results">

                    {searchResults.map((res: { name: string, _id: string } | IngObj) => (
                        <li onClick={() => handleSearchResult(res)} className="search-results-preview" key={res._id}>
                            {isPantry &&
                                <SvgIcon
                                    iconName={isIngInPantry(res as IngObj) ? 'trash' : 'plus'}
                                    className={`search-results-${isIngInPantry(res as IngObj) ? 'trash' : 'plus'}-icon`}
                                />
                            }
                            <p className="ellipsis">
                                {res.name}
                            </p>
                        </li>
                    ))}
                </ul>
            }
        </div>

    );
}
export default SearchInput