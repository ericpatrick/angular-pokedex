export interface IPokemonBasicInfo {
  num: string;
  name: string;
}

export interface IPokemonInfo extends IPokemonBasicInfo {
  id: number;
  img: string;
  type: string[];
  height: string;
  weight: string;
  candy: string;
  candy_count: number;
  egg: string;
  spawn_chance: number;
  avg_spawns: number;
  spawn_time: string;
  multipliers: number[];
  weaknesses: string[];
  prev_evolution: IPokemonBasicInfo[];
  next_evolution: IPokemonBasicInfo[];
}

export interface PokemonListResponse {
  pokemon: IPokemonInfo[];
}
