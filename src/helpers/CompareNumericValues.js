const CompareNumericValues = (a, b) => {
  // Helper function to convert formatted numbers to numeric values
  const convertToNumber = (value) => {
    const cleanedString = value
      .replace(/[^0-9.,-]+/g, "")
      .replace(/\./g, "")
      .replace(/,/g, ".");
    return parseFloat(cleanedString);
  };

  const aValue = convertToNumber(a);
  const bValue = convertToNumber(b);

  if (aValue < bValue) {
    return -1;
  }
  if (aValue > bValue) {
    return 1;
  }
  return 0;
};

export default CompareNumericValues;
