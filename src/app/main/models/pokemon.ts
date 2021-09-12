export interface PokemonBasicInfo {
  num: string;
  name: string;
}

export interface PokemonInfo extends PokemonBasicInfo {
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
  prev_evolution: PokemonBasicInfo[];
  next_evolution: PokemonBasicInfo[];
}

export interface PokemonListResponse {
  pokemon: PokemonInfo[];
}
