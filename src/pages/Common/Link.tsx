import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link as UILink, useColorModeValue } from '@chakra-ui/react';

export function Link({ href, label }) {
  const [active, setActive] = useState(false);

  const linkColor = useColorModeValue('gray.600', 'gray.200');

  const border = '1px';
  const ActiveColor = 'gray.400';

  return (
    <NavLink
      end
      to={href}
      className={({ isActive }) => {
        setActive(isActive);
        return '';
      }}
    >
      <UILink
        p={2}
        fontSize="sm"
        fontWeight={500}
        colorScheme="primary"
        color={linkColor}
        borderBottom={active ? border : ''}
        borderColor={ActiveColor}
        _hover={{
          textDecoration: 'none',

          borderBottom: border,
          borderColor: { ActiveColor }
        }}
      >
        {label}
      </UILink>
    </NavLink>
  );
}
