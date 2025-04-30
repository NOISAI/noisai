
import emailjs from 'emailjs-com';
import { EMAIL_CONFIG } from '@/config/apiKeys';

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAIL_CONFIG.USER_ID);
};

// Send investment interest email
export const sendInvestmentInterestEmail = async (data: {
  investorEmail: string;
  investmentName: string;
  amount: string;
}) => {
  const emailParams = {
    to_email: 'info@noisai.tech',
    from_name: 'NOISAI Investment Platform',
    subject: 'New Investment Interest',
    investor_name: data.investorEmail,
    investment_name: data.investmentName,
    investment_amount: `$${Number(data.amount).toLocaleString()}`,
    message: `A new investment request has been submitted for ${data.investmentName}. 
             Amount: $${Number(data.amount).toLocaleString()}
             Investor Email: ${data.investorEmail}
             Date: ${new Date().toLocaleDateString()}
             Time: ${new Date().toLocaleTimeString()}`
  };

  console.log('Sending email with params:', emailParams);
  
  return emailjs.send(
    EMAIL_CONFIG.SERVICE_ID,
    EMAIL_CONFIG.TEMPLATE_ID,
    emailParams
  ).then(response => {
    console.log('Email sent successfully:', response);
    return response;
  }).catch(error => {
    console.error('Email sending failed:', error);
    throw error;
  });
};
