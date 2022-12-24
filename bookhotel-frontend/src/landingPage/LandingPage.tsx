import React, { useCallback, useContext, useState } from 'react';
import {
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
  Image,
  BackgroundImage,
  Accordion,
  ThemeIcon,
  Space,
  Blockquote,
  Card,
  Divider,
  Center,
  Affix,
  Transition,
} from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthContext } from '../authentication/context/AuthContext';
import { UserContextType } from '../authentication/models/User';
import { useWindowScroll } from '@mantine/hooks';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { RiSurgicalMaskFill } from 'react-icons/ri';
import NavBar from '../common/components/NavBar';
import { AiOutlinePhone } from 'react-icons/ai';

const containerStyle = {
  width: '100%',
  height: 'auto',
  zIndex: '1',
};

const LandingPage = () => {
  const { user } = useContext(AuthContext) as UserContextType;
  const userIsAdmin = user?.roles === 'Admin';
  const queryClient = useQueryClient();
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <img
        src="https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          zIndex: '-10',
          marginTop: '-20px',
        }}
      ></img>
      <NavBar />
      <Card
        shadow="md"
        radius="lg"
        p="md"
        withBorder
        style={{
          width: '60%',
          margin: 'auto',
          marginBottom: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <Container style={containerStyle}>
          <Title
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#1971C2',
              textAlign: 'center',
              marginTop: '5rem',
              marginBottom: '2rem',
              fontFamily: 'Segoe UI',
            }}
          >
            Sveiki atvykę į BookHotel
          </Title>
          <Divider my="sm" />
          <Text
            style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              color: '#1864AB',
              textAlign: 'left',
              marginBottom: '2rem',
              fontFamily: 'Segoe UI',
            }}
          >
            BookHotel projektas, kuriame galima matyti miestų viešbučiusir jų kambarius. Galimas miestų, viešbučių ir kambarių pridėjimas, redagavimas ir šalinimas
          </Text>
          <Divider my="sm" />
          <Image
            src="https://media.istockphoto.com/id/1207021262/vector/cute-small-light-red-village-house-with-garage.jpg?b=1&s=170667a&w=0&k=20&c=ZOjQglbPnKKnCtrCzlduPRtnF5OmivNkLHffU2zMBBw="
            style={{
              margin: 'auto',
              maxWidth: '50%',
              maxHeight: '50%',
              boxShadow: '0 8px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}
          />
          <Space h="xl" />
          <Divider my="sm" />
		  <Center>
		  <Affix>
          <Text
            component="span"
            align="center"
            size="xl"
            weight={400}
            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            color="dimmed"
          >
            Aurimas Vaseris IFF-9/10
          </Text>
		  </Affix>
		  </Center>
          <Space h="xl" />
          
          <Divider my="sm" />
        </Container>
      </Card>
    </>
  );
};

export default LandingPage;
