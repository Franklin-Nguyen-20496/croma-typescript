import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({
    config,
    colors: {
        brand: {
            100: "#00E4D7",
            200: "#3A9FD8",
        },
    },
})

export default theme