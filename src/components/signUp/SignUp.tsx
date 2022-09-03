import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import styles from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const { username: email, password, confirmPassword } = values;
    setIsLoading(true);
    try {
      await axios.post('http://123.56.149.216:8080/auth/register', {
        email,
        password,
        confirmPassword,
      });
      navigate('../signIn');
    } catch (e: any) {
      setIsLoading(false);
      setError(e.message);
      console.log(error);
      alert('Failed to register...');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onRetype = () => {
    if (error) setError(null);
  };

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      className={styles['register-form']}>
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username' }]}
        hasFeedback
        validateStatus={isLoading ? 'validating' : error ? 'error' : ''}>
        <Input onChange={onRetype} />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password' }]}
        hasFeedback
        validateStatus={isLoading ? 'validating' : error ? 'error' : ''}>
        <Input.Password onChange={onRetype} />
      </Form.Item>

      <Form.Item
        label='Confirm Password'
        name='confirmPassword'
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (getFieldValue('password') === value) return Promise.resolve();
              else if (value === '') return Promise.reject();
              else
                return Promise.reject(
                  'Those passwords didn’t match. Try again.'
                );
            },
          }),
        ]}
        validateStatus={isLoading ? 'validating' : error ? 'error' : ''}
        help={error && 'username or password is invalid'}>
        <Input.Password onChange={onRetype} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          disabled={error !== null}
          style={{ width: '100%' }}
          loading={isLoading}
          type='primary'
          htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
