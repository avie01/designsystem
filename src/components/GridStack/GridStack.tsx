import React, { useEffect, useRef, useState } from 'react';
import { GridStack as GridStackJS, GridStackOptions, GridStackWidget } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';

export interface GridStackItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  content?: React.ReactNode;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  noResize?: boolean;
  noMove?: boolean;
}

export interface GridStackProps {
  items: GridStackItem[];
  columns?: number;
  cellHeight?: number | string;
  margin?: number;
  float?: boolean;
  animate?: boolean;
  disableDrag?: boolean;
  disableResize?: boolean;
  onItemChange?: (items: GridStackItem[]) => void;
  onItemAdded?: (item: GridStackItem) => void;
  onItemRemoved?: (item: GridStackItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

const GridStackComponent: React.FC<GridStackProps> = ({
  items,
  columns = 12,
  cellHeight = 80,
  margin = 10,
  float = false,
  animate = true,
  disableDrag = false,
  disableResize = false,
  onItemChange,
  onItemAdded,
  onItemRemoved,
  className,
  style,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<GridStackJS | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!gridRef.current || isInitialized) return;

    const options: GridStackOptions = {
      column: columns,
      cellHeight,
      margin,
      float,
      animate,
      disableDrag,
      disableResize,
      acceptWidgets: true,
    };

    gridInstanceRef.current = GridStackJS.init(options, gridRef.current);
    setIsInitialized(true);

    const grid = gridInstanceRef.current;

    grid.on('change', (event: Event, changedItems: GridStackWidget[]) => {
      if (onItemChange && changedItems) {
        const updatedItems = changedItems.map((item) => ({
          id: item.id || '',
          x: item.x || 0,
          y: item.y || 0,
          w: item.w || 1,
          h: item.h || 1,
        }));
        onItemChange(updatedItems as GridStackItem[]);
      }
    });

    grid.on('added', (event: Event, addedItems: GridStackWidget[]) => {
      if (onItemAdded && addedItems?.[0]) {
        const item = addedItems[0];
        onItemAdded({
          id: item.id || '',
          x: item.x || 0,
          y: item.y || 0,
          w: item.w || 1,
          h: item.h || 1,
        });
      }
    });

    grid.on('removed', (event: Event, removedItems: GridStackWidget[]) => {
      if (onItemRemoved && removedItems?.[0]) {
        const item = removedItems[0];
        onItemRemoved({
          id: item.id || '',
          x: item.x || 0,
          y: item.y || 0,
          w: item.w || 1,
          h: item.h || 1,
        });
      }
    });

    return () => {
      if (gridInstanceRef.current) {
        gridInstanceRef.current.destroy(false);
        gridInstanceRef.current = null;
        setIsInitialized(false);
      }
    };
  }, []);

  useEffect(() => {
    if (!gridInstanceRef.current || !isInitialized) return;

    gridInstanceRef.current.batchUpdate();
    gridInstanceRef.current.removeAll(false);

    items.forEach((item) => {
      const widgetOptions: GridStackWidget = {
        id: item.id,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        minW: item.minW,
        minH: item.minH,
        maxW: item.maxW,
        maxH: item.maxH,
        noResize: item.noResize,
        noMove: item.noMove,
        content: `<div class="grid-stack-item-content-wrapper" data-id="${item.id}"></div>`,
      };
      gridInstanceRef.current?.addWidget(widgetOptions);
    });

    gridInstanceRef.current.commit();
  }, [items, isInitialized]);

  return (
    <div className={className} style={style}>
      <div ref={gridRef} className="grid-stack" />
    </div>
  );
};

export default GridStackComponent;
