import { View, StatusBar, Pressable } from 'react-native';
import React from 'react';
import { styles } from './styles';
import RNTextComponent from '../RNTextComponent';
import { verticalScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import { checkIfTablet } from '../../hooks/isTabletHook';
import { menuModalProps } from './interface';
import Notes from '../../assets/svg/Pdf';
import Send from '../../assets/svg/Send'
import Delete from '../../assets/svg/Delete';
import themeColor from '../../theme/themeColor';





const RNMenuModal = ({ visible, renderModal }: menuModalProps) => {
    let isTablet = checkIfTablet()
    return (
        <Modal isVisible={visible} 
        style={styles.modal} 
        backdropOpacity={0.2} 
        onBackButtonPress={renderModal} 
        onBackdropPress={renderModal} 
        animationIn={'slideInRight'} 
        animationOut={'slideOutRight'}
        animationOutTiming={600}
        animationInTiming={600}
        >
            <StatusBar
                translucent
                backgroundColor={'rgba(0, 0, 0, 0.2)'}
                hidden={false}
                showHideTransition={'slide'}
            />
            <View style={[styles.container, (isTablet && { maxWidth: verticalScale(270) })]}>
                <Pressable style={styles.menu} >
                    <RNTextComponent style={styles.text} >
                        Share Pdf
                    </RNTextComponent>
                    <Notes />
                </Pressable>
                <Pressable style={styles.menu} >
                    <RNTextComponent style={styles.text} >
                        Invite to read on tandem
                    </RNTextComponent>
                    <Send />
                </Pressable>
                <Pressable style={styles.menu} >
                    <RNTextComponent style={[styles.text, { color: themeColor.red }]} >
                        Delete
                    </RNTextComponent>
                    <Delete />
                </Pressable>
            </View>
        </Modal>
    );
};

export default RNMenuModal;
