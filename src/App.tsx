import * as React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Home} />
                <Route path="/recipes" component={Recipes} />
                <Route path="/sessions" component={Sessions} />
            </BrowserRouter>
        );
    }
}

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className='home-buttons'>
                    <Link to="/recipes">Recipes</Link>
                    <Link to="/sessions">Sessions</Link>
                </div>
                <div className='home-content'>Home page visuals</div>   
            </div>
        );
    }
}

interface IRecipeProps {
    recipeId: number
}

interface IRecipeState {
    recipeId: number,
    isBeingEdited: boolean
}

class Recipe extends React.Component<IRecipeProps, IRecipeState> {
    constructor(props: IRecipeProps) {
        super(props)
        this.state = {recipeId: props.recipeId, isBeingEdited: false };
    }

    render() {
        return (
            <div>{this.state.recipeId}</div>
        );
    }
}

interface IRecipesState {
    recipes: number[]
}

class Recipes extends React.Component<any, IRecipesState> {
    constructor(props: Readonly<{}>) {
        super(props)
        this.state = {recipes: [1, 2, 3, 4, 5]};
    }

    render() {
        const recipeList = this.state.recipes.map((recipe) => <li key={recipe}><Recipe recipeId={recipe}/></li>);

        return (
            <div>
                <button className='new-recipe-button'>Create New Recipe</button>
                <textarea className='recipe-filter' />
                <ul>{recipeList}</ul>
            </div>
        );
    }
}

class Sessions extends React.Component {
    render() {
        return (<span>Sessions</span>)
    }
}

export default App;
