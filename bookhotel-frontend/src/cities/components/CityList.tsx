import { useNavigate, useParams } from 'react-router-dom';
import CityBox from './CityBox';
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

import { SetStateAction, useContext, useState } from 'react';
import { AuthContext } from '../../authentication/context/AuthContext';
import { UserContextType } from '../../authentication/models/User';
import { FiSearch } from 'react-icons/fi';

const CityList = () => {
  // const queryClient = useQueryClient()
  // queryClient.invalidateQueries('masks')

  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  
  
  const { user } = useContext(AuthContext) as UserContextType;
  
  user? console.log(user) :console.log('null');
  //console.log(user.userName);
  const userIsAdmin = user?.roles[0] === 'Admin';
  const { isLoading, data: cities } = useQuery(['/api/cities', id], CityService.getCities,{
      enabled: true,

      onSuccess: (cities) => {},
    });
	console.log(cities);
  return (
  <>
      <div>
	  <Container size={1300}>
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
                Pridėti miestą
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
            {cities instanceof Array &&
              cities.map((city: any, index: number) => (
                <Grid.Col key={index} md={6} lg={6}>
                  <Center>
                    <CityBox city={new City(city)} />
                  </Center>
                </Grid.Col>
              ))}
          </Grid>
        )}
		</Container>
      </div>
	  </>
  );
};

export default CityList;
