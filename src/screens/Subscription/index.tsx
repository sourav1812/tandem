import { View } from "react-native";
import React from "react";
import { ABOUT_SUBSCRIPTION } from "./interface";
import CheckMark from '../../assets/svg/Check';
import { styles } from "./style";
import RNTextComponent from "@tandem/components/RNTextComponent";
import { verticalScale } from "react-native-size-matters";
import RNButton from "@tandem/components/RNButton";
import navigateTo from "@tandem/navigation/navigate";
import { SCREEN_NAME } from "@tandem/navigation/ComponentName";
import TopUpAndSubscribeHeader from "@tandem/components/RNTopUpOrSubscribe";
import { translation } from "@tandem/utils/methods";

const Subscription = () => {
  const handleClick = ()=>{
    navigateTo(SCREEN_NAME.MANAGE_SUBSCRIPTION);
  }

  return (
    <TopUpAndSubscribeHeader title="SUBSCRIPTION_TITLE">
      {ABOUT_SUBSCRIPTION.map(it => (
        <View style={styles.about} key={it.id}>
          <CheckMark />
          <View>
            <RNTextComponent
              isSemiBold
              style={{
                textAlign: 'left',
                fontSize: verticalScale(14),
              }}>
              {translation(it.title)}
            </RNTextComponent>
            <RNTextComponent
              style={{
                opacity: 0.5,
                textAlign: 'left',
                fontSize: verticalScale(14),
              }}>
              {translation(it.description)}
            </RNTextComponent>
          </View>
        </View>
      ))}
      <View
        style={{
          width: '100%',
          gap: 10,
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 40,
        }}>
        <RNButton
          onlyBorder
          customStyle={styles.button}
          onClick={handleClick}
          title={'£7.99/Month = 100 tokens/month'}
        />
        <RNButton
          customStyle={styles.button}
          onClick={handleClick}
          title={'£69/Year = 1200 tokens/year'}
        />
      </View>
    </TopUpAndSubscribeHeader>
  );
};

export default Subscription;

 