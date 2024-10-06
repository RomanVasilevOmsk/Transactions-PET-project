type DateFormatOptions = {
  year?: 'numeric';
  month?: 'long';
  day?: 'numeric';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: DateFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('us-US', options);
};
