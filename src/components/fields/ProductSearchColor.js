import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { colors as getColorsApi } from '../../services/Product';

const ProductSearchColor = (props) => {
    const [ colors, setColors ] = useState([]);

    const theme = useTheme();
    
    useEffect(() => {
        getColorsApi(props.product.product_id)
        .then(res => {
            setColors(res);
        });
    }, [props.product])

    const handleColorSelect = (e, product_color_id) => {
        e.preventDefault();
        props.handleColorSelect(colors.find((col) => col.product_color_id === product_color_id));
    }
    
    return (
        <Box
            display='flex'
            flexDirection='column'
            width='100%'
            marginTop={1}
        >
            <Typography variant='subtitle1'>
                <FormattedMessage id='Color'/>
            </Typography>
            <Box
                display='flex'
                width='100%'
                flexWrap='wrap'
            >
                {
                    colors.length ?
                    colors.map((col, i) => {
                        return (
                            <Button 
                                key={i}
                                style={{marginRight: theme.spacing(1), marginTop: theme.spacing(1)}}
                                onClick={(e) => handleColorSelect(e, col.product_color_id)}
                                variant='contained'
                                disableElevation
                                color={col.product_color_id === props.color.product_color_id ? 'primary' : 'default'}
                                size='small'
                            >
                                {col.product_color_desc}
                            </Button>
                        )
                    }) : null
                }
            </Box>
        </Box>
    );
}
 
export default ProductSearchColor;