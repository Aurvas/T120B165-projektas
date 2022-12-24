import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import './NavBar.scss';
import { FiLogOut } from 'react-icons/fi';
import {
  Button,
  Text,
  Card,
  Container,
  Group,
  ActionIcon,
  MediaQuery,
  Burger,
  Stack,
  Anchor,
  Menu,
  Avatar,
  Divider,
  MantineSize,
} from '@mantine/core';
import React, { useContext, useState } from 'react';
import { MdOutlineMap, MdOutlineMasks } from 'react-icons/md';
import { HiQrcode, HiCreditCard } from 'react-icons/hi';
import { UserContextType } from '../../authentication/models/User';
import { AuthContext } from '../../authentication/context/AuthContext';
import { AiFillCaretDown, AiOutlineEdit, AiOutlineCreditCard, AiOutlineShoppingCart } from 'react-icons/ai';

const NavButton = ({
  to,
  color,
  title,
  icon = '',
  size = 'lg',
}: {
  to: string;
  color: string;
  title: string;
  icon?: React.ReactNode;
  size?: MantineSize;
}) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const getActiveColor = (color: string) => {
    if (color === 'green') {
      return 'rgba(235, 251, 238, 1)';
    }
  };

  return (
    <Button
      component={Link}
      to={to}
      variant="subtle"
      color={color}
      size={size}
      leftIcon={icon}
      style={{ backgroundColor: match ? getActiveColor(color!) : '' }}
    >
      {title}
    </Button>
  );
};

const NavHoverMenu = ({ user, logout, buttonSize = 'lg', avatarSize = 'md' }: any) => {
  const navigate = useNavigate();

  return (
    <Menu>

          <Group>
            <Avatar size={avatarSize} color="#1971C2" radius="xl">
              {user.userName[0].toUpperCase() + user.userName[0].toUpperCase()}
            </Avatar>
          </Group>
	
    
      <Menu.Label>{user.email}</Menu.Label>
      <Divider />
      <Menu.Item
        color={'red'}
        icon={<FiLogOut />}
        onClick={() => {
          logout();
        }}
      >
        {' '}
        Atsijungti
      </Menu.Item>
    </Menu>
  );
};

const NavBar = () => {
  const { user, logout } = useContext(AuthContext) as UserContextType;
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Container className={'navigation-bar'} mx="auto" my={20} px={20} style={{ maxWidth: '1000px' }}>
        <Card shadow="md" radius="lg" p="md" withBorder>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group position="apart">
              <NavButton to="/" color="#1971C2" title="Pagrindinis" icon={<MdOutlineMasks />} />
              <NavButton to="/cities" color="#1971C2" title="Miestai" icon={<MdOutlineMap />} />
              {!user ? (
                <Group>
                  <NavButton to="/login" color="#1971C2" title="Prisijungti" />
                  <NavButton to="/register" color="#1971C2" title="Registruotis" />
                </Group>
              ) : (
                <Group>
                  <NavHoverMenu user={user} logout={logout} />
                </Group>
              )}
            </Group>
          </MediaQuery>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Stack>
              <Group position="apart">
                <Burger size={'xs'} opened={opened} onClick={() => setOpened((o) => !o)} />
                {!user ? (
                  <Group>
                    <NavButton to="/login" color="#1971C2" title="Prisijungti" />
                    <NavButton to="/register" color="#1971C2" title="Registruotis" />
                  </Group>
                ) : (
                  <Group>
                    <NavHoverMenu avatarSize={'sm'} buttonSize={'sm'} user={user} logout={logout} />
                    {opened && (
                      <Stack>
                        <NavButton
                          size={'sm'}
                          to="/"
                          color="green"
                          title="Pagrindinis"
                          icon={<MdOutlineMasks />}
                        />
                        <NavButton
                          size={'sm'}
                          to="/cities"
                          color="green"
                          title="Miestai"
                          icon={<MdOutlineMap />}
                        />
                      </Stack>
                    )}
                  </Group>
                )}
              </Group>
            </Stack>
          </MediaQuery>
        </Card>
      </Container>
    </>
  );
};

export default NavBar;
