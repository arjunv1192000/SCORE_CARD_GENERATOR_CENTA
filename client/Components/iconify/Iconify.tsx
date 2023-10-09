import PropTypes from 'prop-types';
import { forwardRef, CSSProperties, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';


interface IconifyProps {
  sx?: CSSProperties;
  width?: number | string;
  icon?: ReactNode | string;
}

const Iconify = forwardRef<HTMLDivElement, IconifyProps>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

Iconify.propTypes = {
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default Iconify;
