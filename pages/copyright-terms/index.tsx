import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { devices } from 'components/store/lib/Devices';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import Link from 'next/link';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { baseUrl } from 'common/constant';

const Copyrights = () => {
  return (
    <>
      <SEOstatic
        page={{
          realName:
            'NBHOZ - интернет магазин хозтовары оптом. по выгодным ценам',
          name: 'NBHOZ - интернет магазин хозтовары оптом. по выгодным ценам',
          url: '/',
          desc: `NBHOZ, Дешевые хозтовары оптом в интернет магазине nbhoz в Москве и все Россия`,
          keywords:
            'nbhoz, nbhoz.ru, Товары для сервировки стола,купить Кухонная утварь, Товары для ванной комнаты, Дешевые хозтовары',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/logo_800x800.png`}
      />

      <Container
        variants={variants.fadInOut}
        key="profile-page"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        padding="200px 0"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            gap="30px"
          >
            <Headers>Правила использования контента сайта</Headers>
            <Contents>
              Содержимое сайта{' '}
              <Link href="https://nbhoz.ru">
                <Links>nbhoz.ru</Links>
              </Link>{' '}
              (далее — Сайт), в том числе любая текстовая информация и
              графические изображения (далее — Контент), являются собственностью
              «Wuluxe» либо третьих лиц, правомерно размещающих свои материалы
              на Сайте.
            </Contents>
            <Contents>
              Использование Контента третьими лицами, в том числе перепечатка,
              воспроизведение его в любой форме, распространение, возможны
              только с письменного разрешения «Wuluxe» или третьих лиц —
              правообладателей Контента.
            </Contents>
            <Contents>
              Чтобы запросить разрешение у Интернет Решения необходимо направить
              электронное письмо на{' '}
              <Link href="mailto:help@nbhoz.ru">
                <Links>help@nbhoz.ru</Links>
              </Link>{' '}
              с обязательным указанием следующей информации:
            </Contents>
            <ListsDots>
              <li>ФИО, наименования ЮЛ/ИП;</li>
              <li>данных паспорта, ОГРН/ОГРНИП, ИНН;</li>
              <li>мобильного телефона, электронной почты.</li>
            </ListsDots>
            <Contents>
              Запрос согласия у третьих лиц необходимо производить
              самостоятельно.
            </Contents>
            <Contents>
              После получения согласия на использование Контента от «Wuluxe» или
              правообладателя, использование Контента допускается при условии
              соблюдения следующих правил:
            </Contents>
            <ListsDots>
              <li>
                использование Контента должно сопровождаться указанием на
                источник их публикации —{' '}
                <Link href="https://nbhoz.ru">
                  <Links>nbhoz.ru</Links>
                </Link>
                , иных источников информации, упомянутых в Контенте (при
                наличии);
              </li>
              <li>
                использование Контента должно сопровождаться упоминанием его
                правообладателя и автора, если не разрешено обратное;
              </li>
              <li>
                Контент может быть использован только в некоммерческих
                информационных или личных целях;
              </li>
              <li>
                Контент может быть использован лишь в том виде, в каком он
                размещен на Сайте, без внесения в него изменений;
              </li>
              <li>
                графические изображения, являющиеся Контентом, не могут быть
                использованы отдельно от сопровождающего их текста.
              </li>
            </ListsDots>
            <Contents>
              Контент может включать неточности или орфографические ошибки.
              Последующее распространение или иная обработка персональных
              данных, размещенных на Сайте, допускается только с согласия
              соответствующего субъекта персональных данных.
            </Contents>
            <Headers>Защита интеллектуальной собственности</Headers>
            <Contents>
              Wuluxe заинтересован в предотвращении на платформе нарушений прав
              на интеллектуальную собственность, в том числе авторских прав,
              патентных прав, а также прав на товарные знаки.
            </Contents>
            <Contents>
              Если вы считаете, что размещённый на Сайте Контент нарушает ваши
              права, сообщите об этом, направив электронное письмо на адрес{' '}
              <Link href="mailto:help@nbhoz.ru">
                <Links>help@nbhoz.ru</Links>
              </Link>{' '}
              с обязательным указанием следующей информации:
            </Contents>
            <ListsDots>
              <li>ФИО, наименования ЮЛ, ИП;</li>
              <li>данных паспорта, ОГРН/ОГРНИП, ИНН;</li>
              <li>мобильного телефона, электронной почты;</li>
              <li>ссылки на нарушение</li>
              <li>копии доверенности на представителя правообладателя;</li>
              <li>документов, подтверждающие права на объект ИС.</li>
            </ListsDots>
            <Contents>Примеры подтверждающих документов:</Contents>
            <ListsDots>
              <li>
                исходные файлы, зарегистрированные графические изображения,
                договор с организацией (исполнителем работ);
              </li>
              <li>
                патент на изобретение, полезную модель или промышленный образец;
              </li>
              <li>свидетельство на товарный знак;</li>
              <li>
                лицензионный договор на использование объекта ИС,
                предусматривающий право на защиту объекта ИС.
              </li>
            </ListsDots>
            <Contents>
              Направляя электронное письмо, Вы подтверждаете, что:
            </Contents>
            <ListNumbers>
              <li>
                Вы — правообладатель/представитель правообладателя объекта
                интеллектуальной собственности (далее — объект ИС).
              </li>
              <li>
                Вы или уполномоченное мной лицо не давали разрешения на
                использование объекта ИС.
              </li>
              <li>
                Вы соглашаетесь на обработку персональных данных в целях
                пресечения и прекращения нарушения прав на объект ИС, а также
                соглашаетесь с тем, что сведения, указанные в заявлении (включая
                персональные данные), могут быть направлены лицу, нарушающему
                права на объект ИС.
              </li>
            </ListNumbers>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

const Headers = styled.h1`
width:100%:
text-align:start;
`;

const Contents = styled.span`
  width: 60%;
  text-align: start;
  line-height: 1.5rem;
  font-size: 1rem;
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

const Links = styled.span`
  color: ${color.hoverBtnBg};
  &:hover {
    color: ${color.ok};
  }
`;

const ListsDots = styled.ul`
  width: 60%;
  text-align: start;
  padding-left: 15px;
  line-height: 1.5rem;
  font-size: 1rem;
  li {
    list-style-type: circle;
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
const ListNumbers = styled.ol`
  width: 60%;
  text-align: start;
  padding-left: 15px;
  line-height: 1.5rem;
  font-size: 1rem;
  li {
    list-style-type: number;
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

Copyrights.PageLayout = StoreLayout;

export default Copyrights;
