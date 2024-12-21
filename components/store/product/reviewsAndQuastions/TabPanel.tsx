import Box from '@mui/material/Box';
import styled from 'styled-components';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <ReviewAndQuastionFlexGrid
      role="tabpanel"
      hidden={value !== index}
      id={`review-quastion-tabpanel-${index}`}
      aria-labelledby={`review-quastion-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </ReviewAndQuastionFlexGrid>
  );
};

const ReviewAndQuastionFlexGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .MuiBox-root {
    width: 100%;
    padding: 0;
  }
`;

export default TabPanel;
