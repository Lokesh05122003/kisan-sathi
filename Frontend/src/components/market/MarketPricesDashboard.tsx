
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart2, Search, 
  Loader2, AlertCircle, 
  RefreshCw, MapPin 
} from 'lucide-react';
import { 
  Card, CardContent, 
  CardHeader, CardTitle, 
  CardDescription, CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';

interface MarketPrice {
  id: string;
  commodity: string;
  variety: string;
  market: string;
  state: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  date: string;
}

const states = [
  { id: "AP", name: "Andhra Pradesh" },
  { id: "UP", name: "Uttar Pradesh" },
  { id: "MP", name: "Madhya Pradesh" },
  { id: "MH", name: "Maharashtra" },
  { id: "PB", name: "Punjab" },
  { id: "HR", name: "Haryana" },
  { id: "GJ", name: "Gujarat" },
  { id: "RJ", name: "Rajasthan" },
  { id: "KA", name: "Karnataka" },
  { id: "TN", name: "Tamil Nadu" },
];

const commodities = [
  "Rice", "Wheat", "Maize", "Jowar", "Bajra", 
  "Tomato", "Potato", "Onion", "Cotton", "Sugarcane",
  "Soybean", "Mustard", "Groundnut", "Chana"
];

const fetchMarketPrices = async (state?: string, commodity?: string): Promise<MarketPrice[]> => {
  // In a real app, this would fetch from an actual API
  // For demonstration, we'll generate mock data
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock data
  return Array.from({ length: 15 }, (_, i) => {
    const selectedState = state ? states.find(s => s.id === state) : states[Math.floor(Math.random() * states.length)];
    const selectedCommodity = commodity || commodities[Math.floor(Math.random() * commodities.length)];
    
    const minPrice = Math.floor(Math.random() * 2000) + 500;
    const maxPrice = minPrice + Math.floor(Math.random() * 1000);
    const modalPrice = Math.floor((minPrice + maxPrice) / 2);
    
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() - Math.floor(Math.random() * 5));
    
    return {
      id: `price-${i}`,
      commodity: selectedCommodity,
      variety: `${selectedCommodity} Grade ${["A", "B", "C"][Math.floor(Math.random() * 3)]}`,
      market: `${["Central", "Regional", "District"][Math.floor(Math.random() * 3)]} Market`,
      state: selectedState?.name || "Unknown",
      district: `District ${Math.floor(Math.random() * 10) + 1}`,
      minPrice,
      maxPrice,
      modalPrice,
      date: date.toISOString().split('T')[0],
    };
  });
};

const MarketPricesDashboard = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCommodity, setSelectedCommodity] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['marketPrices', selectedState, selectedCommodity],
    queryFn: () => fetchMarketPrices(selectedState, selectedCommodity),
  });

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing market prices",
      description: "Fetching the latest market data",
    });
  };

  const filteredData = data?.filter(item => 
    item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIndicator = (min: number, max: number) => {
    const diff = max - min;
    const percentage = (diff / min) * 100;
    
    if (percentage > 15) return "text-red-500"; // High volatility
    if (percentage > 5) return "text-amber-500"; // Medium volatility
    return "text-green-500"; // Stable
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-kisan-dark-brown mb-2">Agricultural Market Prices</h1>
        <p className="text-gray-600">
          Real-time commodity prices from agricultural markets across India
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Price Analysis
            </CardTitle>
            <CardDescription>Today's market overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Active Markets</span>
              <span className="text-2xl font-bold">{data?.length || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Price Trends</span>
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-kisan-primary" />
                <span className="text-sm">Updated hourly</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh Prices
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Top Commodity
            </CardTitle>
            <CardDescription>Highest traded item</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-kisan-primary">
                {data?.[0]?.commodity || "Loading..."}
              </span>
              <div className="flex items-center mt-1">
                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">
                  {data?.[0]?.state || "India"}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-600">Price Range: </span>
                <span className="font-medium">
                  ₹{data?.[0]?.minPrice || 0} - ₹{data?.[0]?.maxPrice || 0}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-gray-500">
              Last updated: {data?.[0]?.date || "Loading data..."}
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Quick Filters</CardTitle>
            <CardDescription>Sort by state or commodity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <Select 
                  value={selectedState} 
                  onValueChange={setSelectedState}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    {states.map(state => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select 
                  value={selectedCommodity} 
                  onValueChange={setSelectedCommodity}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Commodity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Commodities</SelectItem>
                    {commodities.map(commodity => (
                      <SelectItem key={commodity} value={commodity}>
                        {commodity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search markets..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardFooter>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current Market Prices</CardTitle>
          <CardDescription>
            All prices shown in Indian Rupees (₹) per quintal
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-kisan-primary" />
              <span className="ml-3 text-lg">Loading market prices...</span>
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center py-10 text-destructive">
              <AlertCircle className="h-8 w-8 mr-2" />
              <div>
                <p className="font-medium">Failed to load market prices</p>
                <p className="text-sm">Please try again later or contact support</p>
              </div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableCaption>
                  Agricultural commodity prices as of {new Date().toLocaleDateString()}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Commodity</TableHead>
                    <TableHead>Variety</TableHead>
                    <TableHead>Market</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead className="text-right">Min (₹)</TableHead>
                    <TableHead className="text-right">Max (₹)</TableHead>
                    <TableHead className="text-right">Modal (₹)</TableHead>
                    <TableHead className="text-right">Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData.map((price) => (
                      <TableRow key={price.id}>
                        <TableCell className="font-medium">{price.commodity}</TableCell>
                        <TableCell>{price.variety}</TableCell>
                        <TableCell>{price.market}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{price.state}</span>
                            <span className="text-xs text-gray-500">{price.district}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">₹{price.minPrice}</TableCell>
                        <TableCell className="text-right">₹{price.maxPrice}</TableCell>
                        <TableCell className={`text-right font-bold ${getTrendIndicator(price.minPrice, price.maxPrice)}`}>
                          ₹{price.modalPrice}
                        </TableCell>
                        <TableCell className="text-right text-sm">{price.date}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6">
                        No market data found for the selected filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Source: Agricultural Produce Market Committee (APMC) data
          </p>
        </CardFooter>
      </Card>

      <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
        <p className="mb-2">
          <strong>Note:</strong> The market price data shown here is for demonstration purposes only.
          In a production environment, this would be connected to government APIs such as:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>AGMARKNET Portal (agmarknet.gov.in)</li>
          <li>National Agriculture Market (eNAM)</li>
          <li>State Agricultural Marketing Boards</li>
        </ul>
        <p className="mt-2">
          For accurate and official price information, please refer to the official government portals.
        </p>
      </div>
    </div>
  );
};

export default MarketPricesDashboard;
