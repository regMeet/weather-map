import { NavLink } from 'react-router-dom';
import { Link as UILink, useColorModeValue } from '@chakra-ui/react';

export function Link({ href, label }) {
  const linkColor = useColorModeValue('gray.600', 'gray.200');

  const border = '1px';
  const ActiveColor = 'gray.400';

  return (
    <UILink
      as={NavLink}
      to={href}
      p={2}
      fontSize="sm"
      fontWeight={500}
      colorScheme="primary"
      color={linkColor}
      borderColor={ActiveColor}
      _hover={{
        textDecoration: 'none',

        borderBottom: border,
        borderColor: { ActiveColor },
        fontWeight: 'bold'
      }}
      _activeLink={{ fontWeight: 'bold', borderBottom: border }}
    >
      {label}
    </UILink>
  );
}
