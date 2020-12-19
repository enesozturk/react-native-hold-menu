import * as Faker from "faker";

// {
//   id: 1,
//   text:
//     "Lorem ipsum dolor sit amet. Tincidunt dui ut ornare lectus sit amet est placerat.",
//   fromMe: true,
//   time: "22:00",
// },

export const mockWhatsAppData = (count = 50) =>
  Array(count)
    .fill(0)
    .map((_, index) => ({
      id: index,
      text: Faker.lorem.sentence(30),
      fromMe: Math.random() < 0.5,
      time: Faker.name.firstName(),
    }));
