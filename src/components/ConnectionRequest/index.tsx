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

  console.log('ConnectionRequest: item', item.child[0].name);

  return (
    <View style={styles.request}>
      <View style={styles.childImageContainer}>
        <Image
          source={{
            uri: item.child[0].avatar,
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
