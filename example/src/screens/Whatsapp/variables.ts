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

export const ReactionContainerStyles = (theme: 'light' | 'dark') => {
  return {
    borderRadius: StyleGuide.spacing,
    backgroundColor:
      StyleGuide.palette.whatsapp[theme].reactionContainerBackground,
    marginBottom: StyleGuide.spacing,
    flexGrow: 0,
    flexDirection: 'row',
  } as const;
};

export const ReactionStyles = (theme: 'light' | 'dark') => {
  return {
    borderRadius: StyleGuide.spacing * 2,
    backgroundColor: StyleGuide.palette.whatsapp[theme].reactionBackground,
    width: 30,
    height: 30,
    margin: StyleGuide.spacing,
  };
};
