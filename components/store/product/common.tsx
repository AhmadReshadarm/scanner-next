import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import { devices } from '../lib/Devices';

const HeaderWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h3 {
    font-family: var(--font-ricordi);
    font-size: 3.2rem;
    margin: 0;
    color: ${color.textPrimary};
  }
  @media ${devices.tabletL} {
    align-items: flex-start;
    padding: 20px;
    h3 {
      font-size: 1.8rem;
    }
  }

  @media ${devices.tabletS} {
    justify-content: flex-start;
    padding: 20px;
    h3 {
      font-size: 1.2rem;
    }
  }
  @media ${devices.mobileL} {
    justify-content: flex-start;
    padding: 20px;
    h3 {
      font-size: 1rem;
    }
  }
  @media ${devices.mobileM} {
    justify-content: flex-start;
    padding: 20px;
    h3 {
      font-size: 1rem;
    }
  }
  @media ${devices.mobileS} {
    justify-content: flex-start;
    padding: 20px;
    h3 {
      font-size: 1rem;
    }
  }
`;

const SliderImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: auto;
  top: auto;
  object-fit: contain;
`;

const LoadMoreBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  button {
    width: 200px;
    height: 50px;
    border-radius: 30px;
    background-color: ${color.btnPrimary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${color.textPrimary};
    &:active {
      background-color: ${color.backgroundPrimary};
      color: ${color.activeIcons};
      border: 1px solid;
    }
  }
`;

const ReviewContainer = styled.ul`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;

  .comment-map-func-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media ${devices.laptopS} {
    width: 100%;
  }
  @media ${devices.tabletL} {
    width: 100%;
  }
  @media ${devices.tabletS} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

const ReviewReplyWrapper = styled(motion.li)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  user-select: none;
`;
const ReplyWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  user-select: none;
  padding: 0 0 0 50px;
  @media ${devices.tabletS} {
    padding: 0 0 0 10px;
  }
  @media ${devices.mobileL} {
    padding: 0 0 0 10px;
  }
  @media ${devices.mobileM} {
    padding: 0 0 0 10px;
  }
  @media ${devices.mobileS} {
    padding: 0 0 0 10px;
  }
`;

const ReviewReplyContent = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  .reply-logo,
  .user-profile-img {
    width: 70px;
    height: 70px;
    min-height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    font-weight: 500;
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    border-radius: 50%;
    border: 2px solid ${color.textPrimary};
    img {
      width: 50px;
      height: 50px;
    }
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    .reply-logo,
    .user-profile-img {
      width: 45px;
      height: 45px;
      min-width: 45px;
      min-height: 45px;
      font-size: 0.4rem;
      img {
        width: 30px;
        height: 30px;
      }
      span {
        font-size: 0.4rem;
      }
    }
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    .reply-logo,
    .user-profile-img {
      width: 45px;
      height: 45px;
      min-width: 45px;
      min-height: 45px;
      font-size: 0.4rem;
      img {
        width: 30px;
        height: 30px;
      }
      span {
        font-size: 0.4rem;
      }
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    .reply-logo,
    .user-profile-img {
      width: 40px;
      height: 40px;
      min-width: 40px;
      min-height: 40px;
      font-size: 0.4rem;
      img {
        width: 30px;
        height: 30px;
      }
      span {
        font-size: 0.4rem;
      }
    }
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    .reply-logo,
    .user-profile-img {
      width: 35px;
      height: 35px;
      min-width: 35px;
      min-height: 35px;
      font-size: 0.4rem;
      img {
        width: 30px;
        height: 30px;
      }
      span {
        font-size: 0.4rem;
      }
    }
  }
`;

const ReviewReplyItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  padding-bottom: 7px;

  .review-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 1rem;
    }
    .replied-to-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 5px;

      h3 {
        font-size: 1rem;
      }

      span {
        padding: 10px;
        border-radius: 20px;
        background-color: ${color.btnPrimary};
        color: ${color.textPrimary};
      }
    }
    .date-stars {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 20px;

      .post-date {
        color: ${color.textSecondary};
        display: flex;
        flex-direction: column;

        button {
          text-align: right;
          cursor: pointer;
          &:hover {
            color: ${color.hover};
          }
        }
      }
      @media ${devices.tabletL} {
        display: flex;
        flex-direction: column-reverse;
        gap: 5px;
      }
      @media ${devices.tabletS} {
        display: flex;
        flex-direction: column-reverse;
        gap: 5px;
      }

      @media ${devices.mobileL} {
        display: flex;
        flex-direction: column-reverse;
        gap: 5px;
      }
    }
  }
  .product-details {
    color: ${color.yellow};
    width: 100%;
    padding: 20px 0;
    font-size: 0.875rem;
  }

  .user-post-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: felx-start;
    gap: 10px;
    h3 {
      font-size: 1rem;
    }
  }
  @media ${devices.tabletL} {
    .review-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      .date-stars {
        flex-direction: column;
        align-items: flex-start;
        .post-date {
          align-items: flex-start;
        }
      }
      .replied-to-wrapper {
        h3 {
          width: 100%;
          display: flex;
          flex-direciton: row;
          align-items: center;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
  }
  @media ${devices.tabletS} {
    padding-left: 10px;
    .review-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      .date-stars {
        flex-direction: column;
        align-items: flex-start;
        .post-date {
          align-items: flex-start;
        }
      }
      .replied-to-wrapper {
        h3 {
          width: 100%;
          display: flex;
          flex-direciton: row;
          align-items: center;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
  }
  @media ${devices.mobileL} {
    .review-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      .date-stars {
        flex-direction: column;
        align-items: flex-start;
        .post-date {
          align-items: flex-start;
        }
      }

      .replied-to-wrapper {
        h3 {
          width: 100%;
          display: flex;
          flex-direciton: row;
          align-items: center;
          justify-content: flex-start;
          align-items: center;
        }
        span {
          padding: 6px;
          font-size: 0.8rem;
        }
      }
    }
  }
  @media ${devices.mobileM} {
    .review-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      .date-stars {
        flex-direction: column;
        align-items: flex-start;
        .post-date {
          align-items: flex-start;
        }
      }
      .replied-to-wrapper {
        h3 {
          width: 100%;
          display: flex;
          flex-direciton: row;
          align-items: center;
          justify-content: flex-start;
          align-items: center;
        }
        span {
          padding: 6px;
          font-size: 0.8rem;
        }
      }
    }
  }

  @media ${devices.mobileS} {
    .review-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      .date-stars {
        flex-direction: column;
        align-items: flex-start;
        .post-date {
          align-items: flex-start;
        }
      }
      .replied-to-wrapper {
        h3 {
          width: 100%;
          display: flex;
          flex-direciton: row;
          align-items: center;
          justify-content: flex-start;
          align-items: center;
        }
        span {
          padding: 6px;
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const UserImageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .side-line {
    width: 1px;
    height: 100%;
    background-color: ${color.textSecondary};
  }

  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`;

export {
  HeaderWrapper,
  SliderImage,
  LoadMoreBtnWrapper,
  ReviewContainer,
  ReviewReplyWrapper,
  ReplyWrapper,
  ReviewReplyContent,
  ReviewReplyItem,
  UserImageWrapper,
};
