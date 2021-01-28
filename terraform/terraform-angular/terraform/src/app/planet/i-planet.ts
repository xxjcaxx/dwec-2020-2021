export interface IPlanet {
    name: string;
    id: number;
    sun?: number;
    image?: string;
    average_temperature?: number;
    oxigen?: number;
    co2?: number;
    water?: number;
    gravity?: number;
    air_density?: number;
    energy?: number;
    plants?: number;
    animals?: number;
    planetary_changes?: number[];
    buildings?: any[];
    player?: number;
}
