import React from 'react';
import Icon from '../src/components/Icon/Icon';
import Graph, { chartColors } from '../src/components/Graph/Graph';

const ApplicationStatsCards: React.FC = () => {
  // Sample data for demonstrations - converted to format for Graph component
  const applicationTrend = [
    { month: 'Jan', value: 145 },
    { month: 'Feb', value: 162 },
    { month: 'Mar', value: 158 },
    { month: 'Apr', value: 171 },
    { month: 'May', value: 165 },
    { month: 'Jun', value: 178 },
    { month: 'Jul', value: 182 },
    { month: 'Aug', value: 195 },
    { month: 'Sep', value: 189 },
    { month: 'Oct', value: 201 },
    { month: 'Nov', value: 198 },
    { month: 'Dec', value: 212 }
  ];
  
  const performanceTrend = [
    { month: 'Jan', value: 78 },
    { month: 'Feb', value: 82 },
    { month: 'Mar', value: 79 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 88 },
    { month: 'Jun', value: 87 },
    { month: 'Jul', value: 91 },
    { month: 'Aug', value: 89 },
    { month: 'Sep', value: 92 },
    { month: 'Oct', value: 94 },
    { month: 'Nov', value: 93 },
    { month: 'Dec', value: 95 }
  ];
  
  const processingTrend = [
    { month: 'Jan', value: 28 },
    { month: 'Feb', value: 26 },
    { month: 'Mar', value: 27 },
    { month: 'Apr', value: 25 },
    { month: 'May', value: 24 },
    { month: 'Jun', value: 23 },
    { month: 'Jul', value: 22 },
    { month: 'Aug', value: 23 },
    { month: 'Sep', value: 21 },
    { month: 'Oct', value: 20 },
    { month: 'Nov', value: 19 },
    { month: 'Dec', value: 18 }
  ];
  
  const workloadTrend = [
    { month: 'Jan', value: 72 },
    { month: 'Feb', value: 75 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 76 },
    { month: 'May', value: 80 },
    { month: 'Jun', value: 82 },
    { month: 'Jul', value: 79 },
    { month: 'Aug', value: 83 },
    { month: 'Sep', value: 85 },
    { month: 'Oct', value: 84 },
    { month: 'Nov', value: 87 },
    { month: 'Dec', value: 86 }
  ];
  
  const monthlyComparison = [
    { month: 'Oct', applications: 178 },
    { month: 'Nov', applications: 189 },
    { month: 'Dec', applications: 212 }
  ];

  const statsCards = [
    {
      title: 'Total Applications',
      mainValue: '212',
      period: 'This Month',
      change: '+12.2%',
      changeType: 'positive' as const,
      comparison: 'vs last month (189)',
      yearComparison: '+18.5% vs Dec 2023',
      sparklineData: applicationTrend,
      graphType: 'area' as const,
      icon: 'document-add',
      color: chartColors.blue,
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(255, 255, 255, 1))'
    },
    {
      title: 'On-Time Performance',
      mainValue: '95%',
      period: 'Current Rate',
      change: '+3%',
      changeType: 'positive' as const,
      comparison: 'Target: 90%',
      yearComparison: 'Best month this year',
      sparklineData: performanceTrend,
      graphType: 'line' as const,
      icon: 'checkmark-filled',
      color: chartColors.emerald,
      bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(255, 255, 255, 1))',
      showTarget: true,
      targetValue: 90
    },
    {
      title: 'Avg Processing Time',
      mainValue: '18 days',
      period: 'Current Average',
      change: '-10%',
      changeType: 'positive' as const,
      comparison: 'Target: 21 days',
      yearComparison: 'Fastest this quarter',
      sparklineData: processingTrend,
      graphType: 'bar' as const,
      icon: 'time',
      color: chartColors.violet,
      bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(255, 255, 255, 1))'
    },
    {
      title: 'Team Workload',
      mainValue: '86%',
      period: 'Capacity Used',
      change: '+4%',
      changeType: 'warning' as const,
      comparison: '22 active per officer',
      yearComparison: 'Near capacity',
      sparklineData: workloadTrend,
      graphType: 'area' as const,
      icon: 'user-multiple',
      color: chartColors.amber,
      bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(255, 255, 255, 1))'
    }
  ];

  const applicationTypes = [
    { type: 'Development Applications', count: 89, percentage: 42, color: '#3B82F6' },
    { type: 'Complying Development', count: 54, percentage: 25, color: '#10B981' },
    { type: 'Modifications', count: 38, percentage: 18, color: '#8B5CF6' },
    { type: 'Reviews', count: 31, percentage: 15, color: '#F59E0B' }
  ];

  // Data for pie chart
  const pieChartData = [
    { name: 'Development', value: 89 },
    { name: 'Complying', value: 54 },
    { name: 'Modifications', value: 38 },
    { name: 'Reviews', value: 31 }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>
        Application Statistics Dashboard
      </h2>
      
      {/* Main Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '16px',
        marginBottom: '24px'
      }}>
        {statsCards.map((stat, index) => (
          <div
            key={index}
            style={{
              background: stat.bgGradient,
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>{stat.title}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <h3 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', margin: 0 }}>
                    {stat.mainValue}
                  </h3>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: stat.changeType === 'positive' ? '#10B981' : 
                           stat.changeType === 'warning' ? '#F59E0B' : '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <Icon 
                      name={stat.changeType === 'positive' ? 'arrow-up' : 'arrow-down'} 
                      size={12} 
                    />
                    {stat.change}
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>{stat.period}</p>
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: stat.color + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon name={stat.icon as any} size={20} color={stat.color} />
              </div>
            </div>

            {/* Compact Graph */}
            <div style={{ 
              marginBottom: '12px', 
              width: '100%',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '8px',
              padding: '8px'
            }}>
              <Graph
                type={stat.graphType || 'area'}
                data={stat.sparklineData.slice(-6)} // Show last 6 months for clarity
                dataKeys={['value']}
                xAxisKey="month"
                width="100%"
                height={80}
                showLegend={false}
                showGrid={stat.graphType === 'bar'}
                showTooltip={true}
                colors={[stat.color]}
                animated={true}
                gradient={stat.graphType === 'area'}
                curved={stat.graphType !== 'bar'}
              />
            </div>

            {/* Comparison Info */}
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', color: '#6B7280' }}>{stat.comparison}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
                {stat.yearComparison}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        
        {/* Application Types Breakdown */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #E5E7EB'
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
            Applications by Type
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center' }}>
            {/* Type List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {applicationTypes.map((type, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '2px',
                    backgroundColor: type.color
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', color: '#374151' }}>{type.type}</div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{type.count} applications</div>
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    {type.percentage}%
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pie Chart */}
            <div style={{ width: '150px', height: '150px' }}>
              <Graph
                type="pie"
                data={pieChartData}
                dataKeys={['value']}
                width={150}
                height={150}
                showLegend={false}
                showTooltip={true}
                animated={true}
                colors={[chartColors.blue, chartColors.emerald, chartColors.violet, chartColors.amber]}
              />
            </div>
          </div>
          
          {/* Monthly Comparison */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>3-Month Trend</p>
            <div style={{ width: '120px' }}>
              <Graph
                type="bar"
                data={monthlyComparison}
                dataKeys={['applications']}
                xAxisKey="month"
                width={120}
                height={50}
                showLegend={false}
                showGrid={false}
                showTooltip={false}
                colors={[chartColors.blue]}
                animated={true}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #E5E7EB'
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
            Quick Actions
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{
              padding: '12px',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <Icon name="add" size={16} />
              New Application
            </button>
            <button style={{
              padding: '12px',
              backgroundColor: 'white',
              color: '#374151',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              View All Applications
            </button>
            <button style={{
              padding: '12px',
              backgroundColor: 'white',
              color: '#374151',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Generate Report
            </button>
            <button style={{
              padding: '12px',
              backgroundColor: 'white',
              color: '#374151',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatsCards;