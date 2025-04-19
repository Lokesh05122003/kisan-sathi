
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, AlertCircle, Leaf, FileQuestion } from 'lucide-react';

const DiseasePrediction = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ disease: string; confidence: number; treatment: string } | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Reset previous results
    setResult(null);
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }
    
    // Create a URL for the image
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a timeout
    setTimeout(() => {
      // Mock result - in a real app, this would come from an AI model
      setResult({
        disease: "Leaf Blight",
        confidence: 92.5,
        treatment: "Apply copper-based fungicide at 7-day intervals. Ensure proper spacing between plants to improve air circulation. Remove and destroy infected leaves. Avoid overhead irrigation."
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-poppins font-bold text-kisan-primary mb-2">
            AI Crop Disease Prediction
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Upload an image of your plant to identify diseases and get treatment recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Plant Image</CardTitle>
              <CardDescription>
                Take a clear photo of the affected plant part (leaves, stem, fruit)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!image ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center ${
                    isDragging ? 'border-kisan-primary bg-kisan-primary/5' : 'border-gray-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium mb-2">Drag and drop an image here</p>
                    <p className="text-gray-500 mb-4">or click to browse files</p>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                    <Button 
                      onClick={() => document.getElementById('fileInput')?.click()}
                      className="bg-kisan-primary hover:bg-kisan-secondary"
                    >
                      Select Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={image} 
                    alt="Uploaded plant" 
                    className="w-full h-auto rounded-lg" 
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 bg-white"
                    onClick={resetAnalysis}
                  >
                    Change Image
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                <AlertCircle className="h-4 w-4 inline mr-1" />
                For best results, ensure good lighting and focus
              </p>
              <Button 
                className="bg-kisan-primary hover:bg-kisan-secondary"
                onClick={analyzeImage}
                disabled={!image || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
              </Button>
            </CardFooter>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>Disease Analysis Results</CardTitle>
              <CardDescription>
                AI-powered diagnosis and treatment recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kisan-primary mb-4"></div>
                  <p className="text-lg font-medium">Analyzing your plant...</p>
                  <p className="text-gray-500">This may take a few moments</p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-kisan-primary/10 p-2 rounded-full mr-4">
                      <Leaf className="h-6 w-6 text-kisan-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Detected Disease</h3>
                      <p className="text-gray-700">{result.disease}</p>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Confidence:</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-kisan-primary rounded-full" 
                            style={{ width: `${result.confidence}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{result.confidence}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-kisan-primary/5 rounded-lg p-4 border border-kisan-primary/20">
                    <h4 className="font-semibold mb-2 text-kisan-primary">Treatment Recommendations</h4>
                    <p className="text-gray-700">{result.treatment}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <FileQuestion className="h-5 w-5 mr-2 text-kisan-blue" />
                      Additional Information
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>This disease affects approximately 15% of crops annually</li>
                      <li>Early detection can prevent up to 90% of crop loss</li>
                      <li>Consider resistant varieties for future planting</li>
                      <li>Monitor other plants in the vicinity for similar symptoms</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <ImageIcon className="h-16 w-16 mb-4" />
                  <p className="text-lg font-medium">No Image Analyzed Yet</p>
                  <p className="text-center mt-2">
                    Upload an image and click "Analyze Image" to get disease detection results
                  </p>
                </div>
              )}
            </CardContent>
            {result && (
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full border-kisan-primary text-kisan-primary hover:bg-kisan-primary/10"
                >
                  View Detailed Report
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        {/* How It Works Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How Our AI Disease Detection Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-kisan-primary/10 rounded-full p-4 mb-4">
                  <Upload className="h-8 w-8 text-kisan-primary" />
                </div>
                <h3 className="font-poppins font-semibold mb-2">1. Upload Image</h3>
                <p className="text-gray-600">
                  Take a clear photo of the affected plant part and upload it to our system.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-kisan-primary/10 rounded-full p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-kisan-primary">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="m7 15 2 2 8-8"/>
                  </svg>
                </div>
                <h3 className="font-poppins font-semibold mb-2">2. AI Analysis</h3>
                <p className="text-gray-600">
                  Our deep learning model analyzes the image to identify disease patterns.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-kisan-primary/10 rounded-full p-4 mb-4">
                  <Leaf className="h-8 w-8 text-kisan-primary" />
                </div>
                <h3 className="font-poppins font-semibold mb-2">3. Get Results</h3>
                <p className="text-gray-600">
                  Receive disease identification and tailored treatment recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for Accurate Disease Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="text-kisan-primary mr-2 font-bold">•</span>
                <span>Take photos in natural daylight for best results.</span>
              </li>
              <li className="flex items-start">
                <span className="text-kisan-primary mr-2 font-bold">•</span>
                <span>Focus on the affected area, ensuring it's clearly visible.</span>
              </li>
              <li className="flex items-start">
                <span className="text-kisan-primary mr-2 font-bold">•</span>
                <span>Include both healthy and diseased portions for comparison.</span>
              </li>
              <li className="flex items-start">
                <span className="text-kisan-primary mr-2 font-bold">•</span>
                <span>Take multiple photos from different angles if needed.</span>
              </li>
              <li className="flex items-start">
                <span className="text-kisan-primary mr-2 font-bold">•</span>
                <span>Remove any debris or water droplets from the plant before photographing.</span>
              </li>
              <li className="flex items-start">
                <span className="text-kisan-primary mr-2 font-bold">•</span>
                <span>Ensure your camera lens is clean and free from smudges.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DiseasePrediction;
