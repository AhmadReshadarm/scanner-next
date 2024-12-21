import styled from 'styled-components';
import color from '../lib/ui.colors';
import Link from 'next/link';
import TelegraSVG from '../../../assets/telegramcolored.svg';

const Footer = () => {
  const copyRighYear = new Date().getFullYear();
  return (
    <Container>
      <Wrapper>
        <Link href="/copyright-terms">
          <span>© {copyRighYear} «Fingarden». Все права защищены.</span>
        </Link>
        <SocialWrapper>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://vk.com/fingarden"
          >
            <span>
              <svg
                width="22"
                height="14"
                viewBox="0 0 22 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.982 14C4.466 14 0.18 8.745 0 0H3.765C3.889 6.418 6.665 9.137 8.863 9.698V0H12.409V5.536C14.579 5.297 16.861 2.775 17.63 0H21.176C20.8874 1.43539 20.3097 2.79702 19.478 4.002C18.6521 5.19903 17.5879 6.21255 16.352 6.979C17.7316 7.6794 18.9462 8.66561 19.915 9.872C20.8908 11.0872 21.6011 12.4934 22 14H18.097C17.7403 12.6931 17.0089 11.5192 15.993 10.623C14.9872 9.73579 13.7391 9.16954 12.409 8.997V14H11.982V14Z"
                  fill="#707F8D"
                />
              </svg>
            </span>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/fingarden"
          >
            <span>
              <TelegraSVG />
            </span>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.me/+79313539004"
          >
            <span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.4989 14.3653C18.4502 14.3419 16.6277 13.4444 16.3038 13.3279C16.1716 13.2804 16.0299 13.2341 15.8793 13.2341C15.6332 13.2341 15.4265 13.3567 15.2654 13.5976C15.0834 13.8682 14.5322 14.5125 14.3619 14.7049C14.3397 14.7303 14.3093 14.7607 14.2911 14.7607C14.2748 14.7607 13.9928 14.6445 13.9074 14.6074C11.9523 13.7582 10.4683 11.7159 10.2648 11.3715C10.2357 11.322 10.2345 11.2995 10.2342 11.2995C10.2414 11.2733 10.3071 11.2074 10.3411 11.1733C10.4403 11.0751 10.5479 10.9457 10.6519 10.8204C10.7012 10.7611 10.7506 10.7017 10.799 10.6457C10.95 10.47 11.0172 10.3337 11.0951 10.1757L11.136 10.0936C11.3262 9.71563 11.1637 9.39664 11.1112 9.29364C11.0681 9.20744 10.2985 7.35013 10.2167 7.155C10.02 6.68414 9.75998 6.4649 9.39869 6.4649C9.36517 6.4649 9.39869 6.4649 9.25811 6.47083C9.08692 6.47805 8.1547 6.60078 7.74252 6.8606C7.30543 7.13617 6.56598 8.01458 6.56598 9.55938C6.56598 10.9497 7.44829 12.2625 7.8271 12.7617C7.83652 12.7743 7.8538 12.7999 7.87889 12.8366C9.32962 14.9552 11.1381 16.5254 12.9715 17.2578C14.7365 17.9628 15.5723 18.0443 16.0475 18.0443C16.0476 18.0443 16.0476 18.0443 16.0476 18.0443C16.2472 18.0443 16.4071 18.0286 16.548 18.0147L16.6375 18.0062C17.2472 17.9522 18.5872 17.2578 18.892 16.4108C19.1321 15.7437 19.1954 15.0148 19.0356 14.7503C18.9262 14.5704 18.7377 14.4799 18.4989 14.3653Z"
                  fill="#707F8D"
                />
                <path
                  d="M12.7222 0C5.95137 0 0.44292 5.46705 0.44292 12.1869C0.44292 14.3604 1.02458 16.4879 2.12644 18.3499L0.0174331 24.5711C-0.0218526 24.6871 0.00736815 24.8153 0.0931637 24.9027C0.155096 24.9659 0.239105 25 0.324901 25C0.357774 25 0.390891 24.995 0.423196 24.9847L6.91021 22.9234C8.68538 23.8718 10.6917 24.3725 12.7222 24.3725C19.4924 24.3726 25.0002 18.9061 25.0002 12.1869C25.0002 5.46705 19.4924 0 12.7222 0ZM12.7222 21.8339C10.8115 21.8339 8.96095 21.2822 7.3702 20.2384C7.31671 20.2032 7.25461 20.1852 7.19211 20.1852C7.15908 20.1852 7.12596 20.1903 7.09374 20.2005L3.84414 21.2334L4.89317 18.1386C4.9271 18.0384 4.91013 17.9279 4.84763 17.8425C3.63627 16.1873 2.99593 14.2317 2.99593 12.1869C2.99593 6.86688 7.35908 2.53864 12.7221 2.53864C18.0844 2.53864 22.4471 6.86688 22.4471 12.1869C22.4472 17.5063 18.0846 21.8339 12.7222 21.8339Z"
                  fill="#707F8D"
                />
              </svg>
            </span>
          </Link>
        </SocialWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${color.textSecondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 90%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  span {
    color: ${color.textPrimary};
    &:hover {
      color: ${color.hoverBtnBg};
    }
  }
`;

const SocialWrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  a {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    span {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
`;

export default Footer;
