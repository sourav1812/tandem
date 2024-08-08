import { View } from "react-native";
import React, { useState } from "react";
import RNTextComponent from "@tandem/components/RNTextComponent";
import { verticalScale } from "react-native-size-matters";
import { styles } from "./style";
import RNButton from "@tandem/components/RNButton";
import themeColor from "@tandem/theme/themeColor";
import { translation } from "@tandem/utils/methods";
import { addAlertData } from "@tandem/redux/slices/alertBox.slice";
import { useDispatch } from "react-redux";
import TopUpAndSubscribeHeader from "@tandem/components/RNTopUpOrSubscribe";

const ManageSubscription = () => {
  const dispatch = useDispatch()

  const handleOnSuccess = ()=>{

  }
  const handleDestructive = () => {
  
  };

  const handleCancel = ()=>{
    dispatch(

        addAlertData({
          type: 'ARE_YOU_SURE',
          message: translation('IF_YOU_CANCEL'),
          onSuccess: handleOnSuccess,
          onDestructive: handleDestructive,
        })

    );
  }
  return (
    <TopUpAndSubscribeHeader title="MANAGE_SUBSCRIPTION_TITLE">
      <View style={styles.info}>
        <RNTextComponent
          isSemiBold
          style={{
            textAlign: 'left',
          }}>
          {translation('YOUR_SUBSCRIPTION')}
        </RNTextComponent>
        <RNTextComponent
          style={{
            opacity: 0.5,
            fontSize: verticalScale(14),
            textAlign: 'left',
          }}>
          Subscription plan : Monthly/£7.99
        </RNTextComponent>
        <RNTextComponent
          style={{
            opacity: 0.5,
            fontSize: verticalScale(14),
            textAlign: 'left',
          }}>
          Monthly Usage: 23 / 100 tokens
        </RNTextComponent>
      </View>
      <View
        style={{
          width: '100%',
          flex: 1,
          gap: 10,
          justifyContent: 'flex-end',
          marginBottom: 40,
        }}>
        <RNButton
          customStyle={styles.button}
          onClick={()=>{}}
          title={translation('UPGRADE_YEARLY_SUBSCRIPTION')}
        />
        <RNButton
          customStyle={[
            styles.button,
            {
              borderWidth: 0,
            },
          ]}
          buttonColor={themeColor.red}
          onClick={handleCancel}
          title={translation('CANCEL_SUBSCRIPTION')}
          onlyBorder
        />
      </View>
    </TopUpAndSubscribeHeader>
  );
};

export default ManageSubscription;
