import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, makeStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { sizeGrid as getSizeGridApi } from '../../services/Product';

const useStyles = makeStyles((theme) => ({
    sizeButton: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const ProductSearchSize = (props) => {
    const [ sizes, setSizes ] = useState([]);

    const classes = useStyles();
    
    useEffect(() => {
        getSizeGridApi(props.size_grid_id)
        .then(res => {
            let i = 1;
            const newSizes = [];
            for(; i <= 50; i++)
            {
                if (res[`s${i}`])
                    newSizes.push(res[`s${i}`]);
            }

            setSizes(newSizes);
        });
    }, [props.size_grid_id])

    const handleSizeSelect = (e, size) => {
        e.preventDefault();
        props.handleSizeSelect(size);
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            width='100%'
            padding={1}
        >
            <Typography variant='body2'>
                <FormattedMessage id='Size'/>
            </Typography>
            <Box
                display='flex'
                width='100%'
                flexWrap='wrap'
            >
                {
                    sizes && sizes.length ?
                    sizes.map((size, i) => {
                        return (
                            <Button 
                                key={i}
                                className={classes.sizeButton}
                                onClick={(e) => handleSizeSelect(e, size)}
                                variant='contained'
                                disableElevation
                                color={size === props.size ? 'primary' : 'default'}
                                size='small'
                            >
                                {size}
                            </Button>
                        )
                    }) : null
                }
            </Box>
        </Box>
    );
}
 
export default ProductSearchSize;