
import emailjs from 'emailjs-com';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_noisai';  // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_investment';  // Replace with your EmailJS template ID
const EMAILJS_USER_ID = 'Du9xFraDxhJYnMU_I';  // Updated with a valid EmailJS public key

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_USER_ID);
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
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    emailParams
  ).then(response => {
    console.log('Email sent successfully:', response);
    return response;
  }).catch(error => {
    console.error('Email sending failed:', error);
    throw error;
  });
};
