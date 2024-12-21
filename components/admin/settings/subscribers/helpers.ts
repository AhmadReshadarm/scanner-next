import { AppDispatch } from 'redux/store';
import {
  deleteSubscriber,
  fetchSubscribers,
} from 'redux/slicers/subscriberSlicer';

export const handleDeleteUser =
  (email: string, dispatch: AppDispatch, setVisible: any) => async () => {
    const isSaved: any = await dispatch(deleteSubscriber(email));
    if (!isSaved.error) {
      dispatch(fetchSubscribers());
      setVisible((prev) => !prev);
    }
  };
