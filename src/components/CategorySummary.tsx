import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CategorySummaryProps {
  top3: Array<{name: string, value: number}>;
  bottom3: Array<{name: string, value: number}>;
  totalValue: number;
}

// Utility function to calculate contribution percentage
function calculateContribution(items: Array<{value: number}>, totalValue: number): number {
  const sumOfItems = items.reduce((sum, item) => sum + item.value, 0);
  return (sumOfItems / totalValue) * 100;
}

const CategorySummary: React.FC<CategorySummaryProps> = ({
  top3,
  bottom3,
  totalValue
}) => {
  const top3Contribution = calculateContribution(top3, totalValue);
  const bottom3Contribution = calculateContribution(bottom3, totalValue);

  const renderList = (title: string, items: Array<{name: string, value: number}>, isTop: boolean) => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center mb-3 text-black">
        {isTop ? (
          <>
            <TrendingUp className="mr-2 text-green-500" />
            <h3 className="font-semibold text-sm">Top 3 Categories</h3>
          </>
        ) : (
          <>
            <TrendingDown className="mr-2 text-red-500" />
            <h3 className="font-semibold text-sm">Bottom 3 Categories</h3>
          </>
        )}
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={item.name}
            className="flex justify-between text-xs text-black hover:bg-white/5 px-2 py-1 rounded transition"
          >
            <span className="truncate mr-2">{index + 1}. {item.name}</span>
            <span className="font-medium">{item.value.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="h-full text-white p-4 rounded-lg flex flex-col">
      <div className="grid grid-cols-2 gap-4 flex-grow">
        {renderList('Top 3', top3, true)}
        {renderList('Bottom 3', bottom3, false)}
      </div>
      
      <div className="mt-4 bg-white/10 rounded-lg p-3 text-center">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-400 text-xs">Top 3 Contribution</div>
            <div className="font-medium text-sm text-green-500">
              {top3Contribution.toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">Bottom 3 Contribution</div>
            <div className="font-medium text-sm text-red-500">
              {bottom3Contribution.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySummary;