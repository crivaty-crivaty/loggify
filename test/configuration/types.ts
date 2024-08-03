import { z } from 'zod';

// Target types
export const Targets = {
  API_KEYS: "API_KEYS",
  BOOKING: "BOOKING",
  APPS: "APPS",
  CREDENTIAL: "CREDENTIAL",
  WEBHOOKS: "WEBHOOKS",
  SYSTEM: "SYSTEM"
} as const;
export type TargetsType = typeof Targets 
export type Targets = TargetsType[keyof typeof Targets];

// Event per Target types
export const BookingEvents = {
  BOOKING_CREATED: "BOOKING_CREATED",
  BOOKING_DELETED: "BOOKING_DELETED"
} as const;

export type BookingEvents = (typeof BookingEvents)[keyof typeof BookingEvents]

export const BookingData = z.object({
  id: z.string(),
  date: z.date(),
  link: z.string()
})

export const AppsEvents = {
  APPS_CREATED: "APPS_CREATED",
  APPS_DELETED: "APPS_DELETED"
} as const;

export type AppsEvents = (typeof AppsEvents)[keyof typeof AppsEvents]

export const AppData = z.object({
  id: z.string(),
  date: z.date(),
  name: z.string(),
  type: z.string()
})

export const CredentialEvents = {
  CREDENTIALS_CREATED: "CREDENTIALS_CREATED",
  CREDENTIALS_DELETED: "CREDENTIALS_DELETED"
} as const;

export type CredentialEvents = (typeof CredentialEvents)[keyof typeof CredentialEvents]

export const CredentialData = z.object({
  id: z.string(),
  date: z.date(),
  type: z.string()
})

export const WebhookEvents = {
  WEBHOOK_CREATED: "WEBHOOK_CREATED",
  WEBHOOK_DELETED: "WEBHOOK_DELETED"
} as const;

export type WebhookEvents = (typeof WebhookEvents)[keyof typeof WebhookEvents]

export const WebhookData = z.object({
  id: z.string(),
  date: z.date(),
  action: z.string()
})

export const SystemEvents = {
  SYSTEM_CREATED: "SYSTEM_CREATED",
  SYSTEM_DELETED: "SYSTEM_DELETED"
} as const;

export type SystemEvents = (typeof SystemEvents)[keyof typeof SystemEvents]

export const SystemEventData = z.object({
  id: z.string(),
  date: z.date(),
  action: z.string(),
})

export const ApiEvents = {
  API_KEY_CREATED: "API_KEY_CREATED",
  API_KEY_DELETED: "API_KEY_DELETED",
} as const;

export type ApiEvents = (typeof ApiEvents)[keyof typeof ApiEvents];

export const ApiEventData = z.object({
  id: z.string(),
  date: z.date(),
  action: z.string(),
  result: z.string()
})

export type EventsPerTargetValue = {
  [Targets.API_KEYS]: ApiEvents,
  [Targets.APPS]: AppsEvents,
  [Targets.BOOKING]: BookingEvents,
  [Targets.CREDENTIAL]: CredentialEvents,
  [Targets.SYSTEM]: SystemEvents,
  [Targets.WEBHOOKS]: WebhookEvents
}

export type DynamicDataSchemaPerTarget = {
  [Targets.APPS]: typeof AppData,
  [Targets.BOOKING]: typeof BookingData,
  [Targets.API_KEYS]: typeof ApiEventData,
  [Targets.CREDENTIAL]: typeof CredentialData,
  [Targets.SYSTEM]: typeof SystemEventData,
  [Targets.WEBHOOKS]: typeof WebhookData 
}