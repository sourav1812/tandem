import {styles} from './styles';
import React, {useState, useEffect} from 'react';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Toast from '@tandem/components/Toast';
import RNButton from '@tandem/components/RNButton';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import {dynamicTranslation, translation} from '@tandem/utils/methods';
import {useAppDispatch} from '@tandem/hooks/navigationHooks';
import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {getStoredTokens} from '@tandem/functions/tokens';

const QRScanner = () => {
  const [qrval, setQrVal] = useState({
    name: '',
    inviteCode: '',
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (qrval.name && qrval.inviteCode) {
      dispatch(
        addAlertData({
          type: 'Alert',
          message: dynamicTranslation('CONNECT_CONFIRMATION', qrval),
          onSuccess: async () => {
            try {
              const response = await post({
                path: API.CONNECTION_REQUEST,
                data: {inviteCode: qrval.inviteCode},
              });
              if (response.message) {
                setMessage(response.message);
              }
            } catch (error) {}
          },
          successText: translation('YES'),
          destructiveText: translation('NO'),
          onDestructive: () => {},
        }),
      );
    }
  }, [qrval]);
  const [message, setMessage] = useState('');
  return (
    <>
      <QRCodeScanner
        onRead={data => {
          if (data.data) {
            const parsedData = JSON.parse(data.data);
            if (parsedData?.name && parsedData?.inviteCode) {
              setQrVal({
                name: parsedData.name,
                inviteCode: parsedData.inviteCode,
              });
              return;
            }
            setMessage('Inavlid QR code');
          }
        }}
        containerStyle={{flex: 1}}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />
      {/* {val && (
        <View style={styles.bottomContentContainer}>
          <RNTextComponent style={styles.value} isMedium>
            {val}
          </RNTextComponent>
          <Pressable
            onPress={() => {
              Clipboard.setString(val);
              setMessage('Text copied to clipboard');
            }}>
            <ClipBoardIcon />
          </Pressable>
        </View>
      )} */}
      <RNButton
        onClick={() => {
          navigateTo(SCREEN_NAME.RECIEVE_CHILD_DETAIL);
        }}
        title="Enter Invite code"
        customStyle={styles.button}
      />
      <Toast message={message} setMessage={setMessage} />
    </>
  );
};
export default QRScanner;
