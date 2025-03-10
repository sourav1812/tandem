import {Pressable, View} from 'react-native';
import {styles} from './style';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {ABOUT_TOP_UP} from './interface';
import {useState} from 'react';
import themeColor from '@tandem/theme/themeColor';
import CheckMark from '../../assets/svg/Check';
import RNButton from '@tandem/components/RNButton';
import {verticalScale} from 'react-native-size-matters';
import TopUpAndSubscribeHeader from '@tandem/components/RNTopUpOrSubscribe';
import {dynamicTranslation, translation} from '@tandem/utils/methods';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {PurchasesStoreProduct} from 'react-native-purchases';
import {makePurchase} from '@tandem/functions/revenueCat';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useDispatch} from 'react-redux';
import {
  buttonLoader,
  stopLoader,
} from '@tandem/redux/slices/activityIndicator.slice';

const TopUp = () => {
  const dispatch = useDispatch();
  const products = useAppSelector(state => state.revenueCat.products);

  const [selectedTopUp, setSelectedTopUp] = useState<PurchasesStoreProduct>();

  const handlePress = (topup: PurchasesStoreProduct) => {
    setSelectedTopUp(topup);
  };

  const handleClick = async () => {
    dispatch(buttonLoader());
    try {
      await makePurchase(selectedTopUp!);
      navigateTo(SCREEN_NAME.HOME);
    } catch (error) {}
    dispatch(stopLoader());
  };

  return (
    <TopUpAndSubscribeHeader title={'TOP_UP_TITLE'}>
      {products.map(it => (
        <Pressable
          style={[
            styles.info,
            {
              borderColor:
                selectedTopUp?.identifier === it.identifier
                  ? themeColor.themeBlue
                  : themeColor.lightGray,
            },
          ]}
          key={it.identifier}
          onPress={() => handlePress(it)}>
          <RNTextComponent
            isSemiBold
            style={{
              textAlign: 'center',
            }}>
            {dynamicTranslation('BUY_TANDEM_TOKENS', it)}
          </RNTextComponent>
          <RNTextComponent
            style={{
              opacity: 0.5,
              fontSize: verticalScale(14),
              textAlign: 'center',
            }}>
            {`${it.description} ${translation('TOKENS')} = ${
              it.description
            } ${translation('STORIES')}`}
          </RNTextComponent>
        </Pressable>
      ))}
      {ABOUT_TOP_UP.map(it => (
        <View style={styles.about} key={it.id}>
          <CheckMark />
          <RNTextComponent
            style={{
              opacity: 0.5,
              fontSize: verticalScale(14),
              textAlign: 'left',
            }}>
            {translation(it.title)}
          </RNTextComponent>
        </View>
      ))}
      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 40,
        }}>
        <RNButton
          customStyle={[
            styles.button,
            {
              backgroundColor: !selectedTopUp
                ? themeColor.lightGray
                : themeColor.themeBlue,
              borderColor: !selectedTopUp
                ? themeColor.lightGray
                : themeColor.themeBlue,
            },
          ]}
          isDisabled={!selectedTopUp}
          onClick={handleClick}
          title={
            !selectedTopUp
              ? translation('BUY')
              : `${translation('BUY')} - ${selectedTopUp?.priceString}`
          }
        />
      </View>
    </TopUpAndSubscribeHeader>
  );
};

export default TopUp;
