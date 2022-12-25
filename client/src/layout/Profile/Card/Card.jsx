import { Box, useColorModeValue } from '@chakra-ui/react'

export const Card = (props) => (
    <Box
        bg={useColorModeValue('white', 'gray.700')}
        rounded={{
            md: 'lg',
        }}
        shadow="base"
        overflow="hidden"
        {...props}
    />
)