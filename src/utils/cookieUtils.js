// Utility function to generate a unique string
export const generateUniqueString = () => {
    const randomString = Math.random().toString(36).substr(2, 9); // Random string
    const timestamp = new Date().toISOString(); // Current datetime
    return `${randomString}_${timestamp}`;
  };
  
  // Function to get device name or type
  export const getDeviceName = () => {
    const userAgent = navigator.userAgent;
    if (/Mobi|Android/i.test(userAgent)) {
      return 'Mobile';
    } else if (/iPad|Tablet/i.test(userAgent)) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  };
  
  // Save data to cookies
  export const saveToCookies = () => {
    const cookieName = 'unique_device_data';
  
    // Check if the cookie already exists
    const existingCookie = document.cookie.split('; ').find(row => row.startsWith(cookieName));
  
    if (existingCookie) {
      // If the cookie exists, return without updating
      console.log('Cookie already exists, cannot update.');
      return;
    }
  
    // If no cookie, generate a unique string and save it
    const uniqueString = generateUniqueString();
    const deviceName = getDeviceName();
    const data = {
      uniqueString,
      datetime: new Date().toISOString(),
      deviceName
    };
  
    // Save data to cookie with 1-year expiry
    document.cookie = `${cookieName}=${JSON.stringify(data)}; path=/; max-age=${60 * 60 * 24 * 365}`;
    console.log('Cookie saved:', data);
  };
  
  // Get data from cookies
  export const getFromCookies = () => {
    const cookieName = 'unique_device_data';
    const existingCookie = document.cookie.split('; ').find(row => row.startsWith(cookieName));
  
    if (existingCookie) {
      const cookieData = existingCookie.split('=')[1];
      return JSON.parse(cookieData);
    }
  
    return null;
  };
  
  // Function to check if data is already saved and handle scenarios
  export const checkAndSave = () => {
    const existingData = getFromCookies();
  
    if (existingData) {
      // If data exists, print the saved data (can't update it)
      console.log('Saved data found:', existingData);
    } else {
      // If no data, save new data
      console.log('No saved data found. Saving new data...');
      saveToCookies();
    }
  };