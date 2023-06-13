import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 130,
    width: 130,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: '-8%',
    right: '20%',
  },
  heading: {
    fontSize: 16,
    color: 'rgba(2, 4, 8, 0.6)',
  },
  subHeading: {
    fontSize: 14,
    letterSpacing: 0,
  },
});
