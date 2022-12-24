import {
  Button,
  Card,
  Center,
  Container,
  Group,
  Loader,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import City from '../models/City';
import CityService from '../services/CityService';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useContext, useEffect, useState } from 'react';

const CityEdit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [dialogOpened, setDialogOpened] = useState(false);

  const { isLoading: isCityLoading, data: city } = useQuery(['city', id], CityService.getCity, {
    enabled: !!id,
  });
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const { mutate: saveCity, isLoading } = useMutation(CityService.saveCity, {
    onSuccess: async (city) => {
      await queryClient.invalidateQueries('cities');
      navigate('/cities');
    },
    onError: () => {},
  });

  const { mutate: deleteProduct, isLoading: isDeleteLoading } = useMutation(CityService.deleteCity, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('cities');
      navigate('/cities');
    },
    onError: () => {},
  });

  const handleImageAdd = (uploadedFile: File) => {
    setFile(uploadedFile);
  };
  const handleImageRemove = () => {
    setFile(null);
  };

  const form = useForm<Partial<City>>({
    initialValues: {
      cityName: '',
      county: '',
      imageUrl: '',
    },
  });

  useEffect(() => {
    form.setValues({
      cityName: city?.cityName,
      county: city?.county,
      imageUrl: city?.imageUrl,
    });
  }, [city]);

  const handleProductDelete = () => {
    setDialogOpened(true);
  };

  return (
    <>
      <Container size="sm" px="xl" style={{ marginTop: '50px' }}>
        <Card shadow="sm" style={{ padding: '32px' }}>
          {isLoading || isCityLoading || isDeleteLoading ? (
            <Center>
              <Loader size="xl" variant="dots" />
            </Center>
          ) : (
            <form
              onSubmit={form.onSubmit(() =>
                saveCity(new City({ ...form.values, _id: id })),
                )
              }
            >
              <Stack spacing="lg">
                <Title order={2}>{id ? 'Kaukės redagavimas' : 'Pridėti miestą'}</Title>
                <TextInput
                  variant="default"
                  placeholder="Pavadinimas"
                  label="Pavadinimas"
                  required
                  {...form.getInputProps('cityName')}
                />
                <TextInput
                  variant="default"
                  placeholder="Rajonas"
                  label="Rajonas"
                  {...form.getInputProps('county')}
                />
				<TextInput
                  variant="default"
                  placeholder="Nuotraukos URL"
                  label="Nuotraukos URL"
                  {...form.getInputProps('imageUrl')}
                />
                <Group>
                  <Button type="submit">Išsaugoti</Button>
                  <Button color="gray" onClick={() => navigate(-1)}>
                    Atšaukti
                  </Button>
                  {id && (
                    <Button color="red" onClick={() => handleProductDelete()} leftIcon={<AiOutlineDelete />}>
                      Ištrinti
                    </Button>
                  )}
                </Group>
              </Stack>
            </form>
          )}
        </Card>
      </Container>
    </>
  );
};

export default CityEdit;
