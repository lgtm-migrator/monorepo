/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type ChooseEventType =
  | UiPersonalRecordClimbing
  | UiMaintenanceCreated
  | UiAdventureCreated
  | UiEventDeleted
  | UiChildEvent
  | UiMovieWatched
  | UiFoodAte
  | UiNoteTaken
  | UiHairCut;
export type UiPersonalRecordClimbing = {
  name: Name;
  eventName: EventName;
  date?: Date;
  [k: string]: unknown;
};
export type Name = string;
export type EventName =
  | "personal-record-climbing-created"
  | "maintenance-created"
  | "adventure-created"
  | "event-deleted"
  | "child-event-created"
  | "movie-watched"
  | "food-ate"
  | "note-taken"
  | "hair-cut";
export type Date = string;
export type UiMaintenanceCreated = {
  name: Name1;
  equipment: "truck" | "house" | "dads-house" | "frenchy" | "kia";
  date?: Date1;
  eventName: EventName;
  [k: string]: unknown;
};
export type Name1 = string;
export type Date1 = string;
export type UiAdventureCreated = {
  name: Name2;
  date?: Date2;
  /**
   * @minItems 1
   */
  activities: [
    (
      | "backpacking"
      | "ball-golf"
      | "basketball"
      | "beach-pong"
      | "beer-pong"
      | "boat-tubing"
      | "bowling"
      | "camper-camping"
      | "camping"
      | "concert"
      | "cornhole"
      | "dh-mountain-biking"
      | "disc-golf"
      | "drinking-alcohol"
      | "escape-room"
      | "family-time"
      | "fishing"
      | "flag-football"
      | "fly-fishing"
      | "frisbee"
      | "hiking"
      | "horseshoes"
      | "hunting"
      | "indoor-bouldering"
      | "indoor-rope-climbing"
      | "indoor-trampoline-park"
      | "kayaking"
      | "life-event"
      | "maitenance"
      | "mountain-biking"
      | "movie-theatre"
      | "museum"
      | "outdoor-rock-climbing"
      | "overlanding"
      | "paintball"
      | "putt-putt-golf"
      | "road-biking"
      | "road-trip"
      | "snowboarding"
      | "softball"
      | "swimming"
      | "tennis"
      | "theme-park"
      | "volleyball"
      | "water-park"
      | "white-water-rafting"
    ),
    ...(
      | "backpacking"
      | "ball-golf"
      | "basketball"
      | "beach-pong"
      | "beer-pong"
      | "boat-tubing"
      | "bowling"
      | "camper-camping"
      | "camping"
      | "concert"
      | "cornhole"
      | "dh-mountain-biking"
      | "disc-golf"
      | "drinking-alcohol"
      | "escape-room"
      | "family-time"
      | "fishing"
      | "flag-football"
      | "fly-fishing"
      | "frisbee"
      | "hiking"
      | "horseshoes"
      | "hunting"
      | "indoor-bouldering"
      | "indoor-rope-climbing"
      | "indoor-trampoline-park"
      | "kayaking"
      | "life-event"
      | "maitenance"
      | "mountain-biking"
      | "movie-theatre"
      | "museum"
      | "outdoor-rock-climbing"
      | "overlanding"
      | "paintball"
      | "putt-putt-golf"
      | "road-biking"
      | "road-trip"
      | "snowboarding"
      | "softball"
      | "swimming"
      | "tennis"
      | "theme-park"
      | "volleyball"
      | "water-park"
      | "white-water-rafting"
    )[]
  ];
  eventName: EventName;
  [k: string]: unknown;
};
export type Name2 = string;
export type Date2 = string;
export type UiEventDeleted = {
  eventId: EventID;
  eventName: EventName;
  [k: string]: unknown;
};
export type EventID = string;
export type Name3 = string;
export type Date3 = string;
export type Name4 = string;
export type Date4 = string;
export type Name5 = string;
export type Date5 = string;
export type Homemade = boolean;
export type Name6 = string;
export type Date6 = string;
export type Name7 = string;
export type Date7 = string;

export interface UiChildEvent {
  name: Name3;
  eventName: EventName;
  date?: Date3;
  [k: string]: unknown;
}
export interface UiMovieWatched {
  name: Name4;
  eventName: EventName;
  date?: Date4;
  [k: string]: unknown;
}
export interface UiFoodAte {
  name?: Name5;
  meal?: "breakfast" | "lunch" | "dinner" | "snack" | "drink";
  date?: Date5;
  eventName?: EventName;
  homemade?: Homemade;
  [k: string]: unknown;
}
export interface UiNoteTaken {
  body: Name6;
  eventName: EventName;
  date?: Date6;
  [k: string]: unknown;
}
export interface UiHairCut {
  name?: Name7;
  eventName: EventName;
  date?: Date7;
  [k: string]: unknown;
}
