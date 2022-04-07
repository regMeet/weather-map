import { extendTheme, theme as baseTheme, useColorModeValue } from '@chakra-ui/react';

export function customTheme() {
  const border = '1px';

  const theme = extendTheme({
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
  return theme;
}
