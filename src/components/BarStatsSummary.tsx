import React from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toHinduNumeral } from '@/lib/transforms/statistics';
import { useLocale } from 'next-intl'

interface BarSummaryProps {
  top5: string[];
  bottom5: string[];
  theme: string; // theme here indicates the topic of the graph
  sum?: string;
  average?: string;
  indicator_type?: string;
  stats?: {
    max?: number;
    min?: number;
    sum?: number;
    average?: number;
  };
}

const BarSummary: React.FC<BarSummaryProps> = ({
  top5,
  bottom5,
  sum,
  average,
  indicator_type,
  stats,
  theme
}) => {
  const t = useTranslations()
  const lang = useLocale()
  const renderList = (title: string, items: string[], isTop: boolean) => (
    <div className="bg-white rounded-lg p-4 shadow-sm h-fit mt-4">
      <div className="flex items-center mb-3 text-black">
        {isTop ? (
          <>
            <TrendingUp className="mr-2 text-green-500" />
            <h3 className="font-semibold text-sm">{t('summary.high_wards_title', { message: theme })}</h3>
          </>
        ) : (
          <>
            <TrendingDown className="mr-2 text-red-500" />
            <h3 className="font-semibold text-sm">{t('summary.low_wards_title', { message: theme })}</h3>
          </>
        )}
      </div>
      <ul className="divide-y divide-gray-200 text-sm">
        {items.map((item, index) => (
          <li
            key={item.name}
            className="flex justify-between text-gray-800 px-4 py-2"
          >
            <span className="truncate">
              {lang === 'en' ? index + 1 : toHinduNumeral(index + 1)}. {item.name}
            </span>
            <span>
              {lang === 'en' ? item.value : toHinduNumeral(item.value)}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );

  return (
    <div className="h-full text-white p-4 rounded-lg flex flex-col my-auto">
      {indicator_type==="numeric" || indicator_type==="Count" && sum !== undefined ?
        <div className="bg-white/10 p-2 rounded text-center">
          <div className="text-gray-900 font-bold">{t('summary.total_count', { message: theme })}</div>
          <div className="font-medium text-gray-800">{sum.toLocaleString()}</div>
        </div>
        :
        <>
          {average !== undefined ?
            <div className="bg-white/10 p-2 rounded text-center">
              <div className="text-gray-900 font-bold">{t('summary.average', { message: theme })}</div>
              <div className="font-medium text-gray-800">{average.toLocaleString()}</div>
            </div> : ''}
        </>
      }
      <div className="grid grid-cols-2 gap-4 flex-grow">
        {renderList('Top 5', top5, true)}
        {renderList('Bottom 5', bottom5, false)}
      </div>

      {stats && Object.keys(stats).length > 0 && (
        <div className="mt-4 bg-white/5 rounded-lg p-3">
          <div className="flex items-center mb-2 text-gray-300">
            <Info className="mr-2 w-4 h-4" />
            <h4 className="text-xs font-semibold">Additional Statistics</h4>
          </div>
          <div className="grid grid-cols-4 gap-2 text-xs">
            {stats.max !== undefined && (
              <div className="bg-white/10 p-2 rounded text-center">
                <div className="text-gray-400">Max</div>
                <div className="font-medium">{stats.max.toLocaleString()}</div>
              </div>
            )}
            {stats.min !== undefined && (
              <div className="bg-white/10 p-2 rounded text-center">
                <div className="text-gray-400">Min</div>
                <div className="font-medium">{stats.min.toLocaleString()}</div>
              </div>
            )}
            {sum !== undefined && (
              <div className="bg-white/10 p-2 rounded text-center">
                <div className="text-gray-400">{t('summary.total_count', { message: theme })}</div>
                <div className="font-medium">{toHinduNumeral(sum).toLocaleString()}</div>
              </div>
            )}
            {stats.average !== undefined && (
              <div className="bg-white/10 p-2 rounded text-center">
                <div className="text-gray-400">Avg</div>
                <div className="font-medium">{stats.average.toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BarSummary;