import uuidv1 from 'uuid/v1'

import { IRecipe } from './Recipe'

export interface ISession {
    id : string;
    recipe : IRecipe
}
