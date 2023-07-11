/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {SignoutModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import RNModal from '../RNModal';
import RNButton from '../RNButton';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {verticalScale} from 'react-native-size-matters';
import en from '@tandem/constants/api/lang/en';
import themeColor from '@tandem/theme/themeColor';

const RNSignoutModal = ({
  visible,
  renderModal,
  nextClick,
}: SignoutModalProps) => {
  let isTablet = checkIfTablet();

  return (
    <RNModal
      visible={visible}
      customStyle={styles.modal}
      renderModal={renderModal}>
      <View
        style={[
          styles.container,
          isTablet && {
            width: verticalScale(260),
            alignSelf: 'center',
            padding: 24,
          },
        ]}>
        <RNTextComponent isSemiBold style={styles.heading}>
          {en.SIGN_OUT}
        </RNTextComponent>
        <RNTextComponent style={styles.info}>
          {en.IF_YOU_SIGN_OUT_OF_THIS_APP}
        </RNTextComponent>
        <View
          style={[styles.footerButton, isTablet && {paddingHorizontal: 40}]}>
          <RNButton
            onlyBorder
            buttonColor={themeColor.themeBlue}
            onClick={renderModal}
            title={en.CANCEL}
            customStyle={[styles.button2, isTablet && {maxWidth: 150}]}
          />
          <RNButton
            onClick={nextClick}
            title={en.ACCEPT}
            customStyle={[styles.button2, isTablet && {maxWidth: 150}]}
          />
        </View>
      </View>
    </RNModal>
  );
};

export default RNSignoutModal;

// /* eslint-disable react-native/no-inline-styles */
// import {View, StatusBar} from 'react-native';
// import React from 'react';
// import {SignoutModalProps} from './interface';
// import {styles} from './styles';
// import RNTextComponent from '../RNTextComponent';
// import Modal from 'react-native-modal';
// import RNButton from '../RNButton';
// import {checkIfTablet} from '@tandem/hooks/isTabletHook';
// import {verticalScale} from 'react-native-size-matters';
// import en from '@tandem/constants/api/lang/en';
// import themeColor from '@tandem/theme/themeColor';

// const RNSignoutModal = ({
//   visible,
//   renderModal,
//   nextClick,
// }: SignoutModalProps) => {
//   let isTablet = checkIfTablet();

//   return (
//     <Modal
//       isVisible={visible}
//       style={styles.modal}
//       backdropOpacity={0.4}
//       onBackButtonPress={renderModal}
//       onBackdropPress={renderModal}>
//       <StatusBar
//         translucent
//         backgroundColor={'rgba(0, 0, 0, 0.4)'}
//         hidden={false}
//         showHideTransition={'slide'}
//       />
//       <View
//         style={[
//           styles.container,
//           isTablet && {
//             width: verticalScale(260),
//             alignSelf: 'center',
//             padding: 24,
//           },
//         ]}>
//         <RNTextComponent isSemiBold style={styles.heading}>
//           {en.SIGN_OUT}
//         </RNTextComponent>
//         <RNTextComponent style={styles.info}>
//           {en.IF_YOU_SIGN_OUT_OF_THIS_APP}
//         </RNTextComponent>
//         <View
//           style={[styles.footerButton, isTablet && {paddingHorizontal: 40}]}>
//           <RNButton
//             onlyBorder
//             buttonColor={themeColor.themeBlue}
//             onClick={renderModal}
//             title={en.CANCEL}
//             customStyle={[styles.button2, isTablet && {maxWidth: 150}]}
//           />
//           <RNButton
//             onClick={nextClick}
//             title={en.ACCEPT}
//             customStyle={[styles.button2, isTablet && {maxWidth: 150}]}
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default RNSignoutModal;
