import { faker } from "@faker-js/faker"
import { ApiEvents, AppData } from './types';
import { z } from "zod";

export const MockUser = {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName()
} 

export const MockCredential = {
    disabledEvents: [ApiEvents.API_KEY_CREATED]
}

export const MockAppData: z.infer<typeof AppData> = {
    id: faker.database.mongodbObjectId(),
    date: new Date(),
    type: "Finance",
    name: "SoFi | Personal Finance"
}