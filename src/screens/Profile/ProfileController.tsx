import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {HomeTabScreenProps} from '@navigation/HomeTab/HomeTab.types';
import {ProfileScreen, ProfileFormValue} from '@screens/Profile/ProfileScreen';
import {GuestProfileScreen} from '@screens/Profile/GuestProfileScreen';
import {IAsyncStorageService} from '@core/modules/async-storage/async-storage-service.interface';
import {AsyncStorageService} from '@core/modules/async-storage/async-storage.service';
import {AsyncStorageKeyEnum} from '@core/modules/async-storage/async-storage.enum';
import {IMessageService} from '@core/modules/message/message-service.interface';
import {MessageService} from '@core/modules/message/message.service';
import {
  ME,
  MeQueryResponse,
  UpdateProfileMutationResponse,
  UpdateProfileMutationVars,
  UPDATE_PROFILE,
} from '@screens/Profile/gql';
import {Loader} from '@components/Loader';
import {resetRxDB} from '@core/database/rxdb';
import {CommonActions} from '@react-navigation/native';

interface ProfileControllerProps extends HomeTabScreenProps<'Profile'> {
  asyncStorageService?: IAsyncStorageService;
  messageService?: IMessageService;
}

export const ProfileController: React.FC<ProfileControllerProps> = ({
  navigation,
  asyncStorageService = new AsyncStorageService(),
  messageService = new MessageService(),
}) => {
  const [isGuest, setIsGuest] = useState(false);
  const {loading: meQueryLoading, data} = useQuery<MeQueryResponse>(ME, {
    fetchPolicy: 'no-cache',
  });
  const [updateProfile, {loading: updateProfileMutationLoading}] = useMutation<
    UpdateProfileMutationResponse,
    UpdateProfileMutationVars
  >(UPDATE_PROFILE);

  const loading = meQueryLoading || updateProfileMutationLoading;

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showGuestContent = () => {
    setIsGuest(true);
  };

  const checkToken = () => {
    asyncStorageService
      .get(AsyncStorageKeyEnum.TOKEN)
      .then(token => {
        if (!token) {
          showGuestContent();
        }
      })
      .catch(showGuestContent);
  };

  const resetNavigation = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'Auth',
        },
      ],
    });
    return navigation.dispatch(resetAction);
  };

  const handleLogout = async () => {
    await resetRxDB();
    await asyncStorageService?.removeAll();
    resetNavigation();
  };

  const handleSaveProfile = (value: ProfileFormValue) => {
    updateProfile({
      variables: {
        input: value,
      },
    })
      .then(() => {
        messageService?.success('Your profile is updated!');
      })
      .catch(e => messageService?.error(e.message));
  };

  if (isGuest) {
    return <GuestProfileScreen />;
  }

  return (
    <>
      <Loader title={'Getting your info...'} loading={loading} />
      <ProfileScreen
        user={data?.me}
        onLogout={handleLogout}
        onSave={handleSaveProfile}
      />
    </>
  );
};
