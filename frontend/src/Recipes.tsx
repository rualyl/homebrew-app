import * as React from 'react';

import { IRecipe } from 'homebrew-types/BrewingTypes'

interface IRecipeProps {
    recipeId: number,
    isEditing: boolean
}

class Recipe extends React.Component<IRecipeProps> {
    render() {
        let recipeInstance = {
            name: 'abc',
            fermenterVolume: 'def',
            postBoilGravity: 'ghi',
            created: new Date(),
            grainBill: 'jkl',
            kettleHopAdditions: 'mno',
            yeast: 'Kveik'
        };

        return (
            <div className="recipe">
                <ul className="recipe-details">
                    <li>
                        <span>Name:</span>
                        <span>{(recipeInstance as unknown as IRecipe).name}</span>
                    </li>
                    <li>
                        <span>Volume:</span>
                        <span>{recipeInstance.fermenterVolume}</span>
                    </li>
                    <li>
                        <span>Specific Gravity:</span>
                        <span>{recipeInstance.postBoilGravity}</span>
                    </li>
                    <li>
                        <span>Created:</span>
                        <span>{recipeInstance.created.toString()}</span>
                    </li>
                    <li>
                        <span>Grain Bill:</span>
                        <span>{recipeInstance.grainBill}</span>
                    </li>
                    <li>
                        <span>Hops:</span>
                        <span>{recipeInstance.kettleHopAdditions}</span>
                    </li>
                    <li>
                        <span>Yeast:</span>
                        <span>{recipeInstance.yeast}</span>
                    </li>
                </ul>
            </div>
        );
    }
}

interface IRecipesState {
    recipes: IRecipeProps[]
}

export class Recipes extends React.Component<any, IRecipesState> {
    constructor(props: Readonly<{}>) {
        super(props)
        this.state = {
            recipes: [{recipeId: 1, isEditing: false}, {recipeId: 2, isEditing: false}],
        } as IRecipesState;
    }

    render() {
        let recipes = this.state.recipes.map(listEntry => <Recipe recipeId={listEntry.recipeId} isEditing={listEntry.isEditing} />);

        return (
            <div>
                <button className='new-recipe-button'>Create New Recipe</button>
                <textarea className='recipe-filter' />
                <ul>{recipes}</ul>
            </div>
        );
    }
}
