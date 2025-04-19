
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, ChevronRight, Calendar, Droplets, Thermometer, CloudRain, Bug, Sprout } from 'lucide-react';

// Mock crop data
const cropsData = [
  {
    id: 1,
    name: "Rice (Paddy)",
    image: "https://images.unsplash.com/photo-1568742645561-9d21ec44a154?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Cereals",
    description: "Rice is one of the most important food crops of India in terms of area, production and consumer preference.",
    soil: "Clay or clay loam soils with good water retention capacity",
    climate: "Hot and humid climate with temperature ranging from 20°C to 40°C",
    season: "Kharif (June-July to October-November)",
    waterNeeds: "High water requirement, requires standing water in fields",
    fertilizerNeeds: "Nitrogen, Phosphorus, Potassium, Zinc",
    diseases: [
      "Blast", "Brown Spot", "Bacterial Leaf Blight", "Sheath Blight"
    ],
    pests: [
      "Stem Borer", "Brown Plant Hopper", "Leaf Folder", "Gall Midge"
    ],
    harvesting: "110-150 days after sowing, when the grains turn yellow",
    yield: "3-6 tonnes per hectare depending on variety and conditions"
  },
  {
    id: 2,
    name: "Wheat",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1c0cf4b1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Cereals",
    description: "Wheat is the second most important cereal crop in India after rice. It's a staple food for a large portion of India's population.",
    soil: "Well-drained loam or clay loam soils with good water retention",
    climate: "Cool climate with temperature between 10°C to 25°C during growing season",
    season: "Rabi (October-November to March-April)",
    waterNeeds: "Moderate water requirement, 4-6 irrigations throughout the growing season",
    fertilizerNeeds: "Nitrogen, Phosphorus, Potassium, Sulphur",
    diseases: [
      "Rust (Yellow, Brown, Black)", "Powdery Mildew", "Loose Smut", "Karnal Bunt"
    ],
    pests: [
      "Aphids", "Termites", "Pink Stem Borer", "Army Worm"
    ],
    harvesting: "110-145 days after sowing, when the crop turns golden yellow",
    yield: "3-5 tonnes per hectare depending on variety and conditions"
  },
  {
    id: 3,
    name: "Cotton",
    image: "https://images.unsplash.com/photo-1594179047519-f347310d3322?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Fiber Crops",
    description: "Cotton is a major fiber crop of India and plays a vital role in the country's economy.",
    soil: "Deep, well-drained black cotton soils (regur) or alluvial soils",
    climate: "Warm climate with temperature between 21°C to 30°C",
    season: "Kharif (May-June to November-December)",
    waterNeeds: "Moderate water requirement, sensitive to both drought and waterlogging",
    fertilizerNeeds: "Nitrogen, Phosphorus, Potassium, Boron, Zinc",
    diseases: [
      "Bacterial Blight", "Alternaria Leaf Spot", "Root Rot", "Wilt"
    ],
    pests: [
      "Bollworm", "Whitefly", "Pink Bollworm", "Aphids", "Jassids"
    ],
    harvesting: "150-180 days after sowing, when the bolls open fully",
    yield: "15-25 quintals of seed cotton per hectare"
  },
  {
    id: 4,
    name: "Sugarcane",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Cash Crops",
    description: "Sugarcane is an important cash crop of India and is the main source of sugar, jaggery, and molasses.",
    soil: "Deep, well-drained loamy soils rich in organic matter",
    climate: "Tropical and subtropical climate with temperature between 21°C to a35°C",
    season: "Can be planted in different seasons: Spring (Feb-Mar), Autumn (Sep-Oct), or Adsali (Jul-Aug)",
    waterNeeds: "High water requirement, needs frequent irrigation",
    fertilizerNeeds: "Nitrogen, Phosphorus, Potassium, Sulphur, Zinc",
    diseases: [
      "Red Rot", "Smut", "Wilt", "Grassy Shoot Disease"
    ],
    pests: [
      "Early Shoot Borer", "Top Borer", "Pyrilla", "White Grub"
    ],
    harvesting: "10-12 months after planting, when the canes are fully mature",
    yield: "80-100 tonnes per hectare depending on variety and conditions"
  },
  {
    id: 5,
    name: "Potato",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Vegetables",
    description: "Potato is one of the most important vegetable crops in India and is used in various culinary preparations.",
    soil: "Well-drained, loose sandy loam or loam soils rich in organic matter",
    climate: "Cool climate with temperature between 15°C to 25°C",
    season: "Rabi (October-November to February-March) in plains; Summer (January-February to April-May) in hills",
    waterNeeds: "Moderate water requirement, needs consistent moisture",
    fertilizerNeeds: "Nitrogen, Phosphorus, Potassium, Magnesium",
    diseases: [
      "Late Blight", "Early Blight", "Black Scurf", "Bacterial Wilt"
    ],
    pests: [
      "Potato Tuber Moth", "Cutworm", "Aphids", "White Grub"
    ],
    harvesting: "80-120 days after planting, when the plants turn yellow and start drying",
    yield: "20-30 tonnes per hectare depending on variety and conditions"
  },
  {
    id: 6,
    name: "Tomato",
    image: "https://images.unsplash.com/photo-1592924357228-9594160e0139?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Vegetables",
    description: "Tomato is one of the most popular vegetables in India, used extensively in various cuisines.",
    soil: "Well-drained, deep loamy soil rich in organic matter with pH 6.0-7.0",
    climate: "Warm and dry climate with temperature between 20°C to 27°C",
    season: "Can be grown year-round depending on region; mainly Rabi in plains",
    waterNeeds: "Moderate water requirement, needs regular irrigation",
    fertilizerNeeds: "Nitrogen, Phosphorus, Potassium, Calcium, Magnesium",
    diseases: [
      "Early Blight", "Late Blight", "Fusarium Wilt", "Leaf Curl Virus"
    ],
    pests: [
      "Fruit Borer", "Whitefly", "Leaf Miner", "Aphids"
    ],
    harvesting: "70-90 days after transplanting, when fruits are firm and fully colored",
    yield: "20-25 tonnes per hectare under open field conditions"
  }
];

