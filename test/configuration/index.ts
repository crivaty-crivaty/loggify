import { AvailableEventsDefinition, CRUD, LibraryConfiguration, TargetDefinition } from "@loggify/types";
import { Targets, DynamicDataSchemaPerTarget, EventsPerTargetValue, BookingEvents, AppsEvents, ApiEvents, CredentialEvents, SystemEvents, CredentialData, BookingData, AppData, ApiEventData, WebhookData, SystemEventData } from './types';
import { MockCredential } from './data';
import { WebhookEvents } from "./types";

type SpecificTargetsDefinition = AvailableEventsDefinition<Targets, EventsPerTargetValue,  DynamicDataSchemaPerTarget>

const BookingTarget: TargetDefinition<"BOOKING", BookingEvents, DynamicDataSchemaPerTarget["BOOKING"]> = {
  value: Targets.BOOKING,
  events: {
    [BookingEvents.BOOKING_CREATED]: {
      event: "BOOKING_CREATED",
      description: "Booking created",
      crud: CRUD.CREATE,
      target: "BOOKING"
    },
    [BookingEvents.BOOKING_DELETED]: {
      event: "BOOKING_DELETED",
      description: "Booking deleted",
      crud: CRUD.CREATE,
      target: "BOOKING"
    }
  },
  dataSchema: {
    schema: BookingData,
    id: "id",
    name: "link"
  }
}

const AppTarget: TargetDefinition<"APPS",AppsEvents,DynamicDataSchemaPerTarget["APPS"]> = {
  value: Targets.APPS,
  events: {
    [AppsEvents.APPS_CREATED]: {
      event: "APPS_CREATED",
      description: "Apps created",
      crud: CRUD.CREATE,
      target: "APPS"
    },
    [AppsEvents.APPS_DELETED]: {
      event: "APPS_DELETED",
      description: "Apps deleted",
      crud: CRUD.CREATE,
      target: "APPS"
    }
  },
  dataSchema: {
    schema: AppData,
    id: "id",
    name: "type"
  }
}

const ApiTarget: TargetDefinition<"API_KEYS", ApiEvents, DynamicDataSchemaPerTarget["API_KEYS"]> = {
  value: Targets.API_KEYS,
  events: {
    [ApiEvents.API_KEY_CREATED]: {
      event: "API_KEY_CREATED",
      description: "Apps created",
      crud: CRUD.CREATE,
      target: "API_KEYS"
    },
    [ApiEvents.API_KEY_DELETED]: {
      event: "API_KEY_DELETED",
      description: "Apps deleted",
      crud: CRUD.CREATE,
      target: "API_KEYS"
    }
  },
  dataSchema: {
    schema: ApiEventData,
    id: "id",
    name: "result"
  }
}

const CredentialTarget: TargetDefinition<"CREDENTIAL", CredentialEvents, DynamicDataSchemaPerTarget["CREDENTIAL"]> = {
  value: Targets.CREDENTIAL,
  events: {
    [CredentialEvents.CREDENTIALS_CREATED]: {
      event: "CREDENTIALS_CREATED",
      description: "Apps created",
      crud: CRUD.CREATE,
      target: "CREDENTIAL"
    },
    [CredentialEvents.CREDENTIALS_DELETED]: {
      event: "CREDENTIALS_DELETED",
      description: "Apps created",
      crud: CRUD.CREATE,
      target: "CREDENTIAL"
    },
  },
  dataSchema: {
    schema: CredentialData,
    id: "id",
    name: "type"
  }
}

const WebhookTarget: TargetDefinition<"WEBHOOKS", WebhookEvents, DynamicDataSchemaPerTarget["WEBHOOKS"]> = {
  value: Targets.WEBHOOKS,
  events: {
    [WebhookEvents.WEBHOOK_CREATED]: {
      event: "WEBHOOK_CREATED",
      description: "Apps created",
      crud: CRUD.CREATE,
      target: "WEBHOOKS"
    },
    [WebhookEvents.WEBHOOK_DELETED]: {
      event: "WEBHOOK_DELETED",
      description: "Apps created",
      crud: CRUD.CREATE,
      target: "WEBHOOKS"
    },
  },
  dataSchema: {
    schema: WebhookData,
    id: "id",
    name: "action"
  }
}

const SystemTarget: TargetDefinition<"SYSTEM", SystemEvents, DynamicDataSchemaPerTarget["SYSTEM"]> = {
  value: Targets.SYSTEM,
  events: {
    [SystemEvents.SYSTEM_CREATED]: {
      event: "SYSTEM_CREATED",
      description: "System created",
      crud: CRUD.CREATE,
      target: "SYSTEM"
    },
    [SystemEvents.SYSTEM_DELETED]: {
      event: "SYSTEM_DELETED",
      description: "Apps created",
      crud: CRUD.CREATE,
      target: "SYSTEM"
    },
  },
  dataSchema: {
    schema: SystemEventData,
    id: "id",
    name: "action"
  }
}

const AvailableTargets: SpecificTargetsDefinition = {
 [Targets.BOOKING]: BookingTarget,
 [Targets.API_KEYS]: ApiTarget,
 [Targets.APPS]: AppTarget,
 [Targets.CREDENTIAL]: CredentialTarget,
 [Targets.SYSTEM]: SystemTarget,
 [Targets.WEBHOOKS]: WebhookTarget
}

type SpecificLibraryConfiguration = LibraryConfiguration<
  Targets, 
  EventsPerTargetValue, 
  DynamicDataSchemaPerTarget,
  { name: string, id: string },
  { disabledEvents: string[] }
>

export const config: SpecificLibraryConfiguration = {
  events: AvailableTargets,
  getRelevantCredentials: async (params) => { return [MockCredential]},
  interceptEvent: (params) => {},
  reportEvent: async (params) => {}
}