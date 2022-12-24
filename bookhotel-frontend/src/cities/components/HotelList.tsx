import { useNavigate, useParams } from 'react-router-dom';
import CityBox from './CityBox';
import HotelBox from './HotelBox';
import {
  Accordion,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  Radio,
  RangeSlider,
  Select,
  Space,
  TextInput,
} from '@mantine/core';
import { AiOutlineFileSearch, AiOutlinePlusCircle } from 'react-icons/ai';
import { useQuery } from 'react-query';
import CityService from '../services/CityService';
import City from '../models/City';
import Hotel from '../models/Hotel';
import HotelService from '../services/HotelService';
import { SetStateAction, useContext, useState } from 'react';
import { AuthContext } from '../../authentication/context/AuthContext';
import { UserContextType } from '../../authentication/models/User';
import { FiSearch } from 'react-icons/fi';

const HotelList = () => {
  // const queryClient = useQueryClient()
  // queryClient.invalidateQueries('masks')

  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  
  
  const { user } = useContext(AuthContext) as UserContextType;
  const userIsAdmin = user?.roles[0] === 'Admin';
  const { isLoading, data: hotels } = useQuery(['hotels', id], HotelService.getHotels,{
      enabled: true,

      onSuccess: (hotels) => {},
    });
	console.log(hotels);
  return (
      <div>
        {userIsAdmin && (
          <Container style={{ paddingTop: '25px', paddingBottom: '25px' }} size={270}>
            <Group position="center">
              <Button
                leftIcon={<AiOutlinePlusCircle />}
                radius="md"
                size="lg"
                onClick={() => {
                  navigate('add');
                }}
              >
                Pridėti kaukę
              </Button>
            </Group>
          </Container>
        )}
        {isLoading ? (
          <Center>
            <Loader size="xl" variant="dots" />
          </Center>
        ) : (
          <Grid gutter="xl" justify="center" align="center">
            {hotels instanceof Array &&
              hotels.map((hotel: any, index: number) => (
                <Grid.Col key={index} md={6} lg={3}>
                  <Center>
                    <HotelBox hotel={new Hotel(hotel)} />
                  </Center>
                </Grid.Col>
              ))}
          </Grid>
        )}
      </div>
  );
};

export default HotelList;
