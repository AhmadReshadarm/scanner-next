import { UserService } from 'swagger/services';
const handleFirstLoad = async (
  setAuthorized,
  setServerErr,
  setLoading,
  setVerified,
  setStep,
  user,
) => {
  setStep(0);
  const token = localStorage.getItem('accessToken');
  if (token == 'undefined' || !user) {
    setAuthorized(false);
    setLoading(false);
    return;
  }
  try {
    const userInDb: any = await UserService.findUserById({ userId: user.id });
    setVerified(userInDb.user.isVerified);

    setServerErr(200);
    setLoading(false);

    setAuthorized(true);
  } catch (error: any) {
    setLoading(false);
    setServerErr(error.response.status);
    setStep(0);
    setAuthorized(false);
  }
};

export { handleFirstLoad };
