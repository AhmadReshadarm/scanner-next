import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import color from 'components/store/lib/ui.colors';

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

export { InputsTooltip };
