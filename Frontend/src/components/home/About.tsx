
import React from 'react';
import { 
  Leaf, 
  CloudRain, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Clock, 
  CheckCircle 
} from 'lucide-react';

const About = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-poppins font-bold text-kisan-primary mb-4">
            Why Choose Kisan-Sathi?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our platform combines the power of artificial intelligence with agricultural expertise to provide comprehensive farming solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="kisan-card hover:border-kisan-primary p-6">
            <div className="flex items-center mb-4">
              <div className="bg-kisan-primary/10 p-2 rounded-full mr-4">
                <Leaf className="h-6 w-6 text-kisan-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold">AI-Powered Analysis</h3>
            </div>
            <p className="text-gray-600">
              Our advanced AI algorithms can detect crop diseases, predict optimal planting times, and provide personalized recommendations based on your unique farming conditions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="kisan-card hover:border-kisan-primary p-6">
            <div className="flex items-center mb-4">
              <div className="bg-kisan-primary/10 p-2 rounded-full mr-4">
                <CloudRain className="h-6 w-6 text-kisan-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold">Weather Intelligence</h3>
            </div>
            <p className="text-gray-600">
              Get actionable farming insights based on precise weather forecasts. Know exactly when to irrigate, apply fertilizers, or harvest your crops for optimal results.
            </p>
          </div>

          {/* Card 3 */}
          <div className="kisan-card hover:border-kisan-primary p-6">
            <div className="flex items-center mb-4">
              <div className="bg-kisan-primary/10 p-2 rounded-full mr-4">
                <Zap className="h-6 w-6 text-kisan-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold">Real-time Updates</h3>
            </div>
            <p className="text-gray-600">
              Stay informed with the latest market prices, government schemes, and agricultural news that directly impact your farming business and decisions.
            </p>
          </div>

          {/* Card 4 */}
          <div className="kisan-card hover:border-kisan-primary p-6">
            <div className="flex items-center mb-4">
              <div className="bg-kisan-primary/10 p-2 rounded-full mr-4">
                <ShieldCheck className="h-6 w-6 text-kisan-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold">Expert Knowledge</h3>
            </div>
            <p className="text-gray-600">
              Access a comprehensive knowledge base developed by agricultural experts, covering best practices for various crops, pest management, and sustainable farming techniques.
            </p>
          </div>

          {/* Card 5 */}
          <div className="kisan-card hover:border-kisan-primary p-6">
            <div className="flex items-center mb-4">
              <div className="bg-kisan-primary/10 p-2 rounded-full mr-4">
                <Smartphone className="h-6 w-6 text-kisan-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold">Mobile Accessibility</h3>
            </div>
            <p className="text-gray-600">
              Use Kisan-Sathi on any device, anywhere. Our responsive design ensures you can access critical farming information whether you're in the field or at home.
            </p>
          </div>

          {/* Card 6 */}
          <div className="kisan-card hover:border-kisan-primary p-6">
            <div className="flex items-center mb-4">
              <div className="bg-kisan-primary/10 p-2 rounded-full mr-4">
                <Clock className="h-6 w-6 text-kisan-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold">Time-Saving Tools</h3>
            </div>
            <p className="text-gray-600">
              Our chatbot and automated systems provide instant answers to your farming questions, saving you valuable time that can be better spent on your fields.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 bg-kisan-primary/5 rounded-xl p-8">
          <div className="text-center">
            <p className="text-4xl font-poppins font-bold text-kisan-primary mb-2">10,000+</p>
            <p className="text-gray-600">Farmers Using Kisan-Sathi</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-poppins font-bold text-kisan-primary mb-2">95%</p>
            <p className="text-gray-600">Disease Detection Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-poppins font-bold text-kisan-primary mb-2">30+</p>
            <p className="text-gray-600">Crop Varieties Supported</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-poppins font-semibold text-kisan-primary">
              Trusted by Farming Communities Across India
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <div className="flex items-center bg-gray-100 rounded-full px-6 py-2">
              <CheckCircle className="h-5 w-5 text-kisan-primary mr-2" />
              <span className="text-gray-700">Ministry of Agriculture</span>
            </div>
            <div className="flex items-center bg-gray-100 rounded-full px-6 py-2">
              <CheckCircle className="h-5 w-5 text-kisan-primary mr-2" />
              <span className="text-gray-700">ICAR</span>
            </div>
            <div className="flex items-center bg-gray-100 rounded-full px-6 py-2">
              <CheckCircle className="h-5 w-5 text-kisan-primary mr-2" />
              <span className="text-gray-700">Agricultural Universities</span>
            </div>
            <div className="flex items-center bg-gray-100 rounded-full px-6 py-2">
              <CheckCircle className="h-5 w-5 text-kisan-primary mr-2" />
              <span className="text-gray-700">Farmer Producer Organizations</span>
            </div>
            <div className="flex items-center bg-gray-100 rounded-full px-6 py-2">
              <CheckCircle className="h-5 w-5 text-kisan-primary mr-2" />
              <span className="text-gray-700">Krishi Vigyan Kendras</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
