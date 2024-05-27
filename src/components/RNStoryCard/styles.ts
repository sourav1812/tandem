import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    padding: verticalScale(10),
    backgroundColor: '#F1F4F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressIndicatorTop: {
    width: '100%',
    height: 8,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  imageViewContainer: {flexDirection: 'row'},
  imageImojiContainer: {
    position: 'absolute',
    right: verticalScale(5),
    zIndex: 1,
    borderRadius: 20,
    backgroundColor: '#F1F4F9',
    alignItems: 'center',
    padding: 3,
    marginTop: 20,
  },
  emojiTextContainer: {
    maxWidth: '40%',
    alignItems: 'center',
    paddingVertical: scale(12),
  },

  emojiText: {fontSize: 15},
  newTextComponentContainer: {
    backgroundColor: '#9A00FF',
    zIndex: 1,
    marginTop: scale(-25),
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  newText: {
    color: 'white',
    padding: scale(10),
    fontSize: verticalScale(10),
    fontFamily: 'Poppins-Bold',
  },
  headerTitleContainer: {
    width: '60%',
    padding: verticalScale(10),
    justifyContent: 'space-between',
  },
  time: {
    fontSize: scale(12.5),
    marginVertical: 4,
  },
  minReading: {
    color: ' rgba(2, 4, 8, 0.6)',
    marginBottom: 4,
    marginTop: 0,
    fontSize: scale(13),
  },
  img: {
    borderRadius: 16,
  },
  heading: {
    fontSize: verticalScale(17),
  },
});
