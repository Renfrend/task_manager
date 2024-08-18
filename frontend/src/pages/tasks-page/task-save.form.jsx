import { Form, Input } from 'antd';
import { useEffect } from 'react';

export default function TaskSaveForm({
  selectedTask,
  onSubmit,
  onFormInstanceReady,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(selectedTask);
  }, [form, selectedTask]);

  useEffect(() => {
    onFormInstanceReady && onFormInstanceReady(form);
  }, [form, onFormInstanceReady]);

  return (
    <Form form={form} layout='vertical' onFinish={onSubmit}>
      <Form.Item
        name='title'
        label='Title'
        rules={[
          {
            required: true,
            message: 'Please input title!',
          },
          { min: 2, max: 32 },
        ]}
      >
        <Input placeholder='title' />
      </Form.Item>

      <Form.Item
        name='text'
        label='Text'
        rules={[
          {
            required: true,
            message: 'Please input text!',
          },
          { min: 2, max: 128 },
        ]}
      >
        <Input placeholder='text' />
      </Form.Item>
    </Form>
  );
}
