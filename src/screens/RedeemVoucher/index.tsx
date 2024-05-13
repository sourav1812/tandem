import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {translation} from '@tandem/utils/methods';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import RNButton from '@tandem/components/RNButton';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {ValidationError} from '@tandem/utils/validations';
import Paste from '@tandem/assets/svg/Paste';
import navigateTo from '@tandem/navigation/navigate';
import {verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const height = Dimensions.get('screen').height;

const RedeemVoucher = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const [voucher, setVoucher] = useState<ValidationError>({value: ''});

  return (
    <RNScreenWrapper style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{height: '100%', width: '100%'}}>
        <ScrollView
          contentContainerStyle={{
            height: height,
          }}
          showsVerticalScrollIndicator={false}>
          <RNLogoHeader
            textHeading
            heading={translation('REDEEM_VOUCHER')}
            titleStyle={styles.text}
            customStyle={styles.heading}
          />
          <RNTextComponent isSemiBold style={styles.subHeading}>
            {translation('SCAN_YOUR_QR_CODE')}
          </RNTextComponent>
          <Image
            source={require('@tandem/assets/png/qrcode.png')}
            style={[
              styles.qr,
              isTablet && {
                height: verticalScale(170),
                width: verticalScale(170),
              },
            ]}
          />
          <View style={styles.seperation}>
            <View style={styles.line} />
            <RNTextComponent style={styles.or}>or</RNTextComponent>
            <View style={styles.line} />
          </View>
          <RNTextInputWithLabel
            value={voucher}
            updateText={setVoucher}
            rightSideIcon
            label={translation('ENTER_VOUCHER_CODE')}
            containerStyle={styles.inputContainer}
            rightSideIconProp={<Paste />}
            inputViewStyle={styles.inputView}
            inputStyle={{flex: 1}}
          />
          <RNButton
            title={translation('ADD')}
            customStyle={styles.button}
            onClick={() => navigateTo()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </RNScreenWrapper>
  );
};

export default RedeemVoucher;
