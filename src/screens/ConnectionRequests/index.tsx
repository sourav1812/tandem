import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import styles from './styles';
import ConnectionRequest from '@tandem/components/ConnectionRequest';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {getConnectionRequest} from '@tandem/api/connectionRequests';
import {ConnectionRequestsObj} from '@tandem/api/connectionRequests/interface';
import themeColor from '@tandem/theme/themeColor';
import {verticalScale} from 'react-native-size-matters';
import RNModal from '@tandem/components/RNModal';
import {PermissionModalData} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNCheckboxWithText from '@tandem/components/RNCheckboxWithText';
import RNButton from '@tandem/components/RNButton';
import {scale} from 'react-native-size-matters';
import actionOnReq from '@tandem/api/connectionReqAction';
import {translation} from '@tandem/utils/methods';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

const ConnectionRequests = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const [connectionRequests, setConnectionRequests] = useState<
    ConnectionRequestsObj[]
  >([]);

  const permissionsArr = [
    {permission: 'Read Story Book', itemToset: 'readStoryBooks'},
    {permission: 'Create Story Book', itemToset: 'createStoryBooks'},
    {permission: 'Create Reading Sessions', itemToset: 'createReadingSessions'},
    {permission: 'Change Archive Status', itemToset: 'changeArchiveStatus'},
    {permission: 'Change Public Status', itemToset: 'changePublicStatus'},
  ];
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [permissionsModalData, setPermissionModalData] =
    useState<PermissionModalData>({
      visible: false,
      requestId: '',
      isRequestedAccepted: false,
      permissions: {
        readStoryBooks: false,
        createStoryBooks: false,
        createReadingSessions: false,
        changeArchiveStatus: false,
        changePublicStatus: false,
      },
    });
  const currentChild = useAppSelector(state => state.createChild.currentChild);
  const actionOnRequest = async () => {
    try {
      const resp = await actionOnReq({
        reqId: permissionsModalData.requestId,
        data: {
          isApproved: true,
          permissions: permissionsModalData.permissions,
        },
      });
      if (resp.message === 'Connection request status updated.') {
        setPermissionModalData(prev => ({
          ...prev,
          isRequestedAccepted: true,
          visible: false,
        }));
      }
    } catch (error) {}
  };
  const getRequests = async () => {
    try {
      setLoading(true);
      const resp = await getConnectionRequest({
        childId: currentChild.childId,
        page: page,
      });
      if (resp) {
        if (page > 1) {
          setConnectionRequests(prev => [...prev, ...resp.connectionRequests]);
          return;
        }
        setConnectionRequests(resp.connectionRequests);
      }
      if (!resp.endReached) {
        setPage(page + 1);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  const listEmptyComponent = () => {
    return (
      <>
        {loading ? (
          <ActivityIndicator
            color={themeColor.green}
            size="large"
            style={{marginTop: verticalScale(250)}}
          />
        ) : (
          <RNTextComponent
            isBold
            style={{
              color: themeColor.themeBlue,
              textAlign: 'center',
              marginTop: verticalScale(250),
            }}>
            {translation('NO_CONNECTION_REQUESTS_FOUND')}
          </RNTextComponent>
        )}
      </>
    );
  };
  const listFooterComponent = () => {
    return (
      <>
        {loading && page > 1 && (
          <ActivityIndicator
            color={themeColor.green}
            size="large"
            style={{marginTop: verticalScale(10)}}
          />
        )}
      </>
    );
  };
  return (
    <RNScreenWrapper style={styles.container}>
      <RNLogoHeader
        textHeading
        heading={translation('CONNECTION_REQUESTS')}
        customStyle={styles.heading}
        titleStyle={styles.text}
      />
      <View style={{height: '72%', paddingBottom: 10}}>
        <FlatList
          data={connectionRequests}
          renderItem={({item}) => {
            return (
              <ConnectionRequest
                item={item}
                permissionsModalData={permissionsModalData}
                setPermissionModalData={setPermissionModalData}
              />
            );
          }}
          onEndReached={() => {
            if (page > 1) {
              getRequests();
            }
          }}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={listEmptyComponent}
          ListFooterComponent={listFooterComponent}
        />
      </View>
      <RNModal
        visible={permissionsModalData.visible}
        renderModal={() =>
          setPermissionModalData(prev => ({...prev, visible: false}))
        }>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <RNTextComponent isBold style={styles.modalHeading}>
              Requested User Can
            </RNTextComponent>
            {permissionsArr.map((item, index) => {
              return (
                <View key={index} style={styles.itemContainer}>
                  <RNCheckboxWithText
                    isRequired={false}
                    content={item.permission}
                    onAccept={() => {
                      if (index === 0) {
                        setPermissionModalData(prev => ({
                          ...prev,
                          permissions: {
                            ...permissionsModalData.permissions,
                            readStoryBooks:
                              !permissionsModalData.permissions.readStoryBooks,
                          },
                        }));
                        return;
                      }
                      if (index === 1) {
                        setPermissionModalData(prev => ({
                          ...prev,
                          permissions: {
                            ...permissionsModalData.permissions,
                            createStoryBooks:
                              !permissionsModalData.permissions
                                .createStoryBooks,
                          },
                        }));
                        return;
                      }
                      if (index === 2) {
                        setPermissionModalData(prev => ({
                          ...prev,
                          permissions: {
                            ...permissionsModalData.permissions,
                            createReadingSessions:
                              !permissionsModalData.permissions
                                .createReadingSessions,
                          },
                        }));
                        return;
                      }
                      if (index === 3) {
                        setPermissionModalData(prev => ({
                          ...prev,
                          permissions: {
                            ...permissionsModalData.permissions,
                            changeArchiveStatus:
                              !permissionsModalData.permissions
                                .changeArchiveStatus,
                          },
                        }));
                        return;
                      }
                      setPermissionModalData(prev => ({
                        ...prev,
                        permissions: {
                          ...permissionsModalData.permissions,
                          changePublicStatus:
                            !permissionsModalData.permissions
                              .changePublicStatus,
                        },
                      }));
                    }}
                  />
                </View>
              );
            })}
            <View style={styles.buttonContainer}>
              <RNButton
                onClick={actionOnRequest}
                title="Accept"
                pressableStyle={{flex: 1, marginRight: scale(10)}}
              />
              <RNButton
                onClick={() => {
                  setPermissionModalData(prev => ({...prev, visible: false}));
                }}
                title="Cancel"
                pressableStyle={{flex: 1}}
                buttonColor={themeColor.red}
              />
            </View>
          </View>
        </View>
      </RNModal>
      <View
        style={[
          styles.footerButton,
          isTablet && {paddingHorizontal: scale(65)},
        ]}>
        <RNButton
          customStyle={[styles.button]}
          title={translation('SHARE_CHILD')}
          onClick={() => navigateTo(SCREEN_NAME.SHARE_CHILD)}
          isDisabled={false}
        />
        <RNButton
          customStyle={{
            marginTop: isTablet ? 0 : verticalScale(10),
          }}
          title={translation('RECEIVE_CHILD')}
          onClick={() => navigateTo(SCREEN_NAME.RECIEVE_CHILD_DETAIL)}
        />
      </View>
    </RNScreenWrapper>
  );
};
export default ConnectionRequests;
