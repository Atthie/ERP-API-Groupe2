import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'atthiemn@gmail.com',
    pass: 'qyif tnrt vuzw tpuv',
  },
});

export default transporter;
