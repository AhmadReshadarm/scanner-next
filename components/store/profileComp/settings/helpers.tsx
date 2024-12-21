import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import color from 'components/store/lib/ui.colors';
import { UserService } from 'swagger/services';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { openErrorNotification } from 'common/helpers';
import { updateUserById } from 'redux/slicers/authSlicer';
const InputsTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: color.textPrimary,
    color: color.btnPrimary,
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(14),
    boxShadow: `0px 2px 6px ${color.boxShadowBtn}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '10px',
    borderRadius: '15px',
    padding: '15px',
    userSelect: 'none',
  },
}));

const handleEmailChange = async ({ user, email }) => {
  try {
    if (email == user.email) {
      openErrorNotification('Ничего не изменилось 🤔');
      return;
    }
    await UserService.updateUser({ userId: user.id, body: { email } });

    openSuccessNotification('Успешно изменено 🙌');
    openSuccessNotification(
      'Письмо с подтверждение аккаунта отправлено вам на почту 📬',
    );
  } catch (error: any) {
    switch (error.response.status) {
      case 409:
        openErrorNotification('Ничего не изменилось 🤔');
        break;
      case 401:
        openErrorNotification('Несанкционированный доступ');
        break;
      case 403:
        openErrorNotification('Срок действия ключа истек');
        break;
      case 404:
        openErrorNotification('Данные не найдены');
        break;
      default:
        openErrorNotification(
          'Нам очень жаль 😔, что-то пошло не так с нашими серверами',
        );
        break;
    }
  }
};

const handleDataChange = async ({
  user,
  payload,
  setServerResponse,
  dispatch,
}) => {
  try {
    if (
      user.firstName == payload.firstName &&
      user.lastName == payload.lastName
    ) {
      openErrorNotification('Ничего не изменилось');
      return;
    }
    // await UserService.updateUser({ userId: user.id, body: payload });
    dispatch(
      updateUserById({
        userId: user?.id!,
        user: { firstName: payload.firstName, lastName: payload.lastName },
      }),
    );
    setServerResponse(200);
    openSuccessNotification('Успешно изменено 🙌');
  } catch (error: any) {
    setServerResponse(error.response.status);
    switch (error.response.status) {
      case 409:
        openErrorNotification('Ничего не изменилось');
        break;
      case 401:
        openErrorNotification('Несанкционированный доступ');
        break;
      case 403:
        openErrorNotification('Срок действия ключа истек');
        break;
      case 404:
        openErrorNotification('Данные не найдены');
        break;
      default:
        openErrorNotification(
          'Нам очень жаль 😔, что-то пошло не так с нашими серверами',
        );
        break;
    }
    setTimeout(() => {
      setServerResponse(undefined);
    }, 1000);
  }
};

export { InputsTooltip, handleEmailChange, handleDataChange };
