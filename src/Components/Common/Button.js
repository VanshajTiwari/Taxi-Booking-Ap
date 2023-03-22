import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
    return (
        <Button
            sx={{
                borderRadius: 5,
                width: '20ch',
                fontWeight: '700',
                boxShadow: 'none',
                backgroundColor: 'black',
                "&:hover": {
                    transition: '0.5s ease-in-out',
                    transform: 'scale(1.5)',
                    color: 'white',
                    backgroundColor: '#689EC0',
                    boxShadow: 'none',
                },
            }}
            disabled={props.disabled} variant="contained" onClick={() => {
                props.setDisabled(true)
                props.handleAction()
            }} > {props.title} </Button>
    );
}