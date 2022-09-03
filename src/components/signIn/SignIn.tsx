import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { signIn, clearError } from '../../state/slices';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../state/hooks';
import styles from './SignIn.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const { token: jwt, isLoading, error } = useSelector(state => state.user);
  const navigate = useNavigate();
  const location: any = useLocation();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const { username: email, password } = values;
    dispatch<any>(signIn({ email, password }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    alert('Failed: ' + errorInfo);
  };

  const onRetype = () => {
    if (error) dispatch(clearError());
  };

  useEffect(() => {
    if (jwt !== null) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [jwt, navigate, location.state?.from?.pathname]);

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      className={styles['login-form']}>
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username' }]}
        hasFeedback
        validateStatus={isLoading ? 'validating' : error ? 'error' : ''}>
        <Input onChange={onRetype} />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 10 }}
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password' }]}
        hasFeedback
        validateStatus={isLoading ? 'validating' : error ? 'error' : ''}
        help={error && 'username or password is invalid'}>
        <Input.Password onChange={onRetype} />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 10 }}
        name='remember'
        valuePropName='checked'
        wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
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
