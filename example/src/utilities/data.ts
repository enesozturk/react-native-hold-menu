import * as Faker from 'faker';

export const mockWhatsAppData = (count = 50) =>
  Array(count)
    .fill(0)
    .map((_, index) => ({
      id: index + 1,
      text: Faker.lorem.sentence(30),
      fromMe: Math.random() < 0.5,
      time: Faker.name.firstName(),
    }));
