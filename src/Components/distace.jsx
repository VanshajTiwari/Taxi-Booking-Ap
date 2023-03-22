// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Slider from '@mui/material/Slider';
// import MuiInput from '@mui/material/Input';
// // import VolumeUp from '@mui/icons-material/VolumeUp';

// const Input = styled(MuiInput)`
//   width: 100px;
// `;

// export default function InputSlider(props) {
//   const [value, setValue] = React.useState(30);

//   const handleSliderChange = (event, newValue) => {
//     setValue(newValue);
//     props.setDetails({...props.qdata,radius: `${newValue*100}`})
//   };

//   const handleInputChange = (event) => {
//     setValue(event.target.value === '' ? '' : Number(event.target.value));
//   };

//   const handleBlur = () => {
//     if (value < 0) {
//       setValue(0);
//     } else if (value > 100) {
//       setValue(100);
//     }
//   };

//   return (
//     <Box sx={{ width: 250 }}>
//       <Typography id="input-slider" gutterBottom style={{"color": "white"}}>
//         Search in radius of ...
//       </Typography>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs>
//           <Slider
//             value={typeof value === 'number' ? (value) : 0}
//             onChange={handleSliderChange}
//             aria-labelledby="input-slider"
//           />
//         </Grid>
//         <Grid item>
//           <Input
//             value={value}
//             size="small"
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             inputProps={{
//               step: 10,
//               min: 0,
//               max: 100,
//               type: 'number',
//               'aria-labelledby': 'input-slider',
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
