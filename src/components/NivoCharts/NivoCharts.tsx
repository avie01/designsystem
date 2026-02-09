import React from 'react';
import { ResponsiveBar, BarDatum } from '@nivo/bar';
import { ResponsiveLine, Serie } from '@nivo/line';
import { ResponsivePie, PieTooltipProps } from '@nivo/pie';
import { ResponsiveRadar } from '@nivo/radar';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { useTheme } from '../../../.storybook/theme-decorator';

export type ChartType = 'bar' | 'line' | 'pie' | 'radar' | 'heatmap';

export interface NivoChartsProps {
  type: ChartType;
  data: any;
  width?: string;
  height?: string;
  keys?: string[];
  indexBy?: string;
  groupMode?: 'grouped' | 'stacked';
  layout?: 'vertical' | 'horizontal';
  enableGridX?: boolean;
  enableGridY?: boolean;
  enableLabel?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: string[] | { scheme: string };
  borderRadius?: number;
  padding?: number;
  innerRadius?: number;
  padAngle?: number;
  cornerRadius?: number;
  animate?: boolean;
  motionConfig?: string;
  legends?: boolean;
  axisBottom?: object | null;
  axisLeft?: object | null;
}

const NivoCharts: React.FC<NivoChartsProps> = ({
  type,
  data,
  width = '100%',
  height = '400px',
  keys = ['value'],
  indexBy = 'id',
  groupMode = 'grouped',
  layout = 'vertical',
  enableGridX = false,
  enableGridY = true,
  enableLabel = true,
  margin = { top: 50, right: 130, bottom: 50, left: 60 },
  colors,
  borderRadius = 4,
  padding = 0.3,
  innerRadius = 0.5,
  padAngle = 0.7,
  cornerRadius = 3,
  animate = true,
  motionConfig = 'gentle',
  legends = true,
  axisBottom,
  axisLeft,
}) => {
  const { colors: themeColors } = useTheme();

  const defaultColors = colors || [
    themeColors.primaryMain,
    themeColors.successMain,
    themeColors.warningMain,
    themeColors.errorMain,
    themeColors.infoMain || '#6929C4',
    '#009D9A',
    '#FA4D56',
    '#8A3FFC',
  ];

  const commonTheme = {
    background: 'transparent',
    textColor: themeColors.textPrimary,
    fontSize: 12,
    axis: {
      domain: {
        line: {
          stroke: themeColors.border,
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: themeColors.border,
          strokeWidth: 1,
        },
        text: {
          fill: themeColors.textSecondary,
          fontSize: 11,
        },
      },
      legend: {
        text: {
          fill: themeColors.textPrimary,
          fontSize: 12,
          fontWeight: 500,
        },
      },
    },
    grid: {
      line: {
        stroke: themeColors.grey300,
        strokeWidth: 1,
      },
    },
    legends: {
      text: {
        fill: themeColors.textPrimary,
        fontSize: 11,
      },
    },
    tooltip: {
      container: {
        background: themeColors.paper,
        color: themeColors.textPrimary,
        fontSize: 12,
        borderRadius: 4,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        padding: '8px 12px',
      },
    },
  };

  const legendConfig = legends ? [
    {
      dataFrom: 'keys' as const,
      anchor: 'bottom-right' as const,
      direction: 'column' as const,
      justify: false,
      translateX: 120,
      translateY: 0,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: 'left-to-right' as const,
      itemOpacity: 0.85,
      symbolSize: 12,
      symbolShape: 'circle' as const,
    },
  ] : [];

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveBar
            data={data}
            keys={keys}
            indexBy={indexBy}
            margin={margin}
            padding={padding}
            groupMode={groupMode}
            layout={layout}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={Array.isArray(defaultColors) ? defaultColors : defaultColors}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            borderRadius={borderRadius}
            axisTop={null}
            axisRight={null}
            axisBottom={axisBottom !== undefined ? axisBottom : {
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: layout === 'vertical' ? indexBy : '',
              legendPosition: 'middle' as const,
              legendOffset: 36,
            }}
            axisLeft={axisLeft !== undefined ? axisLeft : {
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: layout === 'vertical' ? '' : indexBy,
              legendPosition: 'middle' as const,
              legendOffset: -40,
            }}
            enableGridX={enableGridX}
            enableGridY={enableGridY}
            enableLabel={enableLabel}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={legendConfig}
            animate={animate}
            motionConfig={motionConfig}
            theme={commonTheme}
          />
        );

      case 'line':
        return (
          <ResponsiveLine
            data={data}
            margin={margin}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={axisBottom !== undefined ? axisBottom : {
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'X Axis',
              legendOffset: 36,
              legendPosition: 'middle' as const,
            }}
            axisLeft={axisLeft !== undefined ? axisLeft : {
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Y Axis',
              legendOffset: -40,
              legendPosition: 'middle' as const,
            }}
            enableGridX={enableGridX}
            enableGridY={enableGridY}
            colors={Array.isArray(defaultColors) ? defaultColors : defaultColors}
            lineWidth={2}
            pointSize={8}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={false}
            areaOpacity={0.15}
            useMesh={true}
            legends={legends ? [
              {
                anchor: 'bottom-right' as const,
                direction: 'column' as const,
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right' as const,
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle' as const,
              },
            ] : []}
            animate={animate}
            motionConfig={motionConfig}
            theme={commonTheme}
          />
        );

      case 'pie':
        return (
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={innerRadius}
            padAngle={padAngle}
            cornerRadius={cornerRadius}
            activeOuterRadiusOffset={8}
            colors={Array.isArray(defaultColors) ? defaultColors : defaultColors}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={themeColors.textPrimary}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            legends={legends ? [
              {
                anchor: 'bottom' as const,
                direction: 'row' as const,
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: themeColors.textSecondary,
                itemDirection: 'left-to-right' as const,
                itemOpacity: 1,
                symbolSize: 12,
                symbolShape: 'circle' as const,
              },
            ] : []}
            animate={animate}
            motionConfig={motionConfig}
            theme={commonTheme}
          />
        );

      case 'radar':
        return (
          <ResponsiveRadar
            data={data}
            keys={keys}
            indexBy={indexBy}
            maxValue="auto"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: 'color' }}
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={36}
            enableDots={true}
            dotSize={8}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            dotBorderColor={{ from: 'color' }}
            colors={Array.isArray(defaultColors) ? defaultColors : defaultColors}
            fillOpacity={0.25}
            blendMode="multiply"
            animate={animate}
            motionConfig={motionConfig}
            legends={legends ? [
              {
                anchor: 'top-left' as const,
                direction: 'column' as const,
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: themeColors.textSecondary,
                symbolSize: 12,
                symbolShape: 'circle' as const,
              },
            ] : []}
            theme={commonTheme}
          />
        );

      case 'heatmap':
        return (
          <ResponsiveHeatMap
            data={data}
            margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
            valueFormat=">-.2s"
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: '',
              legendOffset: 46,
            }}
            axisRight={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendPosition: 'middle' as const,
              legendOffset: 70,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendPosition: 'middle' as const,
              legendOffset: -72,
            }}
            colors={{
              type: 'sequential',
              scheme: 'blues',
            }}
            emptyColor="#555555"
            borderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
            legends={legends ? [
              {
                anchor: 'bottom' as const,
                translateX: 0,
                translateY: 30,
                length: 400,
                thickness: 8,
                direction: 'row' as const,
                tickPosition: 'after' as const,
                tickSize: 3,
                tickSpacing: 4,
                tickOverlap: false,
                tickFormat: '>-.2s',
                title: 'Value →',
                titleAlign: 'start' as const,
                titleOffset: 4,
              },
            ] : []}
            animate={animate}
            motionConfig={motionConfig}
            theme={commonTheme}
          />
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div style={{ width, height }}>
      {renderChart()}
    </div>
  );
};

export default NivoCharts;
