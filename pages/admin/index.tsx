import Head from 'next/head';
import AdminLayout from 'components/admin/adminLayout/layout';
import { List } from 'antd';
import { menueItems } from 'components/admin/adminLayout/constants';
import Link from 'next/link';
const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Администрирование | NBHOZ</title>
      </Head>
      <List
        size="large"
        bordered
        dataSource={menueItems}
        renderItem={(item: any) => (
          <>
            <List.Item>
              <div>
                <Link legacyBehavior href={item.key}>
                  {item.label}
                </Link>
                <div>
                  {item.children
                    ? item.children.map((child) => (
                        <List.Item>
                          <Link legacyBehavior href={child.key}>
                            {child.label}
                          </Link>
                        </List.Item>
                      ))
                    : ''}
                </div>
              </div>
            </List.Item>
          </>
        )}
      />
    </>
  );
};

IndexPage.PageLayout = AdminLayout;
export default IndexPage;
