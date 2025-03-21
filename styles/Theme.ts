import { StyleSheet } from 'react-native';

const Theme = StyleSheet.create({
  colors: {
    color: '#fff'
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '90%',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 5,

  },

  greenText: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 4,
    top: 5,
    padding: 10,
    shadowOpacity: 0.3,
    opacity: 0.7
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D3D3D3',
    color: '#4A4A4A',
    paddingHorizontal: 10,
    marginBottom: 30,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
  },
  button: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  responseContainer: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  responseText: {
    color: '#4A4A4A',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Theme;
