import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {HomeTabScreenProps} from '@navigation/HomeTab/HomeTab.types';
import {ProfileScreen} from '@screens/Profile/ProfileScreen';
import {GuestProfileScreen} from '@screens/Profile/GuestProfileScreen';
import {IAsyncStorageService} from '@core/modules/async-storage/async-storage-service.interface';
import {AsyncStorageService} from '@core/modules/async-storage/async-storage.service';
import {AsyncStorageKeyEnum} from '@core/modules/async-storage/async-storage.enum';
import {ME, MeQueryResponse} from '@screens/Profile/gql';
import {Loader} from '@components/Loader';
import {resetRxDB} from '@core/database/rxdb';
import {CommonActions} from '@react-navigation/native';

interface ProfileControllerProps extends HomeTabScreenProps<'Profile'> {
  asyncStorageService?: IAsyncStorageService;
}

export const ProfileController: React.FC<ProfileControllerProps> = ({
  navigation,
  asyncStorageService = new AsyncStorageService(),
}) => {
  const [isGuest, setIsGuest] = useState(false);
  const {loading, data} = useQuery<MeQueryResponse>(ME);

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

  useEffect(() => {
    checkToken();
  }, []);

  if (isGuest) {
    return <GuestProfileScreen />;
  }

  return (
    <>
      <Loader title={'Getting your info...'} loading={loading} />
      <ProfileScreen user={data?.me} onLogout={handleLogout} />
    </>
  );
};