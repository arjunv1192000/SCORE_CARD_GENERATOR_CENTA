'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from '../../Axios/User/axios'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../../redux/action/useraction';
import ReCAPTCHA from 'react-google-recaptcha';

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isOTPRequired, setIsOTPRequired] = useState(false);
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [email, setEmail] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    if (isOTPRequired && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);

    };
  }, [isOTPRequired, countdown]);



  const handleLogin = async () => {
    try {
      if (!captchaValue) {
        toast.error('Please complete the CAPTCHA verification.');
        return;
      }
      setLoading(true);


      const response = await axios.post(`/checkEmail?email=${email}`);

      if (response.data.status == true) {
        toast.success('Successfully')

        setIsOTPRequired(true);
      } else {


        toast.error(response.data.message)

        console.error('User does not exist.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleOTPSubmit = async () => {


    try {
      setLoading(true);

      const response = await axios.post('/verifyOTP', { email, otp });

      if (response.data.status === true) {
        toast.success('Successfully')

        const userEmail = response.data.email;
       
        router.push(`/user/home?email=${userEmail}`);
        console.log('OTP verified successfully');
      } else {
       
        toast.error('OTP verification failed.');
        
        router.push(`/user/home?email=${userEmail}`);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <Stack spacing={3}>
        {!isOTPRequired ? (
          <>
            <TextField
              name="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ReCAPTCHA
              sitekey="6LfYHYsoAAAAAMcIvr1FiUGemIzl53vAnptErps1"
              onChange={(value) => setCaptchaValue(value)}
            />
          </>
        ) : (
          <TextField
            name="otp"
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        )}
      </Stack>

      {!isOTPRequired ? (
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleLogin}
          loading={loading}
          sx={{ mt: 5 }}
        >
          Send OTP
        </LoadingButton>
      ) : (
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleOTPSubmit}
          loading={loading}
          sx={{ mt: 5 }}
        >
          Verify OTP ({countdown}s)
        </LoadingButton>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </>
  );
}
