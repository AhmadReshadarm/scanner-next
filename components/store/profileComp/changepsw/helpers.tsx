import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { openErrorNotification } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import color from 'components/store/lib/ui.colors';
import { ChangeUserPswService } from 'swagger/services';

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

const handleChangePsw = async ({ user, psw, repeatPsw, oldPassword }) => {
  if (psw != repeatPsw) {
    openErrorNotification('Новый пароль не подходит');
    return;
  }
  try {
    await ChangeUserPswService.changePassword({
      userId: user.id,
      body: { password: psw, oldPassword },
    });
    openSuccessNotification('Пароль изменен');
  } catch (error: any) {
    switch (true) {
      case 500 == error.response.status || error.response.status > 500:
        openErrorNotification(
          'Нам очень жаль 😔, что-то пошло не так с нашими серверами',
        );
        break;
      case 429 == error.response.status:
        openErrorNotification(
          'Слишком много запросов, вернитесь через 24 часа',
        );
        break;
      case 401 == error.response.status:
        openErrorNotification('Старый пароль не подходит');
        break;
      case 403 == error.response.status:
        openErrorNotification('Доступ ограничен: войдите снова');
        break;
      case 409 == error.response.status:
        openErrorNotification(
          'Нельзя использовать тот же пароль, что и предыдущий',
        );
        break;
      case 404 == error.response.status:
        openErrorNotification('Пользователь не найден');
        break;
      default:
        openErrorNotification(
          'Нам очень жаль 😔, что-то пошло не так с нашими серверами',
        );
        break;
    }
  }
};

export { InputsTooltip, handleChangePsw };
