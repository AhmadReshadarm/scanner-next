import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../../lib/ui.colors';
import TextField from '@mui/material/TextField';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
const UserCommment = (props: any) => {
  const { comment, setComment, setIsOpen } = props;

  return (
    <CommentContainer
      custom={0.2}
      initial="init"
      animate="animate"
      variants={variants.fadInSlideUp}
    >
      <CommentWrapper>
        <span onClick={() => setIsOpen(false)} className="comment-close-btn">
          <svg
            width="15"
            height="15"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="-1"
              x2="26.3541"
              y2="-1"
              transform="matrix(0.683484 -0.729965 0.681649 0.731679 1.52267 21.0312)"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="1"
              y1="-1"
              x2="26.3044"
              y2="-1"
              transform="matrix(0.680786 0.732483 -0.684345 0.729158 0.21875 1.03125)"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <CommentContent>
          <h2 style={{ fontWeight: 600 }}>Комментарий к заказу</h2>
          <div className="comment-info">
            <span>Укажите дополнительную информацию к заказу.</span>
            <span>Например, как добраться или позвонить вам.</span>
          </div>
          <TextField
            fullWidth
            label="Введите текст комментария"
            multiline
            rows={4}
            value={comment}
            defaultValue=""
            onChange={(e: any) => setComment(e.target.value)}
          />
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Сохранить комментарий
          </button>
        </CommentContent>
      </CommentWrapper>
    </CommentContainer>
  );
};

const CommentContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff5e;
  z-index: 25;
  border-radius: 25px;
`;

const CommentWrapper = styled.div`
  width: 450px;
  height: 430px;
  border-radius: 20px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  padding: 40px;
  position: relative;
  .comment-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  @media ${devices.tabletL} {
    width: 95%;
    padding: 30px 10px;
  }
  @media ${devices.tabletS} {
    width: 95%;
    padding: 30px 10px;
  }
  @media ${devices.mobileL} {
    width: 95%;
    padding: 30px 10px;
  }
  @media ${devices.mobileM} {
    width: 95%;
    padding: 30px 10px;
  }
  @media ${devices.mobileS} {
    width: 95%;
    padding: 30px 10px;
  }
`;

const CommentContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  h2 {
    font-size: 1.1rem;
  }
  .comment-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
  }
  button {
    width: 100%;
    height: 40px;
    min-height: 40px;
    border-radius: 3px;
    background-color: ${color.btnSecondery};
    cursor: pointer;
    transition: 300ms;
    &:hover {
      background-color: ${color.btnPrimary};
      color: ${color.textPrimary};
      transform: scale(1.02);
    }
    &:active {
      transform: scale(1);
    }
    span {
      font-family: ver(--font-Jost);
      font-size: 1rem;
    }
  }
`;
export default UserCommment;
