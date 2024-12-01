import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toHinduNumeral } from '@/lib/transforms/statistics';
import {useLocale} from 'next-intl'


interface CategorySummaryProps {
  top3: Array<{ name: string, value: number }>;
  bottom3: Array<{ name: string, value: number }>;
  totalValue: number;
  categoryLen: number
}

// Utility function to calculate contribution percentage
function calculateContribution(items: Array<{ value: number }>, totalValue: number): number {
  const sumOfItems = items.reduce((sum, item) => sum + item.value, 0);
  return (sumOfItems / totalValue) * 100;
}

const CategorySummary: React.FC<CategorySummaryProps> = ({
  top3,
  bottom3,
  totalValue,
  categoryLen
}) => {
  const t = useTranslations()
  const lang = useLocale()
  const top3Contribution = calculateContribution(top3, totalValue);
  const bottom3Contribution = calculateContribution(bottom3, totalValue);
  const top3Percentage = top3Contribution.toFixed(3)
  const bottom3Percentage = bottom3Contribution.toFixed(3)

  const renderList = (title: string, items: Array<{ name: string, value: number }>, isTop: boolean) => (
    <div className="bg-white rounded-lg p-4 h-fit shadow-sm">
      <div className="flex items-center mb-3 text-black">
        {isTop ? (
          <>
            <TrendingUp className="mr-2 text-green-500" />
            <h3 className="font-semibold text-sm">{t('summary.top3')}</h3>
          </>
        ) : (
          <>
            <TrendingDown className="mr-2 text-red-500" />
            <h3 className="font-semibold text-sm">{t('summary.bottom3')}</h3>
          </>
        )}
      </div>
      <ul className="divide-y divide-gray-200 text-sm">
        {items.map((item, index) => (
          <li
            key={item.name}
            className="flex justify-between text-gray-800 px-4 py-2"
          >
            <span className="truncate">{lang === 'en' ? index + 1 : toHinduNumeral(index + 1)}. {item.name}</span>
            <span className="font-medium">{ lang === 'en' ? item.value: toHinduNumeral(item.value) }</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="text-white p-4 rounded-lg flex flex-col">
      <div className="grid grid-cols-2 gap-4 flex-grow">
        {renderList('Top 3', top3, true)}
        {categoryLen >= 6 ? renderList('Bottom 3', bottom3, false) : null}
      </div>

      <div className="mt-4 bg-white/10 rounded-lg p-3 text-center">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-400 text-xs">{t('summary.top3_contribution')}</div>
            <div className="font-medium text-sm text-green-500">
              { lang === 'en' ? top3Percentage : toHinduNumeral(Number(top3Percentage))}%
            </div>
          </div>
          {
            categoryLen >= 6
              ?
              <div>
                <div className="text-gray-400 text-xs">{t('summary.top3_contribution')}</div>
                <div className="font-medium text-sm text-red-500">
                { lang === 'en' ? bottom3Percentage : toHinduNumeral(Number(bottom3Percentage))}%
                </div>
              </div>
              :
              null
          }
        </div>
      </div>
    </div>
  );
};

export default CategorySummary;