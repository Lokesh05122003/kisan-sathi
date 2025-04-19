
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Droplet, Thermometer, CloudRain, Leaf, FlaskRound, Fan, Gauge } from 'lucide-react';
import SoilParameterCard from './SoilParameterCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Simulated data - in a real app, this would come from your IoT device API
const fetchSensorData = () => {
  // Simulating API call with random values
  return {
    nitrogen: Math.floor(Math.random() * (140 - 60) + 60),       // Range: 60-140 kg/ha
    phosphorus: Math.floor(Math.random() * (80 - 20) + 20),      // Range: 20-80 kg/ha
    potassium: Math.floor(Math.random() * (200 - 80) + 80),      // Range: 80-200 kg/ha
    humidity: Math.floor(Math.random() * (90 - 30) + 30),        // Range: 30-90 %
    moisture: Math.floor(Math.random() * (100 - 10) + 10),       // Range: 10-100 %
    phValue: (Math.random() * (8.5 - 4.5) + 4.5).toFixed(1),     // Range: 4.5-8.5
    rainfall: Math.floor(Math.random() * (200 - 0) + 0),         // Range: 0-200 mm
    timestamp: new Date().toLocaleString()
  };
};

const getStatusForValue = (value: number, type: string) => {
  switch(type) {
    case 'nitrogen':
      return value < 80 ? 'low' : value > 120 ? 'high' : 'optimal';
    case 'phosphorus':
      return value < 40 ? 'low' : value > 70 ? 'high' : 'optimal';
    case 'potassium':
      return value < 100 ? 'low' : value > 180 ? 'high' : 'optimal';
    case 'humidity':
      return value < 50 ? 'low' : value > 80 ? 'high' : 'optimal';
    case 'moisture':
      return value < 30 ? 'low' : value > 70 ? 'high' : 'optimal';
    case 'phValue':
      return parseFloat(value.toString()) < 6.0 ? 'acidic' : parseFloat(value.toString()) > 7.5 ? 'alkaline' : 'neutral';
    case 'rainfall':
      return value < 50 ? 'low' : value > 150 ? 'high' : 'moderate';
    default:
      return 'unknown';
  }
};

const getRecommendationForStatus = (status: string, type: string) => {
  switch(type) {
    case 'nitrogen':
      return status === 'low' ? 'Consider adding nitrogen-rich fertilizers like urea or manure.' 
        : status === 'high' ? 'Reduce nitrogen application and monitor plant growth.' 
        : 'Nitrogen levels are optimal for most crops.';
    case 'phosphorus':
      return status === 'low' ? 'Apply phosphate fertilizers to improve root development.' 
        : status === 'high' ? 'Avoid additional phosphorus application for now.' 
        : 'Phosphorus levels are good for plant growth.';
    case 'potassium':
      return status === 'low' ? 'Add potassium-rich fertilizers like potash to enhance crop quality.' 
        : status === 'high' ? 'Reduce potassium application in future fertilizations.' 
        : 'Potassium levels are ideal for crop development.';
    case 'humidity':
      return status === 'low' ? 'Consider irrigation or mulching to maintain soil moisture.' 
        : status === 'high' ? 'Ensure proper drainage to prevent waterlogging.' 
        : 'Humidity levels are well-balanced for plant growth.';
    case 'moisture':
      return status === 'low' ? 'Immediate irrigation required to prevent crop stress.' 
        : status === 'high' ? 'Hold irrigation until soil dries to prevent root diseases.' 
        : 'Moisture levels are appropriate for healthy growth.';
    case 'phValue':
      return status === 'acidic' ? 'Add agricultural lime to raise soil pH for better nutrient availability.' 
        : status === 'alkaline' ? 'Consider adding sulfur or acidic organic matter to lower pH.' 
        : 'Soil pH is in the ideal range for most crops.';
    case 'rainfall':
      return status === 'low' ? 'Plan for irrigation to compensate for low rainfall.' 
        : status === 'high' ? 'Ensure proper drainage to prevent waterlogging.' 
        : 'Rainfall is adequate for crop needs.';
    default:
      return 'Monitor soil conditions regularly.';
  }
};

