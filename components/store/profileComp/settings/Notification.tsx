import styled from 'styled-components';
import { motion } from 'framer-motion';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { useEffect, useState } from 'react';
import { handleEmailChange } from './helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TSubscribers } from 'redux/types';
import {
  createSubscriber,
  deleteSubscriber,
  fetchSubscriberByEmail,
} from 'redux/slicers/subscriberSlicer';
import { User } from 'swagger/services';
import Loading from 'ui-kit/Loading';

type Props = {
  user: User;
};

const Notifactions: React.FC<Props> = ({ user }) => {
  const [editNotify, setEditNotify] = useState(false);
  const [email, setEmail] = useState(user.email);
  const { Subscriber, loading } = useAppSelector<TSubscribers>(
    (state) => state.subscribers,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSubscriberByEmail(user.email as string));
  }, []);
  const handleSubscribtion = (name: string, email: string) => {
    if (Subscriber) {
      dispatch(deleteSubscriber(user.email as string));
      return;
    }
    if (!Subscriber) {
      dispatch(createSubscriber({ name, email }));
      return;
    }
  };
  return (
    <NotifactionWrapper>
      <span className="mail-icon">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_317_1705)">
            <path
              d="M20 4.5H4C2.9 4.5 2.01 5.4 2.01 6.5L2 18.5C2 19.6 2.9 20.5 4 20.5H20C21.1 20.5 22 19.6 22 18.5V6.5C22 5.4 21.1 4.5 20 4.5ZM20 18.5H4V8.5L12 13.5L20 8.5V18.5ZM12 11.5L4 6.5H20L12 11.5Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_317_1705">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </span>
      <Notifaction>
        <h2>Уведомления</h2>
        <span style={{ color: color.hover }}>
          Изменив почта, вам также нужно будет подтвердить свой адрес
          электронной почты.
        </span>
        <div className="input-wrapper">
          <span style={{ color: color.textSecondary }}>Получать на адрес</span>
          {editNotify ? (
            <div className="notify-email-wrapper">
              <motion.input
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="change-email-btn"
                style={{
                  backgroundColor:
                    isEmpty(email) || !isEmail(email)
                      ? color.bgProduct
                      : color.btnSecondery,
                }}
                disabled={isEmpty(email) || !isEmail(email) ? true : false}
                onClick={() => {
                  setEditNotify(false);
                  handleEmailChange({ user, email });
                }}
              >
                Сохранить
              </button>
              <button
                className="change-email-btn"
                onClick={() => setEditNotify(false)}
              >
                Отмена
              </button>
            </div>
          ) : (
            <div className="notify-email-wrapper">
              <motion.span>{email}</motion.span>
              <button
                className="change-email-btn"
                onClick={() => setEditNotify(true)}
              >
                Изменить
              </button>
            </div>
          )}
        </div>

        {!loading ? (
          <div
            onClick={() => handleSubscribtion(user.firstName!, user.email!)}
            className="check-box-wrapper "
          >
            <input
              type="checkbox"
              id="review-notify"
              title="Подпишитесь на рассылку новостей"
              checked={Subscriber ? true : false}
              readOnly
            />
            <span>
              {!Subscriber
                ? 'Подпишитесь на рассылку новостей'
                : 'Вы подписаны на нашу рассылку'}
            </span>
          </div>
        ) : (
          <Loading />
        )}
      </Notifaction>
    </NotifactionWrapper>
  );
};

const NotifactionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  user-select: none;
  h2 {
    font-size: 1.3rem;
    font-weight: 300;
  }
  .mail-icon {
    width: 40px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;
const Notifaction = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  .check-box-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    span {
      font-size: 1rem;
    }
  }
  .input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    gap: 50px;
    span {
      font-size: 1rem;
    }
    .notify-email-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;

      input {
        width: 200px;
        height: 40px;
        border-radius: 5px;
        padding: 0 10px;
        font-size: 1rem;
        font-weight: 300;
        background-color: ${color.btnSecondery};
        border: none;
      }
      button {
        width: 200px;
        height: 40px;
        border-radius: 3px;
        background-color: ${color.btnSecondery};
        cursor: pointer;
        transition: 300ms;
        &:hover {
          background-color: ${color.btnPrimary} !important;
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
    }
  }

  @media ${devices.laptopS} {
    .input-wrapper {
      flex-direction: column;
      gap: 10px;
      span {
        width: 100%;
      }
      .notify-email-wrapper {
        width: 100%;
        flex-direction: column;
        .change-email-btn {
          width: 100%;
        }
        input {
          width: 100%;
        }
      }
    }
  }
  @media ${devices.tabletL} {
    .input-wrapper {
      flex-direction: column;
      gap: 10px;
      span {
        width: 100%;
      }
      .notify-email-wrapper {
        width: 100%;
        flex-direction: column;
        .change-email-btn {
          width: 100%;
        }
        input {
          width: 100%;
        }
      }
    }
  }
  @media ${devices.tabletS} {
    .input-wrapper {
      flex-direction: column;
      gap: 10px;
      span {
        width: 100%;
      }
      .notify-email-wrapper {
        width: 100%;
        flex-direction: column;
        .change-email-btn {
          width: 100%;
        }
        input {
          width: 100%;
        }
      }
    }
  }
  @media ${devices.mobileL} {
    .input-wrapper {
      flex-direction: column;
      gap: 10px;
      span {
        width: 100%;
      }
      .notify-email-wrapper {
        width: 100%;
        flex-direction: column;
        .change-email-btn {
          width: 100%;
        }
        input {
          width: 100%;
        }
      }
    }
  }
  @media ${devices.mobileM} {
    .input-wrapper {
      flex-direction: column;
      gap: 10px;
      span {
        width: 100%;
      }
      .notify-email-wrapper {
        width: 100%;
        flex-direction: column;
        .change-email-btn {
          width: 100%;
        }
        input {
          width: 100%;
        }
      }
    }
  }
  @media ${devices.mobileS} {
    .input-wrapper {
      flex-direction: column;
      gap: 10px;
      span {
        width: 100%;
      }
      .notify-email-wrapper {
        width: 100%;
        flex-direction: column;
        .change-email-btn {
          width: 100%;
        }
        input {
          width: 100%;
        }
      }
    }
  }
`;

export default Notifactions;
