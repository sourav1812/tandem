import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {styles} from './styles';
import CrossIcon from '@tandem/assets/svg/Cross';
import CheckMarkIcon from '@tandem/assets/svg/CheckMark';
import themeColor from '@tandem/theme/themeColor';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import {
  AccountConnectionRequestStatus,
  ConnectionRequestsObj,
} from '@tandem/api/connectionRequests/interface';
import {PermissionModalData} from '@tandem/screens/ConnectionRequests/interface';
import actionOnReq from '@tandem/api/connectionReqAction';
const RequestButton = ({
  item,
  permissionsModalData,
  setPermissionModalData,
}: {
  item: ConnectionRequestsObj;
  permissionsModalData: PermissionModalData;
  setPermissionModalData: React.Dispatch<
    React.SetStateAction<PermissionModalData>
  >;
}) => {
  const [reqStatus, setReqStatus] = useState<AccountConnectionRequestStatus>(
    item?.status,
  );
  const actionOnRequest = async () => {
    try {
      const response = await actionOnReq({
        reqId: item?._id,
        data: {
          isApproved: false,
        },
      });
      if (response.message === 'Connection request status updated.') {
        setReqStatus(AccountConnectionRequestStatus.REJECTED);
      }
      console.log(response);
    } catch (error) {}
  };
  useEffect(() => {
    if (
      permissionsModalData.isRequestedAccepted &&
      permissionsModalData.requestId === item?._id
    ) {
      setReqStatus(AccountConnectionRequestStatus.APPROVED);
    }
  }, [permissionsModalData.isRequestedAccepted]);
  return (
    <View style={styles.container}>
      {(reqStatus === AccountConnectionRequestStatus.APPROVED ||
        reqStatus === AccountConnectionRequestStatus.ACTION_REQUIRED) && (
        <Pressable
          onPress={() => {
            if (reqStatus === AccountConnectionRequestStatus.ACTION_REQUIRED) {
              setPermissionModalData(prev => ({
                ...prev,
                visible: true,
                requestId: item._id,
                isRequestedAccepted: false,
              }));
            }
          }}
          style={[
            styles.buttons,
            {borderWidth: 1, borderColor: themeColor.green},
            {
              width:
                reqStatus === AccountConnectionRequestStatus.APPROVED
                  ? verticalScale(90)
                  : verticalScale(40),
            },
          ]}>
          {reqStatus === AccountConnectionRequestStatus.ACTION_REQUIRED && (
            <CheckMarkIcon />
          )}
          {reqStatus === AccountConnectionRequestStatus.APPROVED && (
            <RNTextComponent
              isMedium
              style={[styles.buttonsContent, {color: themeColor.green}]}>
              Approved
            </RNTextComponent>
          )}
        </Pressable>
      )}
      {(reqStatus === AccountConnectionRequestStatus.ACTION_REQUIRED ||
        reqStatus === AccountConnectionRequestStatus.REJECTED) && (
        <Pressable
          onPress={() => {
            if (reqStatus === AccountConnectionRequestStatus.ACTION_REQUIRED) {
              actionOnRequest();
            }
          }}
          style={[
            styles.buttons,
            {borderWidth: 1, borderColor: themeColor.red},
            {
              width:
                reqStatus === AccountConnectionRequestStatus.REJECTED
                  ? verticalScale(90)
                  : verticalScale(40),
            },
          ]}>
          {reqStatus === AccountConnectionRequestStatus.ACTION_REQUIRED && (
            <CrossIcon color={themeColor.red} />
          )}
          {reqStatus === AccountConnectionRequestStatus.REJECTED && (
            <RNTextComponent
              isMedium
              style={[styles.buttonsContent, {color: themeColor.red}]}>
              Rejected
            </RNTextComponent>
          )}
        </Pressable>
      )}
    </View>
  );
};
export default RequestButton;
