import { View, Pressable, Image, StatusBar } from 'react-native';
import React from 'react';
import { readingTipsModalProps } from './interface';
import Bookmark from '../../assets/svg/Bookmark';
import { styles } from './styles';
import RNTextComponent from '../RNTextComponent';
import { verticalScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import RNButton from '../RNButton';
import en from '../../constants/api/lang/en';



const RNReadingTipsModal = ({ visible , renderModal  , nextClick }: readingTipsModalProps) => {
    return (
        <Modal isVisible={visible} style={styles.modal} backdropOpacity={0.4} onBackButtonPress={renderModal} onBackdropPress={renderModal} >
               <StatusBar
        translucent
        backgroundColor={'rgba(0, 0, 0, 0.4)'}
        hidden={false}
        showHideTransition={'slide'}
      />
            <View style={styles.container}>
                <RNTextComponent isSemiBold style={styles.heading}>
                    Reading Tips
                </RNTextComponent>
                <RNTextComponent style={styles.info} >
                You're both doing great. Why don`t you also try to take turns reading, or to ask each other questions about the story as you go along?
                </RNTextComponent>
                <RNButton customStyle={styles.button} onClick={nextClick} title='Well'/>
            </View>
        </Modal>
    );
};

export default RNReadingTipsModal;
