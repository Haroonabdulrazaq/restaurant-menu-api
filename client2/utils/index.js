export const errorLogger = (error) => {
  if (error.response) {
    console.error('Error response:', error.response.data);
    console.error('Error status:', error.response.status);
  } else if (error.request) {
    console.error('Error request:', error.request);
  } else {
    console.error('Error message:', error.message);
  }
  console.error('Error config:', error.config);
};

export const convertCentsToDollars = (cents) => {
  return cents / 100;
};
