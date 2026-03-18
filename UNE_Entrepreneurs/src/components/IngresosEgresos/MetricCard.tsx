import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
  trendType?: 'up' | 'down';
  footer: string;
  type?: 'default' | 'saldo';
  progress?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  trend, 
  trendType, 
  footer, 
  type = 'default',
  progress
}) => {
  return (
    <div className={`metric-card ${type === 'saldo' ? 'saldo-neto' : ''}`}>
      <span className="metric-label">{label}</span>
      <div className="metric-value">
        {value}
        {trend && (
          <span className={`metric-trend ${trendType === 'up' ? 'trend-up' : 'trend-down'}`}>
            {trendType === 'up' ? <TrendingUp size={14} style={{marginRight: 4}} /> : <TrendingDown size={14} style={{marginRight: 4}} />}
            {trend}
          </span>
        )}
      </div>
      
      {type === 'saldo' && progress !== undefined ? (
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-info">
            <span>{progress}% Meta</span>
          </div>
        </div>
      ) : (
        <div className="metric-footer">{footer}</div>
      )}
    </div>
  );
};

export default MetricCard;
