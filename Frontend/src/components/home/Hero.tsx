
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Sun, Cloud, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-kisan-light/10 to-kisan-primary/10 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-kisan-primary mb-4">
              Smart Farming with{" "}
              <span className="text-kisan-dark-brown">AI Assistance</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Kisan-Sathi empowers farmers with AI-driven insights for sustainable agriculture.
              Make data-informed decisions for better crop yields and farming practices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button asChild size="lg" className="bg-kisan-primary hover:bg-kisan-secondary">
                <Link to="/disease-prediction">
                  Analyze Your Crop <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-kisan-primary text-kisan-primary hover:bg-kisan-primary/10">
                <Link to="/knowledge-hub">
                  Explore Knowledge Hub
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-6 -left-6 bg-kisan-light/20 w-full h-full rounded-lg"></div>
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Farmer using technology in field"
                className="rounded-lg shadow-xl relative z-10 object-cover h-96 w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Quicklinks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="kisan-card hover:border-kisan-primary flex flex-col items-center p-6">
            <div className="bg-kisan-primary/10 p-3 rounded-full mb-4">
              <Leaf className="h-8 w-8 text-kisan-primary" />
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-2">Disease Detection</h3>
            <p className="text-gray-600 text-center mb-4">Identify crop diseases early using AI-powered image analysis</p>
            <Button asChild variant="link" className="text-kisan-primary mt-auto">
              <Link to="/disease-prediction">Learn More</Link>
            </Button>
          </div>
          
          <div className="kisan-card hover:border-kisan-primary flex flex-col items-center p-6">
            <div className="bg-kisan-primary/10 p-3 rounded-full mb-4">
              <Cloud className="h-8 w-8 text-kisan-primary" />
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-2">Weather Forecast</h3>
            <p className="text-gray-600 text-center mb-4">Get 5-day weather predictions tailored for your farming needs</p>
            <Button asChild variant="link" className="text-kisan-primary mt-auto">
              <Link to="/weather">Learn More</Link>
            </Button>
          </div>
          
          <div className="kisan-card hover:border-kisan-primary flex flex-col items-center p-6">
            <div className="bg-kisan-primary/10 p-3 rounded-full mb-4">
              <Sun className="h-8 w-8 text-kisan-primary" />
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-2">Crop Advisory</h3>
            <p className="text-gray-600 text-center mb-4">Expert recommendations for crop selection and care</p>
            <Button asChild variant="link" className="text-kisan-primary mt-auto">
              <Link to="/knowledge-hub">Learn More</Link>
            </Button>
          </div>
          
          <div className="kisan-card hover:border-kisan-primary flex flex-col items-center p-6">
            <div className="bg-kisan-primary/10 p-3 rounded-full mb-4">
              <BarChart2 className="h-8 w-8 text-kisan-primary" />
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-2">Market Prices</h3>
            <p className="text-gray-600 text-center mb-4">Stay updated with real-time agricultural commodity prices</p>
            <Button asChild variant="link" className="text-kisan-primary mt-auto">
              <Link to="/market-prices">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
