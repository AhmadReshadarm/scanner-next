import { resetPswByToken } from 'redux/slicers/authSlicer';

const handleResetClick = async (userPassword: any, router: any, dispatch) => {
  const regEx = /[^\/]+$/; // get everything after last /
  const token = router.asPath.match(regEx).toString();

  const payload = { token, userPassword: userPassword };
  dispatch(resetPswByToken(payload));
  setTimeout(() => router.push('/profile'), 2000);
};

export { handleResetClick };
