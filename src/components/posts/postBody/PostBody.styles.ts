import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  post: {
    padding: 16,
    backgroundColor: '#e0f2ff',
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: 'black',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  editButtonText: {
    marginLeft: 8,
    color: '#555',
  },
  postBody: {
    fontSize: 16,
    padding: 10,
    color: '#333',
  },
});
