import { Routes, Route } from 'react-router-dom';
import {
  border,
  ChakraProvider,
  extendTheme,
  theme as baseTheme,
  useColorModeValue
} from '@chakra-ui/react';

// TODO: make it work
// import { customTheme } from 'pages/common/customTheme';

import { LoginPage, SignUpPage } from 'pages/app/auth';
import { DashboardRoutes } from './DashboardRoutes';

export function AppRoutes() {
  const customTheme = extendTheme({
    colors: {
      primary: baseTheme.colors.red[500]
    },
    components: {
      Link: {
        variants: {
          // you can name it whatever you want
          primary: ({ colorScheme = 'gray' }) => ({
            color: useColorModeValue(`${colorScheme}.500`, `${colorScheme}.200`),
            borderColor: colorScheme[500],
            p: 2,
            fontSize: 'sm',
            fontWeight: 500,
            _hover: {
              textDecoration: 'none',
              fontWeight: 'bold',
              borderBottom: border
            }
          })
        },
        defaultProps: {
          // you can name it whatever you want
          // variant: 'primary'
        }
      }
    }
  });

  return (
    <ChakraProvider theme={customTheme}>
      <div className="main">
        <Routes>
          <Route path="/" element={<DashboardRoutes />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signUp" element={<SignUpPage />} />
          <Route path="dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}
