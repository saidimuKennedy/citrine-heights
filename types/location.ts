import type { GeoCoordinates, LiteralUnion, URLString } from "./common";

/** Category of a nearby point of interest. */
export type NearbyCategory = LiteralUnion<
  | "school"
  | "hospital"
  | "mall"
  | "supermarket"
  | "restaurant"
  | "transport"
  | "airport"
  | "park"
  | "landmark"
>;

/** A notable place near the development. */
export interface NearbyPlace {
  name: string;
  category: NearbyCategory;
  /** Human-friendly distance, e.g. `"5 min drive"` or `"2.3 km"`. */
  distance?: string;
  coordinates?: GeoCoordinates;
}

/** Embeddable map configuration for the location section. */
export interface EmbeddedMap {
  /** Embed source URL (e.g. a Google Maps embed `src`). */
  embedUrl: URLString;
  /** Optional deep link that opens directions in a maps app. */
  directionsUrl?: URLString;
}

/** Where the development is and what surrounds it. */
export interface Location {
  address: string;
  coordinates: GeoCoordinates;
  nearbyPlaces?: NearbyPlace[];
  map?: EmbeddedMap;
}
