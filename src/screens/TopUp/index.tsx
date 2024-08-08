import { Pressable, View } from "react-native";
import { styles } from "./style";
import RNTextComponent from "@tandem/components/RNTextComponent";
import { ABOUT_TOP_UP, TOP_UP_TYPES, TopUpType } from "./interface";
import { useState } from "react";
import themeColor from "@tandem/theme/themeColor";
import CheckMark from '../../assets/svg/Check';
import RNButton from "@tandem/components/RNButton";
import { verticalScale } from "react-native-size-matters";
import TopUpAndSubscribeHeader from "@tandem/components/RNTopUpOrSubscribe";

const TopUp = () => {
  const [selectedTopUp, setSelectedTopUp] = useState<TopUpType | undefined>(undefined);

  const handlePress = (topup: TopUpType) => {
    setSelectedTopUp(topup);
  };

  const handleClick = ()=>{}

  return (
    <TopUpAndSubscribeHeader title={'TOP_UP_TITLE'}>
      {TOP_UP_TYPES.map(it => (
        <Pressable
          style={[
            styles.info,
            {
              borderColor:
                selectedTopUp?.id === it.id
                  ? themeColor.themeBlue
                  : themeColor.lightGray,
            },
          ]}
          key={it.id}
          onPress={() => handlePress(it)}>
          <RNTextComponent
            isSemiBold
            style={{
              textAlign: 'center',
            }}>
            {`${it.title} - ${it.currencyLogo}${it.price}`}
          </RNTextComponent>
          <RNTextComponent
            style={{
              opacity: 0.5,
              fontSize: verticalScale(14),
              textAlign: 'center',
            }}>
            {it.description}
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
            {it.title}
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
          isDisabled={true}
          onClick={handleClick}
          title={
            !selectedTopUp
              ? 'Buy'
              : `Buy - ${selectedTopUp?.currencyLogo}${selectedTopUp?.price}`
          }
        />
      </View>
    </TopUpAndSubscribeHeader>
  );
};

export default TopUp;

