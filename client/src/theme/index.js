// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. declare your configuration, these are the defaults
const config = {
    useSystemColorMode: false,
    initialColorMode: "light",
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;
