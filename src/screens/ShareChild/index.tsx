import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';
import React from 'react';
import {Image, Pressable, View} from 'react-native';
import Share from 'react-native-share';
import QRCode from 'react-native-qrcode-svg';
import {verticalScale} from 'react-native-size-matters';
import ClipBoardIcon from '@tandem/assets/svg/ClipBoard';
import ShareIcon from '@tandem/assets/svg/Share';
import {styles} from './styles';
import Clipboard from '@react-native-clipboard/clipboard';
import {captureScreen} from 'react-native-view-shot';
import {dynamicTranslation, translation} from '@tandem/utils/methods';
const ShareChild = () => {
  const portrait = useAppSelector(
    (state1: RootState) => state1.orientation.isPortrait,
  );
  const currentChild = useAppSelector(state => state.createChild.currentChild);

  const generateQRCode = async () => {
    try {
      const uri = await captureScreen({
        format: 'png',
        quality: 0.8,
      });
      shareImageAndText(uri);
    } catch (error) {
      console.error('Error capturing QR code:', error);
    }
  };

  const shareImageAndText = async (uri: string) => {
    const shareOptions = {
      title: translation('SHARE_VIA'),
      message: dynamicTranslation('INVITATION_MESSAGE', currentChild),
      url: uri,
      subject: translation('QR_CODE'),
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };
  const qrContent = {
    name: currentChild.name,
    inviteCode: currentChild.inviteCode,
  };

  return (
    <RNScreenWrapper>
      <View
        style={[
          styles.header,
          {marginTop: portrait ? verticalScale(100) : verticalScale(52)},
        ]}>
        <Image
          source={require('../../assets/png/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <RNTextComponent style={styles.heading} isMedium>
          {translation('SCAN_QR_CODE')}
        </RNTextComponent>
        <View style={styles.qrContainer}>
          <QRCode value={JSON.stringify(qrContent)} size={250} />
        </View>
        <RNTextComponent isMedium style={{textAlign: 'center'}}>
          {`Name: ${currentChild.name}`}
        </RNTextComponent>
        <RNTextComponent isMedium style={{textAlign: 'center'}}>
          {`InviteCode \n${currentChild.inviteCode}`}
        </RNTextComponent>
        <View style={styles.invitationCodeContainer}>
          <RNTextComponent style={{flex: 1}}>
            {currentChild.inviteCode}
          </RNTextComponent>
          <Pressable
            onPress={() => {
              Clipboard.setString(currentChild.inviteCode);
            }}
            style={{marginRight: 15}}>
            <ClipBoardIcon />
          </Pressable>
          <Pressable onPress={generateQRCode}>
            <ShareIcon />
          </Pressable>
        </View>
      </View>
    </RNScreenWrapper>
  );
};
export default ShareChild;
