import * as Faker from 'faker';
import { nanoid } from 'nanoid/non-secure';

export const mockWhatsAppData = (count = 50) =>
  Array(count)
    .fill(0)
    .map(_ => ({
      id: nanoid(),
      text: Faker.lorem.sentence(30),
      fromMe: Math.random() < 0.5,
      time: Faker.name.firstName(),
    }));
