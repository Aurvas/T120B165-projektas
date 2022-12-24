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
import Hotel from '../models/Hotel';
import HotelService from '../services/HotelService';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useContext, useEffect, useState } from 'react';


const HotelEdit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [dialogOpened, setDialogOpened] = useState(false);

  const { isLoading: isHotelLoading, data: hotel } = useQuery(['hotel', id], HotelService.getHotel, {
    enabled: !!id,
  });
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();


  const { mutate: saveHotel, isLoading } = useMutation(HotelService.saveHotel, {
    onSuccess: async (hotel) => {
      await queryClient.invalidateQueries('hotels');
      navigate('/hotels');
    },
    onError: () => {},
  });

  const { mutate: deleteProduct, isLoading: isDeleteLoading } = useMutation(HotelService.deleteHotel, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('hotels');
      navigate('/hotels');
    },
    onError: () => {},
  });

  const handleImageAdd = (uploadedFile: File) => {
    setFile(uploadedFile);
  };
  const handleImageRemove = () => {
    setFile(null);
  };

  const form = useForm<Partial<Hotel>>({
    initialValues: {
      name: '',
      address: '',
      email: '',
      starCount: '',
    },
  });

  useEffect(() => {
    form.setValues({
      name: hotel?.name,
      address: hotel?.address,
      email: hotel?.email,
      starCount: hotel?.starCount,
    });
  }, [hotel]);

  const handleProductDelete = () => {
    setDialogOpened(true);
  };

  return (
    <>
      <Container size="sm" px="xl" style={{ marginTop: '50px' }}>
        <Card shadow="sm" style={{ padding: '32px' }}>
          {isLoading || isHotelLoading || isDeleteLoading ? (
            <Center>
              <Loader size="xl" variant="dots" />
            </Center>
          ) : (
            <form
              onSubmit={form.onSubmit(() =>
                saveHotel(new Hotel({ ...form.values, _id: id })),
                )
              }
            >
              <Stack spacing="lg">
                <Title order={2}>{id ? 'Kaukės redagavimas' : 'Nauja kaukė'}</Title>
                <TextInput
                  variant="default"
                  placeholder="Pavadinimas"
                  label="Pavadinimas"
                  required
                  {...form.getInputProps('name')}
                />
                <TextInput
                  variant="default"
                  placeholder="Brendas"
                  label="Brendas"
                  {...form.getInputProps('address')}
                />
                <NumberInput
                  variant="default"
                  placeholder="Kiekis"
                  label="Kiekis"
                  min={0}
                  required
                  {...form.getInputProps('email')}
                />
                <NumberInput
                  variant="default"
                  placeholder="Kaina"
                  label="Kaina"
                  precision={2}
                  min={0}
                  required
                  {...form.getInputProps('price')}
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

export default HotelEdit;
