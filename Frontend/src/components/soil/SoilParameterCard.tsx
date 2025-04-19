
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface SoilParameterCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  status: string;
  recommendation: string;
  color: string;
  borderColor: string;
  minValue: number;
  maxValue: number;
  isDecimal?: boolean;
}

const SoilParameterCard: React.FC<SoilParameterCardProps> = ({
  title,
  value,
  unit,
  icon,
  status,
  recommendation,
  color,
  borderColor,
  minValue,
  maxValue,
  isDecimal = false
}) => {
  const numericValue = isDecimal ? parseFloat(value.toString()) : Number(value);
  const percentage = ((numericValue - minValue) / (maxValue - minValue)) * 100;
  
  const getStatusColor = () => {
    switch(status) {
      case 'low':
      case 'acidic':
        return 'bg-amber-100 text-amber-800';
      case 'high':
      case 'alkaline':
        return 'bg-rose-100 text-rose-800';
      case 'optimal':
      case 'neutral':
      case 'moderate':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={`border ${borderColor} hover:shadow-md transition-shadow ${color}`}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-medium text-gray-800">{title}</h3>
          </div>
          <Badge className={getStatusColor()}>{status}</Badge>
        </div>
        
        <div className="mt-4 mb-2">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-3xl font-bold text-gray-800">
              {isDecimal ? numericValue.toFixed(1) : numericValue}
            </span>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{minValue}</span>
            <span>{maxValue}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center text-sm text-gray-700 cursor-help">
              <Info className="h-4 w-4 mr-1 text-gray-400" />
              <span>Recommendation</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{recommendation}</p>
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default SoilParameterCard;
