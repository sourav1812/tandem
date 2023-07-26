import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {translation} from '@tandem/utils/methods';
import {StateObject} from './interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {Image, View} from 'react-native';
import RNButton from '@tandem/components/RNButton';
import navigateTo from '@tandem/navigation/navigate';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {ValidationError} from '@tandem/utils/validations';
import Paste from '@tandem/assets/svg/Paste';

const RedeemVoucher = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [state, setState] = useState<StateObject>({
    name: '',
    email: '',
    showModal: false,
  });

  const {name, email, showModal} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const [voucher, setVoucher] = useState<ValidationError>('');

  return (
    <RNScreenWrapper style={styles.container}>
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
        style={styles.qr}
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
        // onClick={navigateTo()}
      />
    </RNScreenWrapper>
  );
};

export default RedeemVoucher;
