import React from 'react';
import Icon from '../Icon/Icon';
import { ODLTheme } from '../../styles/ODLTheme';

interface YellowFolderProps {
  size?: number;
  className?: string;
  color?: string;
}

const YellowFolder: React.FC<YellowFolderProps> = ({
  size = 36,
  className,
  color = ODLTheme.colors.warning
}) => {
  return (
    <Icon
      name="folder"
      size={size}
      className={className}
      color={color}
      aria-hidden="true"
    />
  );
};

export default YellowFolder;