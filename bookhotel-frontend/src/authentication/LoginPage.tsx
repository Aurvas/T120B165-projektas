import React, { useContext } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Button,
  Title,
  Space,
  Alert,
  PasswordInput,
  Loader,
  Card,
  Container,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib';
import { useMutation } from 'react-query';
import { FiAlertTriangle } from 'react-icons/fi';
import LoginData from './models/LoginData';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { UserContextType } from './models/User';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext) as UserContextType;
  const form: UseFormReturnType<LoginData> = useForm({
    initialValues: new LoginData({
      userName: '',
      password: '',
    }),
    validate: {
      userName: (value) => (value.length == null ? 'Enter username' : null),
      password: (value) => (value.length == null ? 'Enter password' : null),
    },
  });

  const { mutate, isLoading, error, isError } = useMutation(login, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (err: any) => {},
  });

  return (
    <Container style={{ marginTop: '100px' }}>
      <Card shadow="xl" p="md" style={{ maxWidth: 400 }} mx="auto" withBorder>
        {isLoading ? (
          <Loader color="lime" size={80} variant="bars" />
        ) : (
          <form className="form" onSubmit={form.onSubmit(() => mutate(form.values))}>
            <Title order={1}>Prisijungimas</Title>
            <Space h="md" />
            <TextInput
              required
              label="Slapyvardis"
              placeholder="Slapyvardis"
              variant="filled"
              {...form.getInputProps('userName')}
            />
            <PasswordInput
              required
              label="Slaptažodis"
              placeholder="Slaptažodis"
              variant="filled"
              {...form.getInputProps('password')}
            />
            <Button
              variant="outline"
              color="lime"
              radius="xl"
              size="md"
              style={{ marginTop: 20 }}
              type="submit"
            >
              Prisijungti
            </Button>
            <Space h="md" />
            {isError && (
              <Alert icon={<FiAlertTriangle />} title="Kažkas nepavyko!" color="red" radius="md">
                {error.response?.data.message}
              </Alert>
            )}
          </form>
        )}
      </Card>
    </Container>
  );
};

export default LoginPage;
