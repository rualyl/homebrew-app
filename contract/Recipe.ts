import uuidv1 from 'uuid/v1'

import { ISession } from './Session'

type WeightInKg = number;
type WeightInGrams = number;
type SpecificGravity = number;
type Minutes = number;
type VolumeInGallons = number;

/**
 * 100 => boil, any other temp is actual temp
 */
type TemperatureCelsius = number;

interface GristIngredient {
    fermentable: string;
    weight: WeightInKg;
}

interface HopAddition {
    hop: string;
    weight: WeightInGrams;
    time: Minutes;
    temperature: TemperatureCelsius
}

export interface IRecipe {
    id: string;
    name: string;
    grainBill: GristIngredient[];
    preBoilOG: SpecificGravity;
    kettleHopAdditions: HopAddition[];
    postBoilOG: SpecificGravity;
    fermenterVolume: VolumeInGallons;
    sessions: ISession[];
}
