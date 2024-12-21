import { Button, Form, Input, Select, Spin } from 'antd';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { Page } from 'routes/constants';
import { User } from 'swagger/services';
import FormItem from '../../generalComponents/FormItem';
import styles from './settings.module.scss';
import { ManageUsersFields } from './ManageUsersFields.enum';
import { Role } from 'common/enums/roles.enum';
const { Option } = Select;
import { handleFormSubmitUsers } from './helpers';
import { useAppDispatch } from 'redux/hooks';

type Props = {
  title: string;
  user?: User;
  isLoading: boolean;
};

const ManageUsersForm = ({ title, user, isLoading }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  return (
    <>
      <div className={styles.createBrandHeader}>
        <h1 className={styles.createBrandHeader__title}>{title}</h1>
      </div>

      <Form
        layout="vertical"
        onFinish={handleFormSubmitUsers(router, dispatch)}
        form={form}
        requiredMark={true}
        className={styles.createBrandForm}
      >
        <FormItem
          option={ManageUsersFields.firstName}
          children={<Input placeholder="Имя" />}
        />
        <FormItem
          option={ManageUsersFields.lastName}
          children={<Input placeholder="Фамлия" />}
        />
        <FormItem
          option={ManageUsersFields.email}
          children={<Input required={true} placeholder="Почта" />}
        />

        <FormItem
          option={ManageUsersFields.password}
          children={<Input required={true} placeholder="Пароль" />}
        />

        <Form.Item name={ManageUsersFields.role} label="Роль пользователя">
          <Select defaultValue={Role.User}>
            <Option required={true} value={Role.User}>
              {Role.User}
            </Option>
            <Option required={true} value={Role.Admin}>
              {Role.Admin}
            </Option>
          </Select>
        </Form.Item>

        <Form.Item className={styles.createBrandForm__buttonsStack}>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.createBrandForm__buttonsStack__submitButton}
            loading={isLoading}
          >
            Создать
          </Button>
          <Button
            type="primary"
            onClick={navigateTo(router, Page.ADMIN_SETTINGS_USERS)}
          >
            Вернуться назад
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ManageUsersForm;
