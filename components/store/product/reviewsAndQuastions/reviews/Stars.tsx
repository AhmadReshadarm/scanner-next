import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Rating } from '@mui/material';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { getTotalReviewsNumber, progressBarCalc } from './helpers';
import React from 'react';
import { TProductInfoState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';

const Stars = () => {
  const { product }: TProductInfoState = useAppSelector(
    (state) => state.productInfo,
  );
  const totalReviews = getTotalReviewsNumber(product?.rating);
  return (
    <>
      {!!product?.rating && (
        <StarsContainer>
          <StarWrapper
            custom={0.1}
            initial="init"
            whileInView="animate"
            viewport={{ once: true }}
            variants={variants.fadInSlideUp}
          >
            <Rating value={product?.rating?.avg} size="large" readOnly />
            <span>{`${product?.rating?.avg ?? 0}/5`}</span>
          </StarWrapper>
          {Object.entries(product?.rating ?? {})
            .reverse()
            .map(([key, number], index) => {
              return (
                <React.Fragment key={`stars-${index}`}>
                  {!isNaN(Number(key)) && (
                    <ProgressBarContaier
                      key={`progress-bar-${index}`}
                      custom={index * 0.05}
                      initial="init"
                      whileInView="animate"
                      viewport={{ once: true }}
                      variants={variants.fadInSlideUp}
                    >
                      <span>
                        {6 - index}
                        {index == 0
                          ? ' звезд'
                          : index == 4
                          ? ' звезда'
                          : ' звезды'}
                      </span>
                      <ProgressBarWrapper>
                        <span id="progress-bg"></span>
                        <ProgressBar
                          initial={{ width: '0%', opacity: 0 }}
                          whileInView={{
                            width: `${progressBarCalc(totalReviews, number)}%`,
                            opacity: 1,
                          }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 }}
                        ></ProgressBar>
                      </ProgressBarWrapper>
                      <span>{number}</span>
                    </ProgressBarContaier>
                  )}
                </React.Fragment>
              );
            })}
        </StarsContainer>
      )}
    </>
  );
};

const StarsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  border-radius: 20px;
  gap: 20px;
`;

const StarWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e2e7ec;
`;

const ProgressBarContaier = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  span {
    white-space: nowrap;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 80%;
  height: 6px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  #progress-bg {
    width: 100%;
    height: 100%;
    background-color: #e2e7ec;
    border-radius: 5px;
  }
`;

const ProgressBar = styled(motion.span)`
  width: 100%;
  height: 100%;
  background-color: ${color.yellow};
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
`;

export default Stars;
