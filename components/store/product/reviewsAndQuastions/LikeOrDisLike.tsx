import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { styleProps } from 'components/store/lib/types';
import { devices } from 'components/store/lib/Devices';

type Props = {
  bgColor: string;
  likeNum: number;
  dislikeNum: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLikeClick: (e) => void;
  onDislikeClick: (e) => void;
};
const LikeDisLike: React.FC<Props> = ({
  bgColor,
  likeNum,
  dislikeNum,
  isLiked,
  isDisliked,
  onLikeClick,
  onDislikeClick,
}) => {
  return (
    <LikeDisLikeWrapper bgcolor={bgColor}>
      <motion.button
        custom={1.1}
        whileHover="hover"
        whileTap="tap"
        variants={variants.grow}
        onClick={onLikeClick}
        style={{ background: isLiked ? '#dfdfdf' : '#fff' }}
      >
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.945 0.00194721C9.08526 -0.00594885 9.2256 0.015795 9.3569 0.065762C9.48819 0.115729 9.60748 0.192798 9.707 0.291947C10.1343 0.719201 10.4436 1.24986 10.6049 1.83222C10.7661 2.41458 10.7737 3.02877 10.627 3.61495L10.281 4.99995H12.004C12.2949 5.00006 12.5823 5.06363 12.8462 5.18625C13.11 5.30887 13.3439 5.48756 13.5316 5.70988C13.7192 5.9322 13.8561 6.19278 13.9327 6.47345C14.0093 6.75412 14.0237 7.04812 13.975 7.33495L13.127 12.3349C13.0479 12.8007 12.8065 13.2233 12.4455 13.5281C12.0846 13.8329 11.6274 14 11.155 13.9999H9C8.73478 13.9999 8.48043 13.8946 8.29289 13.7071C8.10536 13.5195 8 13.2652 8 12.9999C8 12.7347 8.10536 12.4804 8.29289 12.2928C8.48043 12.1053 8.73478 11.9999 9 11.9999H11.155L12.004 6.99995H9C8.84799 6.99994 8.69799 6.96529 8.56139 6.89861C8.42479 6.83194 8.30518 6.735 8.21167 6.61516C8.11815 6.49533 8.05318 6.35575 8.0217 6.20704C7.99023 6.05833 7.99306 5.9044 8.03 5.75695L8.687 3.12895C8.70157 3.07033 8.71259 3.01089 8.72 2.95095L6 6.34995V12.9999C6 13.2652 5.89464 13.5195 5.70711 13.7071C5.51957 13.8946 5.26522 13.9999 5 13.9999H1C0.734784 13.9999 0.48043 13.8946 0.292893 13.7071C0.105357 13.5195 0 13.2652 0 12.9999V5.99995C0 5.73473 0.105357 5.48038 0.292893 5.29284C0.48043 5.1053 0.734784 4.99995 1 4.99995C1.26522 4.99995 1.51957 5.1053 1.70711 5.29284C1.89464 5.48038 2 5.73473 2 5.99995V11.9999H4V5.99995C4.00018 5.77267 4.07777 5.55223 4.22 5.37495L8.22 0.374947C8.30787 0.265338 8.41784 0.175471 8.54276 0.111203C8.66768 0.0469355 8.80473 0.00970819 8.945 0.00194721V0.00194721Z"
            fill="black"
          />
        </svg>
        {likeNum}
      </motion.button>
      <motion.button
        custom={1.1}
        whileHover="hover"
        whileTap="tap"
        variants={variants.grow}
        className="dislike"
        onClick={onDislikeClick}
        style={{ background: isDisliked ? '#dfdfdf' : '#fff' }}
      >
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.945 0.00194721C9.08526 -0.00594885 9.2256 0.015795 9.3569 0.065762C9.48819 0.115729 9.60748 0.192798 9.707 0.291947C10.1343 0.719201 10.4436 1.24986 10.6049 1.83222C10.7661 2.41458 10.7737 3.02877 10.627 3.61495L10.281 4.99995H12.004C12.2949 5.00006 12.5823 5.06363 12.8462 5.18625C13.11 5.30887 13.3439 5.48756 13.5316 5.70988C13.7192 5.9322 13.8561 6.19278 13.9327 6.47345C14.0093 6.75412 14.0237 7.04812 13.975 7.33495L13.127 12.3349C13.0479 12.8007 12.8065 13.2233 12.4455 13.5281C12.0846 13.8329 11.6274 14 11.155 13.9999H9C8.73478 13.9999 8.48043 13.8946 8.29289 13.7071C8.10536 13.5195 8 13.2652 8 12.9999C8 12.7347 8.10536 12.4804 8.29289 12.2928C8.48043 12.1053 8.73478 11.9999 9 11.9999H11.155L12.004 6.99995H9C8.84799 6.99994 8.69799 6.96529 8.56139 6.89861C8.42479 6.83194 8.30518 6.735 8.21167 6.61516C8.11815 6.49533 8.05318 6.35575 8.0217 6.20704C7.99023 6.05833 7.99306 5.9044 8.03 5.75695L8.687 3.12895C8.70157 3.07033 8.71259 3.01089 8.72 2.95095L6 6.34995V12.9999C6 13.2652 5.89464 13.5195 5.70711 13.7071C5.51957 13.8946 5.26522 13.9999 5 13.9999H1C0.734784 13.9999 0.48043 13.8946 0.292893 13.7071C0.105357 13.5195 0 13.2652 0 12.9999V5.99995C0 5.73473 0.105357 5.48038 0.292893 5.29284C0.48043 5.1053 0.734784 4.99995 1 4.99995C1.26522 4.99995 1.51957 5.1053 1.70711 5.29284C1.89464 5.48038 2 5.73473 2 5.99995V11.9999H4V5.99995C4.00018 5.77267 4.07777 5.55223 4.22 5.37495L8.22 0.374947C8.30787 0.265338 8.41784 0.175471 8.54276 0.111203C8.66768 0.0469355 8.80473 0.00970819 8.945 0.00194721V0.00194721Z"
            fill="black"
          />
        </svg>
        {dislikeNum}
      </motion.button>
    </LikeDisLikeWrapper>
  );
};

const LikeDisLikeWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  transition: 300ms;
  button {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    border-radius: 20px;
    background-color: ${(p: styleProps) => p.bgcolor};
    box-shadow: 0px 2px 6px ${color.boxShadowBtn};
    cursor: pointer;
  }
  .dislike {
    svg {
      transform: rotate(180deg);
    }
  }
  @media ${devices.mobileL} {
    justify-content: flex-end;
  }
  @media ${devices.mobileM} {
    justify-content: flex-end;
  }

  @media ${devices.mobileS} {
    justify-content: flex-end;
  }
`;

export default LikeDisLike;
