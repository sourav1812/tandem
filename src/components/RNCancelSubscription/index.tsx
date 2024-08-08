import React from "react";
import { View } from "react-native";

import { translation } from "@tandem/utils/methods";
import RNModal from "../RNModal";
import RNTextComponent from "../RNTextComponent";
import { CancelSubModalProps } from "./interface";
import { styles } from "./style";
import { verticalScale } from "react-native-size-matters";
import { useAppSelector } from "@tandem/hooks/navigationHooks";

const ConfirmCancelModal = ({visible, renderModal}: CancelSubModalProps) => {
   let isTablet = useAppSelector(state => state.deviceType.isTablet);

  return (
    <RNModal
      visible={visible}
      renderModal={renderModal}
      customStyle={styles.modal}>
      <View
        style={[
          styles.container,
          isTablet && {width: verticalScale(320), alignSelf: 'center'},
        ]}>
        <RNTextComponent
          isSemiBold
          style={{
            textAlign: 'center',
          }}>
          {translation('ARE_YOU_SURE')}
        </RNTextComponent>
        <RNTextComponent
          style={{
            textAlign: 'left',
          }}>
          {translation('IF_YOU_CANCEL')}
        </RNTextComponent>
      </View>
    </RNModal>
  );
};

export default ConfirmCancelModal;
