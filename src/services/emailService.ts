
import emailjs from 'emailjs-com';
import { EMAIL_CONFIG } from '@/config/apiKeys';

// Initialize EmailJS with the public user key
// This is safe to use client-side as it's restricted by domain
export const initEmailJS = () => {
  console.log('Initializing EmailJS with User ID:', EMAIL_CONFIG.USER_ID);
  emailjs.init(EMAIL_CONFIG.USER_ID);
};

// Send investment interest email
// This uses the public EmailJS configuration which is domain-restricted
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
             Time: ${new Date().toLocaleTimeString()}
             
             The investor needs to complete these requirements before approval:
             - Sign investment contract
             - Complete intro meeting
             - Upload ID verification
             - Submit additional documentation`
  };

  console.log('Sending email with params:', emailParams);
  console.log('Using EmailJS configuration:', {
    serviceId: EMAIL_CONFIG.SERVICE_ID,
    templateId: EMAIL_CONFIG.TEMPLATE_ID,
    userId: EMAIL_CONFIG.USER_ID.substring(0, 4) + '...'  // Log partial ID for security
  });
  
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
