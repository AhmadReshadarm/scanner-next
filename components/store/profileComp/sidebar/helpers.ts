import { signout } from 'redux/slicers/authSlicer';
import { UserVerificationService } from 'swagger/services';
const handleConfirmationEmail = async (setServerResponse) => {
  try {
    UserVerificationService.sendVerificationEmail();
    setTimeout(() => {
      setServerResponse(undefined);
    }, 30000);
  } catch (error: any) {
    setServerResponse(error.response.status);
    setTimeout(() => {
      setServerResponse(undefined);
    }, 30000);
  }
};

const handleSignout = (setAuthorized, setStep, dispatch) => {
  setAuthorized(false);
  setStep(0);
  dispatch(signout());
};

export { handleConfirmationEmail, handleSignout };
