import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  navbar: {
    height: 56,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: 'black',
  },
  emptyView: {
    width: 24,
    height: 24,
  },
});
