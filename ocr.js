import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (imageBuffer) => {
  try {
    console.log('🔍 Starting OCR with Tesseract.js...');
    
    // Convert buffer to base64 or blob for Tesseract
    const base64Image = imageBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64Image}`;
    
    // Use Tesseract.js to recognize text
    const result = await Tesseract.recognize(
      dataUrl,
      'eng', // English language
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      }
    );
    
    const extractedText = result.data.text.trim();
    console.log('✅ OCR completed successfully');
    console.log('📝 Extracted text:', extractedText);
    
    return extractedText || 'No text detected';
    
  } catch (error) {
    console.error('❌ OCR Error:', error);
    throw new Error('Failed to extract text from image');
  }
};

export const extractTextFromImageUrl = async (imageUrl) => {
  try {
    console.log('🔍 Starting OCR from URL with Tesseract.js...');
    
    // Use Tesseract.js to recognize text from URL
    const result = await Tesseract.recognize(
      imageUrl,
      'eng', // English language
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      }
    );
    
    const extractedText = result.data.text.trim();
    console.log('✅ OCR completed successfully');
    console.log('📝 Extracted text:', extractedText);
    
    return extractedText || 'No text detected';
    
  } catch (error) {
    console.error('❌ OCR Error from URL:', error);
    throw new Error('Failed to extract text from image URL');
  }
};

// Advanced OCR with custom options
export const extractTextFromImageAdvanced = async (imageBuffer, options = {}) => {
  try {
    console.log('🔍 Starting advanced OCR with Tesseract.js...');
    
    const base64Image = imageBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64Image}`;
    
    const defaultOptions = {
      lang: 'eng',
      oem: 1, // OCR Engine Mode: 1 = Neural nets LSTM engine
      psm: 6, // Page segmentation mode: 6 = Assume a uniform block of text
      ...options
    };
    
    const result = await Tesseract.recognize(
      dataUrl,
      defaultOptions.lang,
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        },
        ...defaultOptions
      }
    );
    
    const extractedText = result.data.text.trim();
    console.log('✅ Advanced OCR completed successfully');
    console.log('📝 Extracted text:', extractedText);
    
    return extractedText || 'No text detected';
    
  } catch (error) {
    console.error('❌ Advanced OCR Error:', error);
    throw new Error('Failed to extract text from image');
  }
};

export default {
  extractTextFromImage,
  extractTextFromImageUrl,
  extractTextFromImageAdvanced
};