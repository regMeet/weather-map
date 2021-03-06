import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react';

import { WeatherLinks } from 'pages/common/WeatherLinksEnum';
import { GoogleIcon, Logo, PasswordField } from 'components/common';

// TODO: disable button login / change color schema if it's not form valid
export function LoginPage() {
  const { t } = useTranslation();

  const [hasRememberMe, setRememberMe] = useState<boolean>(true);

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Flex as={NavLink} to={WeatherLinks.HOME} justify="center">
            <Logo />
          </Flex>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              {t('login.title')}
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">{t('login.no-account.label')}</Text>
              <Button as="a" href={WeatherLinks.SIGN_UP} variant="link" colorScheme="blue">
                {t('login.sign-up.link')}
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">{t('login.email.field')}</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
            <HStack justify="space-between">
              <Checkbox
                isChecked={hasRememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                }}
              >
                {t('login.remember-me.field')}
              </Checkbox>
              <Button
                as="a"
                href={WeatherLinks.FORGOT_PASSWORD}
                variant="link"
                colorScheme="blue"
                size="sm"
              >
                {t('login.forgot-password.link')}
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button colorScheme="blue">{t('login.sign-in.button.label')}</Button>
              <Button>
                <GoogleIcon boxSize="5" marginInlineEnd={3} />
                <Text>{t('login.google-sign-in.button.label')}</Text>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
