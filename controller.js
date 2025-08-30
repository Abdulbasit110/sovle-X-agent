import { extractTextFromImage } from './ocr.js';
import { solveMathProblem } from './agent.js';

export const solveMathProblemFromImage = async (req, res) => {
  try {
    // Check if image file exists
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No image file provided' 
      });
    }

    console.log('Processing image:', req.file.originalname);

    // Extract text from image using OCR
    const extractedText = await extractTextFromImage(req.file.buffer);
    
    if (!extractedText || extractedText === 'No text detected') {
      return res.status(400).json({ 
        error: 'Could not extract text from image. Please ensure the image contains clear, readable text.' 
      });
    }

    console.log('Extracted text:', extractedText);

    // Solve the math problem using the agent
    const solution = await solveMathProblem(extractedText);

    // Return the complete solution
    res.json({
      success: true,
      originalImage: req.file.originalname,
      extractedText: extractedText,
      solution: solution
    });

  } catch (error) {
    console.error('Error in solveMathProblemFromImage:', error);
    res.status(500).json({ 
      error: 'Failed to process math problem',
      details: error.message 
    });
  }
};

export const healthCheck = (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Math Solver API is running',
    timestamp: new Date().toISOString()
  });
};
