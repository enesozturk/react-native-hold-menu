import { MessageProps } from "./types";

export const Messages: MessageProps[] = [
  { id: 1, text: "Lorem ipsum dolor sit amet.", fromMe: true, time: "22:00" },
  {
    id: 2,
    text:
      "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
    fromMe: false,
    time: "22:02",
  },
  { id: 3, text: "Lorem ipsum dolor sit amet.", fromMe: true, time: "22:03" },
];
