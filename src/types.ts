import { z, ZodSchema } from "zod";
export const CRUD = {
	CREATE:"c",
	DELETE: "d",
	UPDATE:"u",
	READ: "r",
  }

export type CRUD = (typeof CRUD)[keyof typeof CRUD]

export type UserBase = {
	name: string,
	id: string
}

export type CredentialBase = { disabledEvents: string[] }

export type EventBase = string | number | symbol

export type TargetBase = string | number | symbol

export type KeysWithStringValue<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T];

export type DataSchema<S extends ZodSchema<any>> = {
  schema: S,
  id: KeysWithStringValue<z.infer<S>>,
  name: KeysWithStringValue<z.infer<S>>
}

export type TargetDefinition<T extends TargetBase, E extends EventBase, S extends ZodSchema> = {
  value: T,
  dataSchema:  DataSchema<S>,
  events: {[K in E]: EventDefinition<K,T>}
}

export type EventDefinition<E extends EventBase, T extends TargetBase> = {
  event: E,
  description: string,
  crud: CRUD,
  target: T
}

export type EventsPerTarget<T extends TargetBase> = Record<T, EventBase>
export type SchemasPerTarget<T extends TargetBase> = Record<T, ZodSchema>

export type AvailableEventsDefinition<
  T extends TargetBase,
  E extends EventsPerTarget<T>,
  S extends SchemasPerTarget<T>
> = {[K in T]: TargetDefinition<K, E[K], S[K]>}

export type LibraryConfiguration<
	T extends TargetBase,
	E extends EventsPerTarget<T>,
	S extends SchemasPerTarget<T>,
	U extends UserBase,
	C extends CredentialBase
> = {
	events: AvailableEventsDefinition<T,E,S>,
	getRelevantCredentials: (params: Omit<RuntimeData<T,E,S,U,C>, 'credential'>) => Promise<Iterable<C>>,
	interceptEvent: (params: RuntimeData<T,E,S,U,C>) => void,
	reportEvent:(parms: RuntimeData<T,E,S,U,C>) => Promise<void>
}

export type RuntimeData<
	T extends TargetBase,
	E extends EventsPerTarget<T>,
	S extends SchemasPerTarget<T>,
	U extends UserBase,
	C extends CredentialBase
>= {
	configuration: LibraryConfiguration<T,E,S,U,C>,
	target: T,
	data: z.infer<S[T]>,
	user: U,
	event: E[T],
	credential: C
}