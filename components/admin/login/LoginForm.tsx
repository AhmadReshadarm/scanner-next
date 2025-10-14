import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppDispatch } from 'redux/hooks';
import { handleFormSubmit } from './helpers';
import styles from './LoginForm.module.scss';

type Props = {
  isLoading: boolean;
};

const LoginForm: React.FC<Props> = ({ isLoading }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const initialValues = {
    remember: true,
  };

  return (
    <Form
      name="normal_login"
      className={styles['login-form']}
      initialValues={initialValues}
      onFinish={handleFormSubmit(router, dispatch)}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите email!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className={styles['site-form__item-icon']} />}
          type="email"
          placeholder="Логин"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите пароль!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className={styles['site-form__item-icon']} />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <a className={styles['login-form__forgot']} href="/profile/pswreset">
          Забыли пароль
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className={styles['login-form__button']}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
