import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { handleEdit, handleHover } from './helpers';
import { useState } from 'react';
import { generateArrayOfNumbers } from 'common/helpers/array.helper';
const cards = generateArrayOfNumbers(2);
const Cards = () => {
  return (
    <Wrapper
      custom={0.4}
      initial="init"
      whileInView="animate"
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
      id="user-cards"
    >
      {cards.map((card, index) => {
        return (
          <CardWrapper
            custom={1.02}
            whileHover="hover"
            whileTap="tap"
            variants={variants.grow}
            key={index}
          >
            <div className="card-front">
              <span className="card-number">**** **** **** *111</span>
              <span className="card-due">12 / 07</span>
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                className="delete-card"
              >
                Удалить
              </motion.button>
            </div>
          </CardWrapper>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled(motion.ul)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  padding: 10px 20px;
`;

const CardWrapper = styled(motion.li)`
  width: 300px;
  height: 180px;
  display: flex;
  flex-direction: row;
  justify-contetn: center;
  align-items: center;
  .card-front {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    box-shadow: 0px 2px 6px ${color.boxShadowBtn};
    background-color: ${color.textPrimary};
    padding: 30px;
    border-radius: 15px;
    span {
      font-size: 1rem;
    }
    .card-number {
      color: ${color.textTertiary};
    }
    .card-due {
      color: ${color.textSecondary};
    }
    .delete-card {
      width: 80px;
      height: 30px;
      border-radius: 8px;
      background-color: ${color.hover};
      color: ${color.textPrimary};
    }
  }
`;

export default Cards;
