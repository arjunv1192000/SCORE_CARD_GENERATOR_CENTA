"use client"
import React, { useState, useRef } from 'react';
import Header from '@/Components/user/Header';
import { Box, Typography, Button, Modal, Paper } from '@mui/material';
import axios from '../.../../../../Axios/User/axios';
import { useSearchParams } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Page() {
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const searchParams = useSearchParams();
  let userEmail = searchParams.get('email') || '';

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`/getUserData?email=${userEmail}`);
      setUserData(response.data.userdata[0]);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Create a ref for the content you want to capture
  const contentRef = useRef();

  const handleDownloadImage = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current).then((canvas) => {
        const imageUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = 'scorecard.png';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  };

  const handleDownloadPDF = async () => {
    if (contentRef.current) {
      html2canvas(contentRef.current).then((canvas) => {
        const imageUrl = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imageUrl, 'PNG', 0, 0, 210, 297);
        pdf.save('scorecard.pdf');
      });
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          width: '95%',
          height: 700,
          borderRadius: 6,
          backgroundColor: 'white',
          marginLeft: 5,
          marginTop: 5,
          boxShadow: 6,
          zIndex: 1,
        }}
      >
        <Typography>dddddjdkdk</Typography>

        <Button
          variant="outlined"
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          onClick={handleButtonClick}
        >
          View Scorecard
        </Button>

        <Modal open={modalOpen} onClose={closeModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Paper sx={{ padding: 2 }}>
              {userData && (
                <div ref={contentRef}>
                  <Paper
                    id="report-card"
                    elevation={3}
                    className="text-black p-4 rounded-lg flex flex-col justify-between items-center"
                    style={{ width: '500px', padding: 5 }}
                  >
                    <Typography variant="h5" component="h1" align="center">
                      APJ Abdul Kalam Technological University
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                      College of Engineering Trikaripur ,cheemeni
                    </Typography>
                    <div className="text-black">
                      <div className="mt-5">
                        {/* Student Information */}
                        <Typography variant="subtitle2" className="font-bold">
                          Student ID: {userData.student_card_id}
                        </Typography>
                        <Typography variant="h6" className="font-bold my-2">
                          Name: {userData.student_fullname}
                        </Typography>
                        <Typography variant="subtitle2" className="font-bold">
                          Email: {userData.student_email}
                        </Typography>
                      </div>
                      <div className="mt-5">
                        {/* Test Information */}
                        <Typography variant="subtitle2" className="font-bold">
                          ID: {userData.student_id}
                        </Typography>
                        <Typography variant="subtitle2" className="font-bold">
                          Subject: {userData.subject}
                        </Typography>
                        <Typography variant="subtitle2" className="font-bold">
                          Test Taking Date: {userData.test_taking_date}
                        </Typography>
                        <Typography variant="subtitle2" className="font-bold">
                          Full Marks: {userData.full_marks}
                        </Typography>
                        <Typography variant="subtitle2" className="font-bold">
                          Mark Obtained: {userData.marks_obtained}
                        </Typography>
                        <Typography variant="subtitle2" className="font-bold">
                          Overall Percentage: {userData.overall_percentage}
                        </Typography>
                      </div>
                    </div>
                    <Typography align="center" className="mt-4"></Typography>
                  </Paper>
                </div>
              )}
              <Button onClick={handleDownloadImage}>Download as Image</Button>
              <Button onClick={handleDownloadPDF}>Download as PDF</Button>
              <Button onClick={closeModal}>Close</Button>
            </Paper>
          </Box>
        </Modal>
      </Box>
    </>
  );
}

export default Page;
