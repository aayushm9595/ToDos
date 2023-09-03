import { StyleSheet, Dimensions } from "react-native";
const {width} = Dimensions.get('screen')
export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bgOpacity: {
    opacity: 0.2
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddingTen: {
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#1E6738',
    borderWidth: 1,
    marginBottom: 10,
    color: '#1E6738',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#1E6738',
    borderWidth: 1,
    padding: 10,
    height: 50,
    borderRadius: 20,
    marginBottom: 10,
  },
  text: {
    color: '#1E6738',
    maxWidth: width - 140,
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});