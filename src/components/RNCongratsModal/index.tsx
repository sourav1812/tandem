import { View, Text } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { styles } from './styles';
import { congratsModalProps } from './interface';
import RNTextComponent from '../RNTextComponent';
import { verticalScale } from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';
import RNButton from '../RNButton';

const RNCongratsModal = ({ visible = false, renderModal }: congratsModalProps) => {
  return (
    <Modal style={styles.modal} isVisible={visible} backdropOpacity={0.2}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.image}>
            <RNTextComponent style={{ fontSize: verticalScale(32) }}>
              🥳
            </RNTextComponent>
          </View>
          <RNTextComponent isSemiBold style={styles.heading}>
            Congrats
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
          <RNButton title='Home' customStyle={styles.button} onClick={()=>{}} />
          <RNButton title='Share' customStyle={styles.button} onClick={()=>{}} onlyBorder />
        </View>
      </View>
    </Modal>
  );
};

export default RNCongratsModal;
