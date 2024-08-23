import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState, store} from '@tandem/redux/store';
import {ValidationError} from '@tandem/utils/validations';
import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {styles} from './styles';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import ImageCropPicker from 'react-native-image-crop-picker';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import RNQRGenerator from 'rn-qr-generator';
import {useDispatch} from 'react-redux';
import {dynamicTranslation, translation} from '@tandem/utils/methods';
import Toast from '@tandem/components/Toast';
import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
const RecieveChildDetail = () => {
  const portrait = useAppSelector(
    (state1: RootState) => state1.orientation.isPortrait,
  );
  const dispatch = useDispatch();
  const [val, setVal] = useState<ValidationError>({
    value: '',
  });
  const [qrVal, setQrVal] = useState({
    name: '',
    inviteCode: '',
  });
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (qrVal.name && qrVal.inviteCode) {
      dispatch(
        addAlertData({
          type: 'Alert',
          message: dynamicTranslation('CONNECT_CONFIRMATION', qrVal),
          onSuccess: async () => {
            try {
              const response = await post({
                path: API.CONNECTION_REQUEST,
                data: {inviteCode: qrVal.inviteCode},
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
  }, [qrVal]);
  const openGallery = () => {
    ImageCropPicker.openPicker({
      width: 350,
      height: 350,
      loadingLabelText: 'Image',
      cropping: false,
      mediaType: 'photo',
    })
      .then(response => {
        if (response?.sourceURL) {
          decodeQRCode(response.sourceURL);
          return;
        }
        decodeQRCode(response.path);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const decodeQRCode = (base64: string) => {
    RNQRGenerator.detect({
      uri: base64,
    })
      .then(response => {
        const {values} = response; // Array of detected QR code values. Empty if nothing found.
        const parsedData = JSON.parse(values[0]);
        if (parsedData?.name && parsedData?.inviteCode) {
          setQrVal({
            name: parsedData.name,
            inviteCode: parsedData.inviteCode,
          });
          return;
        }
        setMessage('Inavlid QR code');
      })
      .catch(() => {
        setMessage('Unable to detect QR code');
      });
  };

  const sendInvitation = async () => {
    try {
      const response = await post({
        path: API.CONNECTION_REQUEST,
        data: {inviteCode: val.value},
      });
      if (response.message) {
        setMessage(response.message);
      }
    } catch (error) {}
  };

  return (
    <>
      <RNScreenWrapper>
        <View
          style={[
            styles.header,
            {marginTop: portrait ? verticalScale(200) : verticalScale(200)},
          ]}>
          <Image
            source={require('../../assets/png/logo.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <RNTextComponent style={styles.heading} isMedium>
          {translation('ENTER_INVITATION_CODE_OR_SCAN')}
        </RNTextComponent>
        <RNTextInputWithLabel
          inputViewStyle={{borderColor: themeColor.themeBlue}}
          value={val}
          updateText={setVal}
          containerStyle={{
            marginTop: verticalScale(20),
            width: '80%',
            alignSelf: 'center',
          }}
        />
        {val.value && (
          <RNButton
            onClick={sendInvitation}
            title={translation('INVITE')}
            customStyle={{
              width: '80%',
              alignSelf: 'center',
              marginBottom: verticalScale(15),
              backgroundColor: themeColor.lightGreen,
              borderColor: themeColor.lightGreen,
            }}
          />
        )}
        <RNButton
          onClick={() => {
            store.dispatch(
              addAlertData({
                type: 'Message',
                message: 'You can upload or scan a qr',
                onSuccess: () => {
                  navigateTo(SCREEN_NAME.QR_SCANNER);
                },
                successText: 'Camera',
                destructiveText: 'Gallery',
                onDestructive: () => {
                  openGallery();
                },
              }),
            );
          }}
          title={translation('QR_CODE')}
          customStyle={{width: '80%', alignSelf: 'center'}}
        />
        <Toast message={message} setMessage={setMessage} />
      </RNScreenWrapper>
    </>
  );
};
export default RecieveChildDetail;