const SoilParametersDashboard = () => {
  const [sensorData, setSensorData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const { toast } = useToast();

  const loadSensorData = () => {
    setLoading(true);
    // In a real implementation, you'd call your actual API here
    const data = fetchSensorData();
    setSensorData(data);
    setLoading(false);
  };

  useEffect(() => {
    // Initial data load
    loadSensorData();

    // Set up auto-refresh if enabled
    let interval: NodeJS.Timeout | null = null;
    
    if (autoRefresh) {
      interval = setInterval(() => {
        loadSensorData();
        toast({
          title: "Sensor Data Updated",
          description: `Latest reading: ${new Date().toLocaleTimeString()}`,
          duration: 3000,
        });
      }, 30000); // Refresh every 30 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, toast]);

  const handleRefresh = () => {
    loadSensorData();
    toast({
      title: "Data Refreshed",
      description: "Soil parameter readings have been updated.",
      duration: 3000,
    });
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    toast({
      title: `Auto Refresh ${!autoRefresh ? 'Enabled' : 'Disabled'}`,
      description: !autoRefresh 
        ? "Readings will update automatically every 30 seconds" 
        : "Automatic updates paused. Refresh manually when needed.",
      duration: 3000,
    });
  };

  if (loading && !sensorData) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-kisan-dark-brown">Soil Health Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Live IoT sensor readings from your field
            {sensorData && (
              <span className="ml-2 text-sm text-gray-500">
                Last updated: {sensorData.timestamp}
              </span>
            )}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button 
            onClick={toggleAutoRefresh} 
            className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 ${
              autoRefresh 
                ? 'bg-kisan-secondary text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {autoRefresh ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            {autoRefresh ? 'Auto Refresh On' : 'Auto Refresh Off'}
          </button>
          <button 
            onClick={handleRefresh} 
            className="bg-kisan-primary text-white px-3 py-2 rounded-md text-sm"
          >
            Refresh Now
          </button>
        </div>
      </div>

      <Tabs defaultValue="cards" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="cards">Parameter Cards</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cards">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sensorData && (
              <>
                <SoilParameterCard 
                  title="Nitrogen (N)"
                  value={sensorData.nitrogen}
                  unit="kg/ha"
                  icon={<Leaf className="h-6 w-6 text-green-600" />}
                  status={getStatusForValue(sensorData.nitrogen, 'nitrogen')}
                  recommendation={getRecommendationForStatus(getStatusForValue(sensorData.nitrogen, 'nitrogen'), 'nitrogen')}
                  color="bg-green-50"
                  borderColor="border-green-200"
                  minValue={0}
                  maxValue={200}
                />
                
                <SoilParameterCard 
                  title="Phosphorus (P)"
                  value={sensorData.phosphorus}
                  unit="kg/ha"
                  icon={<Leaf className="h-6 w-6 text-purple-600" />}
                  status={getStatusForValue(sensorData.phosphorus, 'phosphorus')}
                  recommendation={getRecommendationForStatus(getStatusForValue(sensorData.phosphorus, 'phosphorus'), 'phosphorus')}
                  color="bg-purple-50"
                  borderColor="border-purple-200"
                  minValue={0}
                  maxValue={100}
                />
                
                <SoilParameterCard 
                  title="Potassium (K)"
                  value={sensorData.potassium}
                  unit="kg/ha"
                  icon={<Leaf className="h-6 w-6 text-yellow-600" />}
                  status={getStatusForValue(sensorData.potassium, 'potassium')}
                  recommendation={getRecommendationForStatus(getStatusForValue(sensorData.potassium, 'potassium'), 'potassium')}
                  color="bg-yellow-50"
                  borderColor="border-yellow-200"
                  minValue={0}
                  maxValue={250}
                />
                
                <SoilParameterCard 
                  title="pH Value"
                  value={sensorData.phValue}
                  unit="pH"
                  icon={<FlaskRound className="h-6 w-6 text-blue-600" />}
                  status={getStatusForValue(parseFloat(sensorData.phValue), 'phValue')}
                  recommendation={getRecommendationForStatus(getStatusForValue(parseFloat(sensorData.phValue), 'phValue'), 'phValue')}
                  color="bg-blue-50"
                  borderColor="border-blue-200"
                  minValue={4}
                  maxValue={10}
                  isDecimal={true}
                />
                
                <SoilParameterCard 
                  title="Moisture"
                  value={sensorData.moisture}
                  unit="%"
                  icon={<Droplet className="h-6 w-6 text-blue-600" />}
                  status={getStatusForValue(sensorData.moisture, 'moisture')}
                  recommendation={getRecommendationForStatus(getStatusForValue(sensorData.moisture, 'moisture'), 'moisture')}
                  color="bg-blue-50"
                  borderColor="border-blue-200"
                  minValue={0}
                  maxValue={100}
                />
                
                <SoilParameterCard 
                  title="Humidity"
                  value={sensorData.humidity}
                  unit="%"
                  icon={<Fan className="h-6 w-6 text-cyan-600" />}
                  status={getStatusForValue(sensorData.humidity, 'humidity')}
                  recommendation={getRecommendationForStatus(getStatusForValue(sensorData.humidity, 'humidity'), 'humidity')}
                  color="bg-cyan-50"
                  borderColor="border-cyan-200"
                  minValue={0}
                  maxValue={100}
                />
                
                <SoilParameterCard 
                  title="Rainfall"
                  value={sensorData.rainfall}
                  unit="mm"
                  icon={<CloudRain className="h-6 w-6 text-indigo-600" />}
                  status={getStatusForValue(sensorData.rainfall, 'rainfall')}
                  recommendation={getRecommendationForStatus(getStatusForValue(sensorData.rainfall, 'rainfall'), 'rainfall')}
                  color="bg-indigo-50"
                  borderColor="border-indigo-200"
                  minValue={0}
                  maxValue={250}
                />
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="space-y-4">
            {sensorData && (
              <>
                <Alert className="bg-white border">
                  <Gauge className="h-5 w-5" />
                  <AlertTitle>Overall Soil Health</AlertTitle>
                  <AlertDescription>
                    Based on the current readings, your soil is in {' '}
                    {['nitrogen', 'phosphorus', 'potassium', 'moisture', 'humidity'].filter(
                      param => getStatusForValue(sensorData[param], param) === 'optimal'
                    ).length >= 3 ? 'good' : 'moderate'} condition.
                  </AlertDescription>
                </Alert>
                
                {['nitrogen', 'phosphorus', 'potassium', 'phValue', 'moisture', 'humidity', 'rainfall'].map(param => {
                  const status = getStatusForValue(
                    param === 'phValue' ? parseFloat(sensorData[param]) : sensorData[param], 
                    param
                  );
                  if (status !== 'optimal' && status !== 'neutral' && status !== 'moderate') {
                    return (
                      <Alert key={param} className="bg-white border-l-4 border-amber-400">
                        <AlertTitle className="capitalize">{param} Alert</AlertTitle>
                        <AlertDescription>
                          {getRecommendationForStatus(status, param)}
                        </AlertDescription>
                      </Alert>
                    );
                  }
                  return null;
                })}
                
                <Card>
                  <CardHeader>
                    <CardTitle>Crop Compatibility</CardTitle>
                    <CardDescription>Crops that may thrive in these soil conditions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {/* This would ideally come from an AI recommendation based on all parameters */}
                      {sensorData.phValue > 6.0 && sensorData.phValue < 7.5 && (
                        <>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Wheat</Badge>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Rice</Badge>
                        </>
                      )}
                      {sensorData.nitrogen > 80 && (
                        <>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Corn</Badge>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Leafy Vegetables</Badge>
                        </>
                      )}
                      {sensorData.phosphorus > 40 && (
                        <>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Tomatoes</Badge>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Legumes</Badge>
                        </>
                      )}
                      {sensorData.potassium > 100 && (
                        <>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Potatoes</Badge>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Fruits</Badge>
                        </>
                      )}
                      {sensorData.moisture > 30 && sensorData.moisture < 70 && (
                        <>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Onions</Badge>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Carrots</Badge>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SoilParametersDashboard;
