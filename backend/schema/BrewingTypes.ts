import { Document, Schema, Model, model } from "mongoose"

import { IRecipe, ISession } from "homebrew-types/BrewingTypes"

export interface IRecipeModel extends IRecipe, Document { }
export interface ISessionModel extends ISession, Document { }

let RecipeSchema = new Schema({
    created: Date,
    name: String,
    grainBill: [{
        fermentable: String,
        weight: Number
    }],
    strikeWater: {
        volume: Number,
        composition: {
            calcium: Number,
            magnesium: Number,
            chloride: Number,
            sulfate: Number
        },
        pH: Number
    },
    doughInTemperature: Number,
    mashTemperatureSeries: [{
        temperature: Number,
        time: Date
    }],
    spargeWater: {
        volume: Number,
        composition: {
            calcium: Number,
            magnesium: Number,
            chloride: Number,
            sulfate: Number
        },
        pH: Number
    },
    preBoilVolume: Number,
    preBoilGravity: Number,
    kettleHopAdditions: [{
        hop: String,
        weight: Number,
        time: Number,
        temperature: Number
    }],
    boilIntensitySeries: [{
        time: Date,
        intensity: String
    }],
    wortCoolingTemperatureSeries: [{
        temperature: Number,
        time: Date
    }],
    postBoilGravity: Number,
    fermenterVolume: Number,
    yeast: String,
    dryHopAdditions: [{
        hop: String,
        weight: Number,
        time: Number,
        temperature: Number
    }],
    sessions: [{
        type: Schema.Types.ObjectId,
        ref: 'Session'
    }]
});

let SessionSchema = new Schema({
    brewdOn: Date,
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    sessionDetails: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }
});

export const Recipe : Model<IRecipeModel> = model<IRecipeModel>("Recipe", RecipeSchema);
export const Session : Model<ISessionModel> = model<ISessionModel>("Session", SessionSchema);
