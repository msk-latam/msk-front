import React from 'react';
type Status = 'correct' | 'pending' | 'error';

export interface StatusCardProps {
  text: string;
  icon?: React.ReactNode;
  status: Status;
}

const statusColors = {
  correct: 'border-green-500 text-[#6474A6]',
  pending: 'border-yellow-500 text-[#6474A6]',
  error: 'border-red-500 text-[#6474A6]',
};

const StatusCard: React.FC<StatusCardProps> = ({ text, icon, status }) => {
  return (
    <div
      className={`flex items-center  p-2 border border-r-[2rem] rounded-md ${statusColors[status]} bg-white`}
    >
      {icon}
      <span className='pl-2'>{text}</span>
    </div>
  );
};

export default StatusCard;
