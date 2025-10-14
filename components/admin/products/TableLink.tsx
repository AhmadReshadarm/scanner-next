import styles from './products.module.scss';
import { NextRouter, useRouter } from 'next/router';
import { ReactNode } from 'react';

interface Props {
  id: string;
  name: string;
  handleRedirect: (id: string, router: NextRouter) => void & any;
}

const TableLink = ({ id, name, handleRedirect }: Props) => {
  const router = useRouter();

  return (
    <p
      className={styles.productsTable__linkName}
      onClick={handleRedirect(id, router)}
    >
      {name as ReactNode}
    </p>
  );
};

export default TableLink;
