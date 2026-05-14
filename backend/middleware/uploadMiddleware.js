import multer from 'multer';

// Use memory storage to pass the file directly to your controller
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;