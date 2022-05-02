import React from 'react';
import { Box, Avatar, Text, Grid } from '@chakra-ui/react';

type ListProps = {
    items: object[];
    item: React.FC<any>;
    p?: string | number;
    bg?: string;
    mb?: string | number;
    gap?: string | number;
    borderRadius?: string | number;
    display?: string;
}

const List = ({ items, item: Item, ...more }: ListProps) => {
    return (
        <Grid
            display='flex'
            {...more}
        >
            {items.map((item, index) => {
                return (
                    <Box key={index}>
                        <Item item={item} />
                    </Box>
                )
            })}
        </Grid>
    )
}

export default List;
