import './CityBox.scss';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  NumberInput,
  NumberInputHandlers,
  Space,
  Text,
  useMantineTheme,
} from '@mantine/core';
import City from '../models/City';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../authentication/context/AuthContext';
import { UserContextType } from '../../authentication/models/User';
import {GiModernCity} from 'react-icons/gi';
import { API_URL } from '../../common/constants';

const CityBox = ({ city }: { city: City }) => {
  const { user } = useContext(AuthContext) as UserContextType;
  const handlers = useRef<NumberInputHandlers>();
  const userIsAdmin = user?.roles === 'Admin';
  const theme = useMantineTheme();
  console.log(city);
  

  return (
    <Card
      className="product-card"
      shadow="sm"
      p="xl"
      style={{
        minWidth: 350,
      }}
      component={userIsAdmin ? 'a' : 'div'}
      href={userIsAdmin ? `/api/cities/${city.id}` : ''}
      withBorder
    >
      <Card.Section>
        <Image radius="sm" height={220} src={city.imageUrl.length > 10 ? `${city.imageUrl}`:"https://icon-library.com/images/city-icon/city-icon-23.jpg"} />
      </Card.Section>
      <Space h="xs" />
      <Group position="apart">
        <Text weight={500}>{city.cityName}</Text>
      </Group>
      <Space h={5} />
      <Text size="md" style={{ color: theme.colors.dark[1] }}>
        {city.county}
      </Text>
      <Space h="xs" />

      <Button
        variant="light"
        color="blue"
        fullWidth
        style={{ marginTop: 14 }}>
        Redaguoti
      </Button>
	  <Button
        variant="light"
        color="red"
        fullWidth
        style={{ marginTop: 14 }}>
        Šalinti
      </Button>
    </Card>
  );
};

export default CityBox;
