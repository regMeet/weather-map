import { Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  extendTheme,
  theme as baseTheme,
  useColorModeValue
} from '@chakra-ui/react';

import { DashboardPage } from './DashboardPage';
import { LoginPage } from './LoginPage';
import { SignUpPage } from './SignUpPage';

export function App() {
  const border = '1px';

  const theme = extendTheme(
    {
      colors: {
        primary: baseTheme.colors.blue[500]
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
            variant: 'primary'
          }
        }
      }
    }
    // withDefaultColorScheme({
    //   colorScheme: 'primary'
    // })
  );

  return (
    <ChakraProvider theme={theme}>
      <div className="main">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signUp" element={<SignUpPage />} />
          <Route path="dashboard/*" element={<DashboardPage />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}
