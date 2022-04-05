import { NavLink } from 'react-router-dom';
import { Link as UILink } from '@chakra-ui/react';

export function Link({ href, label }) {
  const border = '1px';

  return (
    <UILink as={NavLink} to={href} _activeLink={{ fontWeight: 'bold', borderBottom: border }}>
      {label}
    </UILink>
  );
}
