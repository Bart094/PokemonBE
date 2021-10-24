import { Common } from "./common";
import { FlavorText } from "./flavorText";
import { Genera } from "./genera";
import { Name } from "./name";
import { PokedexNumbers } from "./pokedexNumbers";
import { Varieties } from "./varieties";

export interface Message {
    base_happiness: Number;
    capture_rate: Number;
    color: Common;
    egg_groups: Common[];
    evolution_chain: {
        url: string
    };
    evolves_from_species: null;
    flavor_text_entries: FlavorText[];
    form_descriptions: [];
    forms_switchable: boolean;
    gender_rate: -1;
    genera: Genera[];
    generation: Common;
    growth_rate: Common;
    habitat: Common;
    has_gender_differences: boolean;
    hatch_counter: Number;
    id: Number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: Name[];
    order: Number;
    pal_park_encounters: [
        {
            area: Common;
            base_score: Number;
            rate: Number
        }
    ];
    pokedex_numbers: PokedexNumbers[];
    shape: Common;
    varieties: Varieties[]
}
