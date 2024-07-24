import React from 'react';
import {Image, View} from 'react-native';
import RNTextComponent from '../RNTextComponent';
import styles from './styles';
import RequestButton from '../RequestButtons';
import {ConnectionRequestsObj} from '@tandem/api/connectionRequests/interface';
import {PermissionModalData} from '@tandem/screens/ConnectionRequests/interface';
const ConnectionRequest = ({
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
  const reqDay = new Date(item.createdAt).getDate();
  const reqMonth = new Date(item.createdAt).getMonth();
  const reqYear = new Date(item.createdAt).getFullYear();
  return (
    <View style={styles.request}>
      <View style={styles.childImageContainer}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,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',
          }}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
          }}
        />
      </View>
      <View style={styles.childDetail}>
        <RNTextComponent
          isBold>{`${item?.requestedBy[0]?.firstName} ${item?.requestedBy[0]?.lastName}`}</RNTextComponent>
        <RNTextComponent isMedium>
          {`${reqDay}-${reqMonth}-${reqYear}`}
        </RNTextComponent>
      </View>
      <RequestButton
        item={item}
        permissionsModalData={permissionsModalData}
        setPermissionModalData={setPermissionModalData}
      />
    </View>
  );
};
export default ConnectionRequest;
