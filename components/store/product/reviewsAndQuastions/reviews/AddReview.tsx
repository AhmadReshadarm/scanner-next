import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Rating } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { handleFileChange } from './helpers';
import { TAuthState } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearImageList } from 'redux/slicers/imagesSlicer';
import { Product } from 'swagger/services';
import { AppDispatch } from 'redux/store';
import { createReview } from 'redux/slicers/store/productInfoSlicer';
import { openErrorNotification } from 'common/helpers';

type Props = {
  product: Product | undefined;
};
const AddReview: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [rate, setRate] = useState(0);
  const [src, setSrc] = useState([]);
  const [input, setInput] = useState('');
  const [success, setSuccess] = useState('');
  const inputRef = useRef<any>(null);
  const imageList = useAppSelector<any[]>((state) => state.images.imageList);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const handleClick = (evt: any, setUploadBtnAvailable) => {
    evt.preventDefault();
    setUploadBtnAvailable(false);
    inputRef.current.click();
  };

  const handleDelete = (passed: any) => {
    setSrc(src.filter((item) => item != passed));
  };

  const handleReviewPublish =
    (
      dispatch: AppDispatch,
      rating: number,
      images: string[],
      text: string,
      userId: string,
      productId: string,
    ) =>
    async (e) => {
      e.preventDefault();

      if (rating < 1) {
        openErrorNotification('Пожалуйста, дайте этому товару оценку');
        return;
      }
      if (text.length > 300 || text.length === 0) {
        openErrorNotification(
          'Минимальное количество символов: 2, максимальное количество символов: 300.',
        );
        return;
      }
      const payload = {
        rating,
        text,
        images: images.join(', '),
        productId,
        userId,
      };
      await dispatch(createReview(payload));

      setSuccess('Ваш отзыв опубликован');
      setTimeout(() => setSuccess(''), 2000);
    };

  useEffect(() => {
    return () => {
      dispatch(clearImageList());
    };
  }, []);
  const [uploadBtnAvailable, setUploadBtnAvailable] = useState(true);

  return (
    <AddReviewContainer
      custom={0}
      initial="init"
      whileInView="animate"
      variants={variants.fadeOutSlideOut}
    >
      <StarsWrapper>
        <span>Оцените этот товар</span>
        <Rating
          value={rate}
          size="medium"
          onChange={(event, newValue: any) => {
            setRate(newValue);
          }}
        />
      </StarsWrapper>
      <form>
        <span>Напишите комментарий об этом товаре</span>
        <TextField
          fullWidth
          label="Комментарий"
          multiline
          rows={4}
          value={input}
          defaultValue=""
          onChange={(e) => setInput(e.target.value)}
        />

        <span>Загрузите изображения товара</span>
        <span style={{ textAlign: 'center' }}>
          не более 4 изображений, размер файлов должен быть меньше 2 МБ
        </span>
        <input
          ref={inputRef}
          type="file"
          name="img"
          multiple
          max={4}
          accept="image/png, image/gif, image/jpeg"
          onClick={() => setUploadBtnAvailable(false)}
          onChange={(evt) =>
            handleFileChange(evt, setSrc, dispatch, setUploadBtnAvailable)
          }
        />
        {uploadBtnAvailable || src.length == 0 ? (
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            onClick={(evt) => handleClick(evt, setUploadBtnAvailable)}
          >
            <span>Выберите изображения</span>
            <span>
              <svg
                width="28"
                height="26"
                viewBox="0 0 28 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20.9375"
                  cy="19.5"
                  r="5.8"
                  stroke="white"
                  stroke-width="1.4"
                />
                <path
                  d="M20.8906 21.8594V17.1406M20.8906 17.1406L22.6719 18.9219M20.8906 17.1406L19.2031 18.8281"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.375 16.7891L6.90625 11.2578L11.7812 16.1328L18.7031 9.21094L24.125 14.6328"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="11.875" cy="9.9375" r="2.25" fill="white" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.375 2.15H5.125C3.13678 2.15 1.525 3.76178 1.525 5.75V21C1.525 22.9882 3.13678 24.6 5.125 24.6H19.981C20.3693 25.1108 20.8458 25.5508 21.3879 25.8973C21.0608 25.9646 20.722 26 20.375 26H5.125C2.36358 26 0.125 23.7614 0.125 21V5.75C0.125 2.98858 2.36358 0.75 5.125 0.75H20.375C23.1364 0.75 25.375 2.98858 25.375 5.75V14.9405C24.9628 14.5468 24.4912 14.2147 23.975 13.9592V5.75C23.975 3.76178 22.3632 2.15 20.375 2.15Z"
                  fill="white"
                />
              </svg>
            </span>
          </motion.button>
        ) : (
          ''
        )}
        <motion.button
          whileHover={{ boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.25)' }}
          whileTap={{ boxShadow: '0px 0px 0px 0px #ffffff' }}
          custom={0}
          animate={input.length == 0 ? 'init' : 'animate'}
          variants={variants.fadeOutSlideOut}
          style={{ display: input.length == 0 ? 'none' : 'flex' }}
          onClick={handleReviewPublish(
            dispatch,
            rate,
            imageList,
            input,
            user?.id!,
            product?.id!,
          )}
        >
          <span>Опубликовать обзор</span>
          <span>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.8107 11.3975L11.7704 17.7666C11.9827 18.5159 12.26 19.1221 12.6002 19.5382C12.9426 19.9569 13.4115 20.2483 13.964 20.1574C14.4828 20.0721 14.8966 19.6734 15.2143 19.164C15.5392 18.643 15.8199 17.9196 16.0452 17.006L20.7918 1.01729C20.8572 0.797135 20.7642 0.560762 20.5663 0.444192C20.4881 0.398121 20.4014 0.375446 20.3153 0.374989C20.2443 0.364174 20.1703 0.368548 20.098 0.39001L4.10819 5.13547C3.19452 5.36068 2.47101 5.64132 1.95002 5.96615C1.44058 6.28378 1.04189 6.69747 0.956497 7.21622C0.865553 7.76871 1.15715 8.23761 1.57583 8.57985C1.9919 8.91994 2.59813 9.19718 3.34748 9.40941L9.8107 11.3975ZM3.63606 8.45194L9.85185 10.3639L18.4551 1.92069L4.38137 6.0975C4.37374 6.09976 4.36607 6.10185 4.35834 6.10374C3.49616 6.31544 2.87978 6.5649 2.47909 6.81472C2.06465 7.07312 1.95939 7.28037 1.94322 7.37865C1.93259 7.4432 1.9418 7.58742 2.20871 7.80559C2.47719 8.02505 2.93935 8.25497 3.625 8.44868L3.62504 8.44855L3.63606 8.45194ZM12.7279 17.478L10.8155 11.2627L19.2611 2.65972L15.0832 16.7327C15.0818 16.7373 15.0805 16.742 15.0792 16.7467C15.0784 16.7497 15.0777 16.7527 15.0769 16.7557C14.8652 17.6178 14.6157 18.2342 14.3658 18.6348C14.1073 19.0492 13.9 19.1545 13.8016 19.1707C13.7369 19.1813 13.5926 19.172 13.3744 18.9052C13.1549 18.6367 12.9249 18.1746 12.7312 17.489L12.7313 17.489L12.7279 17.478Z"
                fill="white"
              />
            </svg>
          </span>
        </motion.button>
      </form>
      <motion.span
        className="success-review"
        custom={0}
        animate={success.length == 0 ? 'init' : 'animate'}
        variants={variants.fadeOutSlideOut}
      >
        {/* {success} */}
      </motion.span>
      <PreviewWrapper style={{ display: src.length == 0 ? 'none' : 'grid' }}>
        {src.map((item, index) => {
          return (
            <motion.li
              custom={index * 0.02}
              initial="init"
              whileInView="animate"
              viewport={{ once: true }}
              variants={variants.fadInSlideUp}
              key={index}
            >
              <motion.img
                custom={index * 0.08}
                initial="init"
                whileInView="animate"
                viewport={{ once: true }}
                variants={variants.slideInFromRigh}
                src={item}
                alt=""
              />
              <motion.span
                custom={1.05}
                whileHover="hover"
                whileTap="tap"
                variants={variants.grow}
                className="delete-wrapper"
                onClick={() => handleDelete(item)}
              >
                <span>Удалить</span>
                <span>
                  <svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3.46 8.88L4.87 7.47L7 9.59L9.12 7.47L10.53 8.88L8.41 11L10.53 13.12L9.12 14.53L7 12.41L4.88 14.53L3.47 13.12L5.59 11L3.46 8.88ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
                      fill="#ED3969"
                    />
                  </svg>
                </span>
              </motion.span>
            </motion.li>
          );
        })}
      </PreviewWrapper>
    </AddReviewContainer>
  );
};

const AddReviewContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  border-radius: 20px;
  gap: 20px;
  .success-review {
    color: ${color.ok};
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    textarea {
      width: 100%;
    }
    input {
      display: none;
    }
    button {
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      background-color: ${color.btnPrimary};
      color: ${color.textPrimary};
      border-radius: 15px;
      span {
        display: flex;
      }
    }
  }
`;

const StarsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
`;

const PreviewWrapper = styled.ul`
  width: 100%;
  height: 125px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(min-content, max-content);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  user-select: none;
  padding: 5px;
  li {
    width: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 0.8rem;
    .delete-wrapper {
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: ${color.hover};
      cursor: pointer;
    }
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
`;

export default AddReview;
