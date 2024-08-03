import { createEvent } from './lib/createEvent.js';
import { CredentialBase, LibraryConfiguration, TargetBase, EventBase, DataSchema, UserBase, EventsPerTarget, SchemasPerTarget, AvailableEventsDefinition, TargetDefinition, RuntimeData } from './types.js';
import { z } from "zod"

export async function handleAuditLogTrigger<
  T extends TargetBase,
  E extends EventsPerTarget<T>,
  S extends SchemasPerTarget<T>, 
  U extends UserBase,
  C extends CredentialBase,
  K extends LibraryConfiguration<T,E,S,U,C>,
  L extends keyof K["events"],
  M extends keyof K["events"][L]["events"]
>({
	configuration,
	target,
	event,
	data,
	user
} : {
	configuration: LibraryConfiguration<T,E,S,U,C>,
	target: L, 
	event: M,
	data: z.infer<K["events"][L]["dataSchema"]["schema"]>,
	user: U,
	}
) {
	const triggerStaticMetadata = (
		configuration.events as unknown as AvailableEventsDefinition<L,EventsPerTarget<L>,SchemasPerTarget<L>>
	)[target]["events"][event]

	const schema = (
		configuration.events as unknown as AvailableEventsDefinition<L,EventsPerTarget<L>,SchemasPerTarget<L>>
	)[target].dataSchema

	const eventData = createEvent(
		triggerStaticMetadata, 
		data,
		user,
		schema,
	)

	const credentials = await (
		configuration.getRelevantCredentials as unknown as (params: Omit<RuntimeData<L,EventsPerTarget<L>,SchemasPerTarget<L>,U,C>, 'credential'>) => Promise<Iterable<C>>
	)({
		configuration: configuration as unknown as LibraryConfiguration<L,EventsPerTarget<L>,SchemasPerTarget<L>,U,C>, 
		target, 
		data, 
		user, 
		event
	})

	try {
		for (const credential of credentials) {
			const innerEvent = { ...eventData };
			
			(configuration.interceptEvent as unknown as (params: RuntimeData<L,EventsPerTarget<L>,SchemasPerTarget<L>,U,C>) => void)({
				configuration: configuration as unknown as LibraryConfiguration<L,EventsPerTarget<L>,SchemasPerTarget<L>,U,C>, 
				target,
				data, 
				user, 
				event, 
				credential
			})

			if (
				credential.disabledEvents &&
				credential.disabledEvents.includes(event as string) &&
				target !== "SYSTEM"
			) {
				continue;
			}

			await (configuration.reportEvent as unknown as (params: Omit<RuntimeData<L,EventsPerTarget<L>,SchemasPerTarget<L>,U,C>, 'event'> & { event: typeof innerEvent}) => Promise<void>)({
				configuration: configuration as unknown as LibraryConfiguration<L,EventsPerTarget<L>,SchemasPerTarget<L>,U,C>, 
				target, 
				data, 
				user, 
				event: innerEvent, 
				credential
			})
		}
	} catch (error) {
		throw Error()
	}

}


