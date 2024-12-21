import AdminLayout from 'components/admin/adminLayout/layout';
import styled from 'styled-components';
import { UserOutlined, IdcardOutlined } from '@ant-design/icons';
import Link from 'next/link';
import color from 'components/store/lib/ui.colors';
import Head from 'next/head';
const Users = () => {
  return (
    <>
      <Head>
        <title>Администрирование {`>`} Настройки | NBHOZ</title>
      </Head>
      <Wrapper>
        <Link href="/admin/settings/users" className="content">
          <span>Пользователи</span>
          <span>
            <UserOutlined />
          </span>
        </Link>
        <Link href="/admin/settings/subscribers" className="content">
          <span>Подписчики</span>
          <span>
            <IdcardOutlined />
          </span>
        </Link>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-contet: flex-start;
  padding: 50px 20px;
  gap: 30px;
  .content {
    width: 200px;
    height: 40px;
    background-color: ${color.btnSecondery};
    cursor: pointer;
    transition: 300ms;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    gap: 30px;
    &:hover {
      background-color: ${color.searchBtnBg};

      transform: scale(1.02);
    }
    &:active {
      transform: scale(1);
      background-color: ${color.btnPrimary};
      color: ${color.textPrimary};
    }
    span {
      font-family: ver(--font-Jost);
      font-size: 1rem;
      &:hover {
        background-color: ${color.searchBtnBg};

        transform: scale(1.02);
      }
    }
  }
`;
Users.PageLayout = AdminLayout;
export default Users;
