/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type ChooseEventType =
  | PersonalRecordClimbingData
  | MaintenanceCreatedData
  | AdventureCreatedData
  | EventDeletedData;
export type PersonalRecordClimbingData = BaseEvent & {
  name: Name;
  eventName: EventNamesNew;
  [k: string]: unknown;
};
export type Date = string;
export type Name = string;
export type EventNamesNew =
  | "personal-record-climbing-created"
  | "maintenance-created"
  | "adventure-created"
  | "event-deleted";
export type MaintenanceCreatedData = BaseEvent & {
  name: Name1;
  equipment: "truck" | "house" | "dads-house";
  eventName: EventNamesNew1;
  [k: string]: unknown;
};
export type Name1 = string;
export type EventNamesNew1 =
  | "personal-record-climbing-created"
  | "maintenance-created"
  | "adventure-created"
  | "event-deleted";
export type AdventureCreatedData = BaseEvent & {
  name: Name2;
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
  eventName: EventNamesNew2;
  [k: string]: unknown;
};
export type Name2 = string;
export type EventNamesNew2 =
  | "personal-record-climbing-created"
  | "maintenance-created"
  | "adventure-created"
  | "event-deleted";
export type EventDeletedData = BaseEvent & {
  eventId: EventID;
  eventName: EventNamesNew3;
  [k: string]: unknown;
};
export type EventID = string;
export type EventNamesNew3 =
  | "personal-record-climbing-created"
  | "maintenance-created"
  | "adventure-created"
  | "event-deleted";

export interface BaseEvent {
  id: string;
  date?: Date;
  [k: string]: unknown;
}
