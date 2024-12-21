import { sendResetPasswordToken } from 'redux/slicers/authSlicer';
const handleResetClick = async (email: string, dispatch) => {
  await dispatch(sendResetPasswordToken({ email }));
};

export { handleResetClick };
