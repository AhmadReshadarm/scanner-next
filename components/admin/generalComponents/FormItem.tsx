import { Form } from 'antd';
import { InputField } from '../../../common/enums/inputField.enum';
import { capitalizeFirstLetter } from 'common/helpers/capitalizeFirstLetter.helper';

interface Props {
  children: any;
  option: string | undefined;
  valuePropName?: string;
  initialValue?: any;
}

const FormItem = ({ children, option, valuePropName, initialValue }: Props) => {
  return (
    <Form.Item
      valuePropName={valuePropName}
      label={InputField[capitalizeFirstLetter(option)]}
      name={option}
      initialValue={initialValue}
      fieldKey={option}
      required
    >
      {children}
    </Form.Item>
  );
};

export default FormItem;
