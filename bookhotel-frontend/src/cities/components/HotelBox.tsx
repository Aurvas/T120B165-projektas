import './HotelBox.scss';
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
import Hotel from '../models/Hotel';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../authentication/context/AuthContext';
import { UserContextType } from '../../authentication/models/User';
import { API_URL } from '../../common/constants';

const HotelBox = ({ hotel }: { hotel: Hotel }) => {
  const { user } = useContext(AuthContext) as UserContextType;
  const [amount, setAmount] = useState(0);
  const handlers = useRef<NumberInputHandlers>();
  const userIsAdmin = user?.roles === 'Admin';
  const theme = useMantineTheme();


  return (
    <Card
      className="product-card"
      shadow="sm"
      p="xl"
      style={{
        minWidth: 350,
      }}
      component={userIsAdmin ? 'a' : 'div'}
      href={userIsAdmin ? `/hotels/${hotel.id}` : ''}
      withBorder
    >
      <Card.Section>
        <Image radius="sm" height={220} src={hotel ? `${API_URL}` : './hotel.jpeg'} />
      </Card.Section>
      <Space h="xs" />
      <Group position="apart">
        <Text weight={500}>{hotel.name}</Text>
      </Group>
      <Space h={5} />
      <Text size="md" style={{ color: theme.colors.dark[1] }}>
        {hotel.address}
      </Text>
      <Space h="xs" />
      <Text>Pirkti</Text>

      <Button
        variant="light"
        color="blue"
        fullWidth
        style={{ marginTop: 14 }}
        
      >
        Pridėti į krepšelį
      </Button>
    </Card>
  );
};

export default HotelBox;
