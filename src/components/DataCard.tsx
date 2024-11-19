import React, { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';


interface DataCardProps {
  icon?: React.ComponentType<{ className?: string }>;
  name: string;
  value: string | number;
  source: string;
}

const DataCard: FC<DataCardProps> = ({ icon: Icon, name, value, source }) => {
  return (
    <Card className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-2 ">
          {Icon && <Icon className="h-5 w-5" />}
          <CardTitle className="text-sm font-medium text-gray-700">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900 mb-1">{value}</span>
          {/* <div className="h-5 w-5 text-gray-500">i</div> */}
        </div>
        <div className="text-sm text-gray-500">{source}</div>
      </CardContent>
    </Card>
  );
};

export default DataCard;