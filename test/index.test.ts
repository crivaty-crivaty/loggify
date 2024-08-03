import { handleAuditLogTrigger} from "../src/index.js";
import { test, vi, expect } from 'vitest'
import { MockAppData, MockCredential, MockUser } from "./configuration/data.js";
import { config } from "./configuration/config.js";

test('Expect proper data flow within the algorithm.', async (t) => {
  const getRelevantCredentials =  vi.spyOn(config, 'getRelevantCredentials')
  const interceptEvent =  vi.spyOn(config, 'interceptEvent').mockImplementation((params) => console.log({params}) )

  let event
  const reportEvent =  vi.spyOn(config, 'reportEvent').mockImplementation(async (params) => {
    event = params.event
  })

  const mockObject = {
    configuration: {...config}, 
    target: "APPS" as const, 
    event: "APPS_CREATED" as const,
    data: MockAppData, 
    user: MockUser, 
  }

	await handleAuditLogTrigger(
    mockObject
  );

  expect(getRelevantCredentials).toHaveBeenCalledWith({...mockObject})
  expect(interceptEvent).toHaveBeenCalledWith({...mockObject, credential: MockCredential})
  expect(reportEvent).toHaveBeenCalledWith({...mockObject, credential: MockCredential, event: event})

});