// Categories for filtering
const categories = ["All", "Cereals", "Pulses", "Oilseeds", "Fiber Crops", "Cash Crops", "Vegetables", "Fruits"];

const CropKnowledgeHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCrop, setSelectedCrop] = useState<typeof cropsData[0] | null>(null);

  // Filter crops based on search term and category
  const filteredCrops = cropsData.filter((crop) => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCropSelect = (crop: typeof cropsData[0]) => {
    setSelectedCrop(crop);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-poppins font-bold text-kisan-primary mb-2">
          Crop Knowledge Hub
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore detailed information about various crops, including growing conditions, disease management, and best practices.
        </p>
      </div>

      {/* Crop Detail View */}
      {selectedCrop && (
        <Card className="mb-8 border-kisan-primary">
          <CardHeader className="relative pb-0">
            <Button 
              variant="ghost" 
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setSelectedCrop(null)}
            >
              Back to List
            </Button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img 
                  src={selectedCrop.image} 
                  alt={selectedCrop.name} 
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <CardTitle className="text-2xl text-kisan-primary">{selectedCrop.name}</CardTitle>
                <div className="mb-2 mt-1">
                  <span className="inline-block bg-kisan-light/20 text-kisan-primary px-3 py-1 rounded-full text-sm">
                    {selectedCrop.category}
                  </span>
                </div>
                <CardDescription className="text-base">{selectedCrop.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="growing">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
                <TabsTrigger value="growing">Growing Conditions</TabsTrigger>
                <TabsTrigger value="care">Crop Care</TabsTrigger>
                <TabsTrigger value="pests">Pests & Diseases</TabsTrigger>
                <TabsTrigger value="harvest">Harvesting</TabsTrigger>
              </TabsList>
              <TabsContent value="growing" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Sprout className="h-5 w-5 mr-3 text-kisan-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Soil Requirements</h3>
                      <p className="text-gray-700">{selectedCrop.soil}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Thermometer className="h-5 w-5 mr-3 text-kisan-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Climate</h3>
                      <p className="text-gray-700">{selectedCrop.climate}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-kisan-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Growing Season</h3>
                      <p className="text-gray-700">{selectedCrop.season}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Droplets className="h-5 w-5 mr-3 text-kisan-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Water Requirements</h3>
                      <p className="text-gray-700">{selectedCrop.waterNeeds}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="care" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-kisan-primary">Fertilizer Requirements</h3>
                  <p className="text-gray-700 mb-4">{selectedCrop.fertilizerNeeds}</p>
                  
                  <h3 className="font-semibold mb-2 text-kisan-primary">Recommended Practices</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Ensure proper spacing between plants for adequate air circulation and growth.</li>
                    <li>Apply organic mulch to conserve soil moisture and suppress weeds.</li>
                    <li>Practice crop rotation to prevent buildup of soil-borne diseases.</li>
                    <li>Monitor soil moisture regularly and irrigate as needed.</li>
                    <li>Conduct soil testing annually to adjust fertilizer applications based on actual needs.</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="pests" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center text-kisan-primary">
                      <Bug className="h-5 w-5 mr-2" /> Common Pests
                    </h3>
                    <ul className="space-y-2">
                      {selectedCrop.pests.map((pest, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-kisan-primary mr-2">•</span>
                          <span className="text-gray-700">{pest}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center text-kisan-primary">
                      <CloudRain className="h-5 w-5 mr-2" /> Common Diseases
                    </h3>
                    <ul className="space-y-2">
                      {selectedCrop.diseases.map((disease, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-kisan-primary mr-2">•</span>
                          <span className="text-gray-700">{disease}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="font-semibold mb-2 text-kisan-primary">Integrated Pest Management (IPM)</h3>
                  <p className="text-gray-700 mb-2">
                    Use a combination of cultural, biological, and chemical control methods for sustainable pest management:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Regularly monitor crops for early detection of pests and diseases.</li>
                    <li>Use disease-resistant varieties when available.</li>
                    <li>Apply biopesticides and natural predators as first line of defense.</li>
                    <li>Use chemical pesticides only when necessary and in appropriate quantities.</li>
                    <li>Follow proper crop rotation to break pest and disease cycles.</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="harvest" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-kisan-primary">Harvesting Time</h3>
                    <p className="text-gray-700 mb-4">{selectedCrop.harvesting}</p>
                    
                    <h3 className="font-semibold mb-2 text-kisan-primary">Expected Yield</h3>
                    <p className="text-gray-700">{selectedCrop.yield}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-kisan-primary">Harvesting Best Practices</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Harvest during the coolest part of the day to maintain crop quality.</li>
                      <li>Use appropriate harvesting tools and equipment to minimize damage.</li>
                      <li>Sort and grade produce immediately after harvesting.</li>
                      <li>Ensure proper storage conditions to maintain freshness and prevent spoilage.</li>
                      <li>Follow post-harvest handling practices to reduce losses and maintain quality.</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="text-sm text-gray-500">
              *Information provided is generalized. Adjust practices based on local conditions and specific varieties.
            </div>
            <Button 
              variant="outline" 
              className="text-kisan-primary border-kisan-primary hover:bg-kisan-primary/10"
              onClick={() => setSelectedCrop(null)}
            >
              Back to Crop List
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Find Crop Information</CardTitle>
          <CardDescription>
            Search by crop name or filter by category to find detailed growing guides
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-kisan-primary" : ""}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crop List */}
      {!selectedCrop && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <Card key={crop.id} className="hover:border-kisan-primary transition-all duration-200">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={crop.image} 
                    alt={crop.name} 
                    className="object-cover w-full h-48 rounded-t-lg"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{crop.name}</CardTitle>
                    <span className="inline-block bg-kisan-light/20 text-kisan-primary px-2 py-1 rounded-full text-xs">
                      {crop.category}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {crop.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-kisan-primary" />
                      <span className="truncate">{crop.season}</span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 mr-2 text-kisan-primary" />
                      <span className="truncate">Temp: 20-35°C</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-kisan-primary hover:bg-kisan-secondary flex items-center justify-between"
                    onClick={() => handleCropSelect(crop)}
                  >
                    <span>View Details</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <Sprout className="h-16 w-16 text-kisan-primary/30 mx-auto mb-4" />
              <h3 className="text-xl font-poppins font-semibold mb-2">No Crops Found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria to find the crops you're looking for.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CropKnowledgeHub;
