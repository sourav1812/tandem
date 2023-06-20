import { View, Pressable, Image } from 'react-native';
import React from 'react';
import { wellDoneModalProps } from './interface';
import Bookmark from '../../assets/svg/Bookmark';
import { styles } from './styles';
import RNTextComponent from '../RNTextComponent';
import { verticalScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import RNButton from '../RNButton';


const RNWellDoneModal = ({ visible = true, renderModal }: wellDoneModalProps) => {
    return (
        <Modal isVisible={visible} style={styles.modal} backdropOpacity={0.2}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/png/greenTick.png')}
                    style={styles.tick}
                />
                <RNTextComponent isSemiBold style={styles.heading}>
                    Well Done
                </RNTextComponent>
                <RNTextComponent style={styles.info} >
                    you named 2 animals begining with the letter c!
                </RNTextComponent>
                <RNButton customStyle={styles.button} onClick={()=>{}} title='Next'/>
            </View>
        </Modal>
    );
};

export default RNWellDoneModal;
