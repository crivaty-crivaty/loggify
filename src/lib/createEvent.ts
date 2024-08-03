import { DataSchema, EventBase, EventDefinition, TargetBase, UserBase } from "../types";
import { flattenObject } from "../utils/index";
import { z, ZodSchema} from "zod"

export function createEvent<
	T extends TargetBase,  
	E extends EventBase, 
	S extends ZodSchema,
	M extends DataSchema<S>,
>(
	eventStaticMetadata: EventDefinition<E, T>, 
	data: z.infer<M["schema"]>,
	user: UserBase,
	schema?: M
) {

	let dynamicSection
	if (schema && schema.id && schema.name) {
		dynamicSection = {
			...eventStaticMetadata,
			target: {
				id: data[schema.id],
				name: data[schema.name],
				type: eventStaticMetadata.target
			}
		}	
	}
	// if (typeof AuditLogTriggerTargets[triggerStaticMetadata.target] !== "string") {
	// 	dynamicSection = {
	// 		...eventStaticMetadata,
	// 		target: {
	// 			id: data[(AuditLogTriggerTargets[triggerStaticMetadata.target] as { id: string }).id],
	// 			name: data[(AuditLogTriggerTargets[triggerStaticMetadata.target] as { name: string }).name],
	// 			type: (AuditLogTriggerTargets[triggerStaticMetadata.target]as { value: string }).value
	// 		}
	// 	}
	// } else {
	// 	dynamicSection = {
	// 		...triggerStaticMetadata,
	// 		target: {
	// 			id: data.id,
	// 			name: data.name,
	// 			type: AuditLogTriggerTargets[triggerStaticMetadata.target]
	// 		}
	// 	}	
	// }

	return {
		actor: {
			id: user.id,
			name: user.name,
		},
		...dynamicSection,
		is_anonymous: user.id === "-1" ? true : false,
		is_failure: false,
		group: {
			id: "default",
			name: "default",
		},
		fields: flattenObject(data),
		// source_ip,
	};
}