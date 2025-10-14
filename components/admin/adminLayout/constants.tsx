import {
  BgColorsOutlined,
  DesktopOutlined,
  // HeatMapOutlined,
  PieChartOutlined,
  TagsOutlined,
  // SkinOutlined,
  CommentOutlined,
  ReconciliationOutlined,
  QuestionCircleOutlined,
  FundProjectionScreenOutlined,
  // PicLeftOutlined,
  SettingOutlined,
  UserOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { Page, paths } from 'routes/constants';

import { getItem } from './helpers';
import { PathWords, TMenuItem } from './types';

export const menueItems: TMenuItem[] = [
  getItem('Категории', paths[Page.ADMIN_CATEGORIES], <PieChartOutlined />),
  getItem('Продукты', paths[Page.ADMIN_PRODUCTS], <DesktopOutlined />),
  getItem('Цвета', paths[Page.ADMIN_COLORS], <BgColorsOutlined />),
  // getItem('Бренды', paths[Page.ADMIN_BRANDS], <HeatMapOutlined />),
  getItem('Коллекция', paths[Page.ADMIN_TAGS], <TagsOutlined />),
  // getItem('Размер', paths[Page.ADMIN_SIZES], <SkinOutlined />),
  getItem('Отзывы', paths[Page.ADMIN_REVIEWS], <CommentOutlined />),
  getItem('Вопросы', paths[Page.ADMIN_QUESTIONS], <QuestionCircleOutlined />),
  getItem('Заказы', paths[Page.ADMIN_CHECKOUTS], <ReconciliationOutlined />),
  // getItem('Новости', paths[Page.ADMIN_NEWS], <PicLeftOutlined />),
  getItem(
    'Баннеры',
    paths[Page.ADMIN_BANNERS],
    <FundProjectionScreenOutlined />,
  ),
  getItem('Настройки', paths[Page.ADMIN_SETTINGS], <SettingOutlined />, [
    getItem('Пользователи', paths[Page.ADMIN_SETTINGS_USERS], <UserOutlined />),
    getItem(
      'Подписчики',
      paths[Page.ADMIN_SETTINGS_SUBSCRIBERS],
      <IdcardOutlined />,
    ),
  ]),
];

export const pathWords: PathWords = {
  categories: 'Категории',
  'categories/[id]': 'Редактирование категории',
  'categories/create-category': 'Создание новой категории',
  colors: 'Цвета',
  'colors/create-color': 'Создание цвета',
  'colors/[id]': 'Редактирование цвета',
  // brands: 'Бренды',
  // 'brands/create-brand': 'Создание бренда',
  // 'brands/[id]': 'Редактирование бренда',
  products: 'Продукты',
  'products/create-product': 'Создание продукта',
  'products/[id]': 'Редактирование продукта',
  tags: 'Коллекция',
  'tags/create-tag': 'Создание Коллекция',
  'tags/[id]': 'Редактирование Коллекция',
  // sizes: 'Размер',
  // 'sizes/create-size': 'Создание размер',
  // 'sizes/[id]': 'Редактирование размер',
  reviews: 'Отзывы',
  questions: 'Вопросы',
  checkouts: 'Заказы',
  // newsPosts: 'Новости',
  // 'news/create-news': 'Создание Новости',
  // 'news/[id]': 'Редактирование Новости',
  settings: 'Настройки',
  'settings/users': 'Пользователи',
  'settings/users/create-user': 'Создание пользователь',
  'settings/subscribers': 'Подписчики',
  banners: 'Баннеры',
  'banners/update-banner': 'Обновление баннеров',
};
