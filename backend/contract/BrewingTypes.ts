//import { v1 } from 'uuid/interfaces';

type WeightInKg = number;
export type WeightInGrams = number;

type Minutes = number;
type TemperatureCelsius = number;
type PartsPerMillion = number;
type SpecificGravity = number;
type VolumeInLiters = number;
type ElapsedTime = Date;

interface GristIngredient {
    fermentable: string;
    weight: WeightInKg;
}

interface WaterComposition {
    calcium: PartsPerMillion;
    magnesium: PartsPerMillion;
    chloride: PartsPerMillion;
    sulfate: PartsPerMillion;
}

interface WaterProfile {
    volume: VolumeInLiters;
    composition: WaterComposition;
    pH: number;
}

interface HopAddition {
    hop: string;
    weight: WeightInGrams;
    time: Minutes;
    temperature: TemperatureCelsius
}

interface TemperatureSeriesPoint {
    temperature: TemperatureCelsius;
    time: ElapsedTime;
}

enum BoilIntensity {
    Simmer = "Simmer",
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

interface BoilIntensitySeriesPoint {
    /** Elapsed time of the boil, not the entire brew session */
    time: ElapsedTime;
    intensity: BoilIntensity;
}

export interface IRecipe {
    created: Date;
    name: string;
    grainBill: GristIngredient[];
    strikeWater: WaterProfile;
    doughInTemperature: TemperatureCelsius;
    mashTemperatureSeries: TemperatureSeriesPoint[];
    spargeWater: WaterProfile;
    preBoilVolume: VolumeInLiters;
    preBoilGravity: SpecificGravity;
    kettleHopAdditions: HopAddition[];
    boilIntensitySeries: BoilIntensitySeriesPoint[];
    wortCoolingTemperatureSeries: TemperatureSeriesPoint[];
    postBoilGravity: SpecificGravity;
    fermenterVolume: VolumeInLiters;
    yeast: string;
    dryHopAdditions: HopAddition[];
    sessions: ISession[];
}

export interface ISession {
    brewedOn: Date;

    /**
     * Recipe that this session is based on.
     */
    recipe : IRecipe;

    /**
     * Details specific to this session. A "perfect" session would be one where the
     * sessionDetails member equals the recip member exactly.
     */
    sessionDetails: IRecipe;
}
