import { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components';

export interface ImageProp {
  /**  */
  index: string;
}

export const dumyDataLoader: ColumnsType<ImageProp> = [
  {
    title: 'Изображения',
    dataIndex: 'index',
    render: () => {
      return <LoaderMask style={{ width: '200px', height: '200px' }} />;
    },
    width: '10%',
  },
  {
    title: 'Имя',
    dataIndex: 'index',
    render: () => {
      return <LoaderMask style={{ width: '100%', height: '20px' }} />;
    },
    width: '25%',
  },
  {
    title: 'URL',
    dataIndex: 'index',
    render: () => {
      return <LoaderMask style={{ width: '100%', height: '20px' }} />;
    },
    width: '30%',
  },
];

const LoaderMask = styled.div`
  background: #cccccca3;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;
