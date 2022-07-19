import StyleGuide from '../../utilities/styleGuide';

export const MessageStyles = (fromMe: boolean, theme: 'light' | 'dark') => {
  return fromMe
    ? {
        right: 0,
        borderBottomRightRadius: StyleGuide.spacing / 8,
        backgroundColor:
          StyleGuide.palette.whatsapp[theme].messageBackgroundSender,
      }
    : {
        left: 0,
        borderBottomLeftRadius: StyleGuide.spacing / 8,
        backgroundColor:
          StyleGuide.palette.whatsapp[theme].messageBackgroundReceiver,
      };
};
