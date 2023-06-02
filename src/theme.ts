import { extendTheme } from "native-base";

const theme = extendTheme({
  fontConfig: {
    Inter: {
      100: {
        normal: "Inter-ExtraLight",
      },
      200: {
        normal: "Inter-Light",
      },
      300: {
        normal: "Inter-Regular",
      },
      400: {
        normal: "Inter-Bold",
      },
      500: {
        normal: "Inter-Black",
      },
      700: {
        normal: "Inter-Black",
      },
      800: {
        normal: "Inter-Black",
      },
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
    mono: "Inter",
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "lg",
        bg: "custom.main",
        bgColor: "custom.main",
        _disabled: {
          bg: "gray.400",
          bgColor: "gray.400",
        },
        _text: {
          fontWeight: "300",
          fontFamily: "body",
        },
      },
      defaultProps: {
        //colorScheme: "primary",
        //shadow: 5,
      },
    },
    Input: {
      defaultProps: {
        size: "md",
        underlineColorAndroid: "transparent",
        fontWeight: 300,
      },
      baseStyle: {
        borderRadius: "lg",
        borderColor: "trueGray.400",
        _focus: {
          borderColor: "custom.main",
        },
        placeholderTextColor: "warmGray.500",
        //color: "custom.main",
      },
    },
  },
  colors: {
    // Add new color

    primary: {
      50: "#2c0f46",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#0088CC",
      600: "#007AB8",
      700: "#006BA1",
      800: "#581c87",
      900: "#4f1979",
    },
    custom: {
      main: "#46166c",
      payRent: "#DAA520",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#FFD8FF",
      600: "#FF89FF",
      700: "#2c0f46",
      800: "#2c0f46", //"#6b21a8",
      900: "#341051", //use purple
    },

    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: "#d97706",
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "light",
  },
});

type CustomThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}

export default theme;
