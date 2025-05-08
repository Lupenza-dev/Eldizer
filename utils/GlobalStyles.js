import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2C3E50',
  secondary: '#FF5733',
  accent: '#7A7A7A',
  white: '#fff',
  danger: 'red',
  warning: "#E8B61B"
};

export const fonts = {
  regular: 'OpenSans-Regular',
  bold: 'OpenSans-Bold',
};

export const GlobalStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'justify',
    marginVertical: 5,
    marginRight: 2
  },
  text: {
    fontSize: 18,
    textAlign: 'justify',
    fontWeight: '500',
  },

  subTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginVertical: 5,
    marginRight: 10
  },
  h1: {
    fontSize: 32,
    marginTop: 2,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
    marginTop: 12,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  h4: {
    marginTop: 14,
    marginBottom: 14,
    fontWeight: 'bold',
  },
  h5: {
    fontSize: 16,
    // marginTop: 16,
    // marginBottom: 16,
    fontWeight: '500',
  },
  h6: {
    fontSize: 14,
    marginTop: 2,
    marginBottom: 2,
    fontWeight: 'bold',
  },
});
