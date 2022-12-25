import React, { useContext } from 'react';
import SignupData from './models/SignupData';
import {
  TextInput,
  Button,
  Title,
  Space,
  Text,
  Anchor,
  Alert,
  Card,
  Loader,
  Center,
  Container,
  PasswordInput,
} from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useMutation } from 'react-query';
import { FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { UserContextType } from './models/User';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext) as UserContextType;
  const form: UseFormReturnType<SignupData> = useForm({
    initialValues: new SignupData({
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
      termsOfService: false,
	  
    }),
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Password must be 8 characters or more' : null),
      confirmPassword: (value) => (value !== form.values.password ? 'Passwords must match' : null),
      userName: (value) => (value.length < 2 ? 'First name must be 2 characters or more' : null),
    },
  });
  

  const { mutate, isLoading, error, isError } = useMutation(signup, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (err: any) => {},
  });

  return (
    <Container style={{ marginTop: '100px' }}>
      <Card shadow="xl" p="md" sx={{ maxWidth: 400 }} mx="auto" withBorder>
        {isLoading ? (
          <Center sx={{ height: '50vh' }}>
            <Loader color="lime" size={80} variant="bars" />
          </Center>
        ) : (
          <form className="form" onSubmit={form.onSubmit(() => mutate(form.values))}>
            <Title order={1}>Registracija</Title>
            <Space h="md" />
            <TextInput
              required
              variant="filled"
              label="El. paštas"
              placeholder="vardas@puslapis.lt"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              required
              variant="filled"
              label="Slaptažodis"
              placeholder="Slaptažodis"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              required
              variant="filled"
              label="Patvirtinti slaptažodį"
              placeholder="Slaptažodis"
              {...form.getInputProps('confirmPassword')}
            />
            <TextInput
              required
              variant="filled"
              label="Slapyvardis"
              placeholder="Slapyvardis"
              {...form.getInputProps('userName')}
            />
            <Button
              variant="outline"
              color="#1971C2"
              radius="xl"
              size="md"
              style={{ marginTop: 20 }}
              type="submit"
            >
              Registruotis
            </Button>
            <Space h="xs" />
            {isError && (
              <Alert icon={<FiAlertTriangle />} title="Kažkas nepavyko!" color="red" radius="md">
                {error?.response.data.message}
              </Alert>
            )}
          </form>
        )}
      </Card>
    </Container>
  );
};
export default SignupPage;
