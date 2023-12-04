
async function fetchData1(response) { // הוסף את ה- response כפרמטר
    try {
      console.log("before");
      const documents = await Picture.find();
      console.log("after");
      console.log(documents);
      response.setHeader('Content-Type', 'application/json'); // הגדר סוג תוכן כ JSON
      response.json(documents);    // שלח את המענה כ JSON
    } catch (error) {
      console.error("Error fetching documents:", error);
      response.status(500).send('Internal Server Error'); // טפל בשגיאה באופן תקין
    }
  }

  
const fetchPictures = async () => {
    try {
      const response = await fetch('/api/pictures');
      console.log("response = " + response.ok);
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log("data = ", data);
          // Handle the data here
          setPictures(data);
        } else {
          throw new Error('Invalid content type, expected JSON');
        }
      } else {
        throw new Error('Error fetching pictures');
      }
    } catch (error) {
      console.error('Error fetching pictures:', error);
    }
  };

