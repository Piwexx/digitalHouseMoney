import React from 'react';
import Link from 'next/link';
import { ActivityItem } from '@/types/activity';
import { LINK_BUTTON_ACTIONS } from '@/constants/constants';
import { formatDayOfWeek } from '@/utils/formatDayOfWeek';

interface Props {
  item: ActivityItem;
}

const ActivityListItemDisplay: React.FC<Props> = ({ item }) => {
  return (
    <Link href={`${LINK_BUTTON_ACTIONS.Detail.href}?query=${item.id}`} key={item.id}>
      <div className='border-b-1 border-gray-100 p-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-150'>
        <div className='flex flex-row items-center gap-2'>
          <span className="text-secondary-color w-4 h-4 bg-primary-color rounded-full" />
          <div className='text-black text-base'>
            {item.description}
          </div>
        </div>
        <div className='text-right'>
          <div className='text-black'>
            {item.amount < 0 ? '-' : '+'}$ {Math.abs(item.amount).toFixed(2)}
          </div>
          <div className='text-gray-400 text-sm'>{formatDayOfWeek(item.dated)}</div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(ActivityListItemDisplay);
