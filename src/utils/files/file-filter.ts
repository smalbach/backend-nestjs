import * as path from 'path';

const translateFileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext === '.exe') {
    req.fileValidationError = 'Invalid file type';
    return callback(new Error('Invalid file type'), false);
  }
  return callback(null, true);
};

export default translateFileFilter;
