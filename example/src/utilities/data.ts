const messagePool = [
  'This library feels much snappier after the Reanimated 4 refactor.',
  'Peer dependencies keep the package lean for downstream apps.',
  'Expo blur and haptics still work, but the core package ships less code.',
  'Modern gesture APIs make the activation flow easier to reason about.',
  'The provider now owns overlay rendering without an external portal.',
];

const senderPool = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan'];

export const mockWhatsAppData = (count = 50) =>
  Array(count)
    .fill(0)
    .map((_, index) => ({
      id: `message-${index + 1}`,
      text: messagePool[index % messagePool.length],
      fromMe: Math.random() < 0.5,
      time: senderPool[index % senderPool.length],
    }));
