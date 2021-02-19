import { Dimensions } from 'react-native';

const StyleGuide = {
  spacing: 8,
  dimensionWidth: Dimensions.get('screen').width,
  dimensionHeight: Dimensions.get('screen').height,
  palette: {
    light: {
      backgroundColor: '#FFF',
      backgroundAccent: '#FFF',
      color: '#000',
      primary: '#35B6FF',
      primaryDark: '#33A1DF',
      secondary: '#f0f0f0',
    },
    dark: {
      backgroundColor: '#131415',
      color: '#FFF',
      primary: '#2FA6EB',
      primaryDark: '#2B8DC4',
      secondary: '#2b2d2e',
    },
    whatsapp: {
      light: {
        chatBackground: 'rgb(230, 211, 214)',
        messageBackgroundSender: 'rgb(218, 248, 201)',
        messageBackgroundReceiver: '#FFF',
        messageText: '#000',
      },
      dark: {
        chatBackground: '#131415',
        messageBackgroundSender: '#075E54',
        messageBackgroundReceiver: '#2b2d2e',
        messageText: '#FFF',
      },
      chatBackground: 'rgb(230, 211, 214)',
      messageBackgroundSender: 'rgb(218, 248, 201)',
      messageBackgroundReceiver: 'white',
      messageText: 'black',
    },
    telegram: {
      chatBackground: '#C8D9EA',
    },
  },
  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20,
    },
    callout: {
      fontSize: 16,
      lineHeight: 20,
    },
    caption: {
      fontSize: 11,
      lineHeight: 13,
    },
    footnote: {
      fontSize: 13,
      lineHeight: 18,
    },
    headline: {
      fontSize: 17,
      lineHeight: 22,
    },
    subhead: {
      fontSize: 15,
      lineHeight: 20,
    },
    title1: {
      fontSize: 34,
      lineHeight: 41,
    },
    title2: {
      fontSize: 28,
      lineHeight: 34,
    },
    title3: {
      fontSize: 22,
      lineHeight: 26,
    },
  },
  pageContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default StyleGuide;
