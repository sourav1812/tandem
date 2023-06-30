import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { styles } from './styles';
import { congratsModalProps } from './interface';
import RNTextComponent from '../RNTextComponent';
import { verticalScale } from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';
import RNButton from '../RNButton';
import { useNavigation } from '@react-navigation/native';
import { COMPONENTSNAME } from '../../navigation/ComponentName';
import { checkIfTablet } from '../../hooks/isTabletHook';


const RNCongratsModal = ({ visible = false, renderModal }: congratsModalProps) => {
   let isTablet = checkIfTablet()
  const navigation = useNavigation()

  return (
    <Modal style={styles.modal} isVisible={visible} backdropOpacity={0.4} onBackButtonPress={renderModal} onBackdropPress={renderModal}>
        <StatusBar
        translucent
        backgroundColor={'rgba(0, 0, 0, 0.4)'}
        hidden={false}
        showHideTransition={'slide'}
      />
      <View style={[styles.container  , (isTablet && {width : verticalScale(320) , alignSelf : 'center' } )]}>
        <View style={styles.top}>
          <View style={styles.image}>
            <RNTextComponent style={{ fontSize: verticalScale(32) }}>
              🥳
            </RNTextComponent>
          </View>
          <RNTextComponent isSemiBold style={styles.heading}>
            Congrats!
          </RNTextComponent>
          <View style={styles.info}>
            <View style={styles.box}>
              <RNTextComponent style={styles.title} isSemiBold>
                100%
              </RNTextComponent>
              <RNTextComponent style={styles.stat}>Accuracy</RNTextComponent>
            </View>
            <View style={styles.box}>
              <RNTextComponent style={styles.title} isSemiBold>
                80
              </RNTextComponent>
              <RNTextComponent style={styles.stat}>Speed</RNTextComponent>
            </View>
            <View style={styles.box}>
              <RNTextComponent style={styles.title} isSemiBold>
                6 min
              </RNTextComponent>
              <RNTextComponent style={styles.stat}>Duration</RNTextComponent>
            </View>
          </View>
          
        </View>
        <View style={styles.bottom}>
          <RNTextComponent style={[styles.stat , {color : themeColor.black , textAlign : 'center'}]} >
            You have create and read your own story
          </RNTextComponent>
          <RNButton title='Home' customStyle={styles.button} onClick={()=>{
            navigation.navigate(COMPONENTSNAME.HOME)
          }} />
          <RNButton title='Share' customStyle={styles.button} onClick={()=>{
            navigation.navigate(COMPONENTSNAME.QUESTIONS)
          }} onlyBorder />
        </View>
      </View>
    </Modal>
  );
};

export default RNCongratsModal;
