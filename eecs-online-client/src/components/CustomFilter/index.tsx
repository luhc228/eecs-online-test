/**
 * Filter component usually in the header of the table or the page.
 */
import React from 'react';
import { Form, Row, Col, Input, Select, InputNumber, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FORM_COMPONENT } from '@/enums';
import { FormItemComponentProps, SelectComponentDatasourceModel } from '@/interfaces/components';
import styles from './index.less';

const { Option } = Select;

interface CustomFilterProps extends FormComponentProps {
  formConfig: FormItemComponentProps[];
  filterValues: object;
  loading: boolean;
  onFieldsChange: (allFields: object) => void;
  onSubmit: (value: object) => void;
}

const CustomFilter: React.FC<CustomFilterProps> = props => {
  const { form, formConfig, onSubmit, loading } = props;
  const { getFieldDecorator } = form;

  const renderForm = (formItem: FormItemComponentProps) => {
    switch (formItem.component) {
      case FORM_COMPONENT.Input:
        return (

          <Form.Item label={formItem.label}>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        )
      case FORM_COMPONENT.Select:
        return (
          <Form.Item label={formItem.label}>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
            })(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                {formItem.datasource &&
                  formItem.datasource.map((item: SelectComponentDatasourceModel) => (
                    <Option value={item.value} key={item.label}>{item.label}</Option>
                  ))}
              </Select>,
            )}
          </Form.Item>
        )
      case FORM_COMPONENT.InputNumber:
        return (
          <Form.Item label={formItem.label}>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
            },
            )(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        )
      default:
        return null;
    }
  }


  const submitHandler = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      onSubmit(values);
    });
  }

  const handleFormReset = () => {
    props.form.resetFields();
    props.onSubmit({});
  }
  return (
    <div className={styles.tableListForm}>
      <Form onSubmit={submitHandler} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {formConfig && formConfig.map((formItem: FormItemComponentProps) => (
            <Col md={8} sm={24} key={formItem.name}>
              {renderForm(formItem)}
            </Col>
          ))}
        </Row>
        <Row>
          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit" loading={loading}>
              查询
          </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
              重置
          </Button>
          </span>
        </Row>
      </Form>
    </div>

  )
}

export default Form.create<CustomFilterProps>({
  mapPropsToFields(props: CustomFilterProps) {
    const result: { [key: string]: string | number; } = {};

    if (props.filterValues) {
      Object.entries(props.filterValues).forEach(formField => {
        const [key, field] = formField;
        result[key] = Form.createFormField(field);
      });
    }

    return result;
  },
  onFieldsChange(props: CustomFilterProps, _: any, allFields: object) {
    props.onFieldsChange(allFields);
  },
})(CustomFilter);
