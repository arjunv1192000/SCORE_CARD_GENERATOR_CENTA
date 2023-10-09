'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import validationSchema from '@/validation/admin/Loginvalidation';
import axios from '../../Axios/Admin/axios'
import toast, { Toaster } from 'react-hot-toast';


interface FormValues {
  email: string;
  password: string;


}

export default function LoginForm() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {

      email: '',
      password: '',


    } as FormValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {




      const body = {

        email: values.email,
        password: values.password,

      };


      axios.post("/adminlogin", body).then((response) => {


        if (response.data.status == true) {

         

          router.push('/admin/home')

        } else {
          
          toast.error("Invalid email or password")


        }


      }).catch((response) => {
        console.error(response.message);



      })

    },

  });

  return (
    <>
      <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ paddingLeft: 20 }}>
        <Stack spacing={3}>
          <TextField
            name="email"
            label="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" >
          Login
        </LoadingButton>
      </Box>
      <Toaster
                position="top-center"
                reverseOrder={false}
            />
    </>
  );
}
