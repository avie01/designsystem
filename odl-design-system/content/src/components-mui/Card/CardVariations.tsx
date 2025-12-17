/**
 * MUI Card Variations with ODL Theming
 * Different card patterns for various use cases
 */

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
  CardActionArea,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Box,
  Collapse,
  LinearProgress,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachFile as AttachFileIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { Button } from '../Button';
import { styled } from '@mui/material/styles';

// Styled components for consistent ODL theming
const StyledCard = styled(Card)(() => ({
  boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
  border: '1px solid #E0E0E0',
  borderRadius: '8px',
  transition: 'all 0.2s ease',

  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
  },
}));

const ExpandIcon = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// 1. Basic Content Card
export const BasicCard: React.FC<{
  title: string;
  content: string;
  action?: React.ReactNode;
}> = ({ title, content, action }) => (
  <StyledCard>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {content}
      </Typography>
    </CardContent>
    {action && <CardActions>{action}</CardActions>}
  </StyledCard>
);

// 2. Media Card with Image
export const MediaCard: React.FC<{
  image: string;
  title: string;
  description: string;
  primaryAction?: string;
  secondaryAction?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}> = ({
  image,
  title,
  description,
  primaryAction = "Learn More",
  secondaryAction = "Share",
  onPrimaryClick,
  onSecondaryClick
}) => (
  <StyledCard>
    <CardMedia
      component="img"
      height="140"
      image={image}
      alt={title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" variant="primary" onClick={onPrimaryClick}>
        {primaryAction}
      </Button>
      <Button size="small" variant="ghost" onClick={onSecondaryClick}>
        {secondaryAction}
      </Button>
    </CardActions>
  </StyledCard>
);

// 3. User Profile Card
export const UserCard: React.FC<{
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  stats?: { label: string; value: string | number }[];
}> = ({ name, role, avatar, bio, stats }) => (
  <StyledCard>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: '#3560C1' }}>
          {avatar || name.charAt(0)}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={name}
      subheader={role}
    />
    <CardContent>
      {bio && (
        <Typography variant="body2" color="text.secondary" paragraph>
          {bio}
        </Typography>
      )}
      {stats && (
        <Box display="flex" justifyContent="space-around" mt={2}>
          {stats.map((stat, index) => (
            <Box key={index} textAlign="center">
              <Typography variant="h6" color="primary">
                {stat.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </CardContent>
    <CardActions disableSpacing>
      <Button variant="primary" size="small" fullWidth>
        View Profile
      </Button>
    </CardActions>
  </StyledCard>
);

// 4. Stats/Metric Card
export const StatsCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  subtitle?: string;
  icon?: React.ReactNode;
}> = ({ title, value, change, subtitle, icon }) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {subtitle}
              </Typography>
            )}
            {change !== undefined && (
              <Box display="flex" alignItems="center" mt={1}>
                {isPositive && <TrendingUpIcon sx={{ color: '#24A148', fontSize: 20 }} />}
                {isNegative && <TrendingDownIcon sx={{ color: '#DA1E28', fontSize: 20 }} />}
                <Typography
                  variant="body2"
                  sx={{
                    color: isPositive ? '#24A148' : isNegative ? '#DA1E28' : 'text.secondary',
                    ml: 0.5,
                  }}
                >
                  {isPositive && '+'}{change}%
                </Typography>
              </Box>
            )}
          </Box>
          {icon && (
            <Box sx={{ color: '#3560C1', opacity: 0.2, fontSize: 48 }}>
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

// 5. Expandable Card
export const ExpandableCard: React.FC<{
  title: string;
  summary: string;
  details: string;
}> = ({ title, summary, details }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" variant="ghost">Learn More</Button>
        <ExpandIcon
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandIcon>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph variant="body2">
            {details}
          </Typography>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

// 6. Interactive/Clickable Card
export const InteractiveCard: React.FC<{
  title: string;
  description: string;
  image?: string;
  onClick?: () => void;
}> = ({ title, description, image, onClick }) => (
  <StyledCard>
    <CardActionArea onClick={onClick}>
      {image && (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </StyledCard>
);

// 7. File/Document Card
export const FileCard: React.FC<{
  fileName: string;
  fileSize: string;
  fileType: string;
  modified?: string;
  icon?: React.ReactNode;
}> = ({ fileName, fileSize, fileType, modified, icon }) => (
  <StyledCard>
    <CardContent>
      <Box display="flex" alignItems="center" gap={2}>
        <Box sx={{ color: '#3560C1', fontSize: 40 }}>
          {icon || <AttachFileIcon fontSize="large" />}
        </Box>
        <Box flex={1}>
          <Typography variant="subtitle1" noWrap>
            {fileName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {fileType} • {fileSize}
          </Typography>
          {modified && (
            <Typography variant="caption" color="text.secondary">
              Modified: {modified}
            </Typography>
          )}
        </Box>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
    </CardContent>
  </StyledCard>
);

// 8. Notification Card
export const NotificationCard: React.FC<{
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  time?: string;
  onDismiss?: () => void;
}> = ({ type, title, message, time, onDismiss }) => {
  const colors = {
    success: '#24A148',
    warning: '#F1C21B',
    error: '#DA1E28',
    info: '#0F62FE',
  };

  const icons = {
    success: <CheckCircleIcon />,
    warning: <WarningIcon />,
    error: <WarningIcon />,
    info: <CheckCircleIcon />,
  };

  return (
    <StyledCard sx={{ borderLeft: `4px solid ${colors[type]}` }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" gap={1.5}>
          <Box sx={{ color: colors[type], mt: 0.5 }}>
            {icons[type]}
          </Box>
          <Box flex={1}>
            <Typography variant="subtitle2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {message}
            </Typography>
            {time && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {time}
              </Typography>
            )}
          </Box>
          {onDismiss && (
            <IconButton size="small" onClick={onDismiss}>
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

// 9. Progress Card
export const ProgressCard: React.FC<{
  title: string;
  progress: number;
  subtitle?: string;
  status?: 'active' | 'completed' | 'error';
}> = ({ title, progress, subtitle, status = 'active' }) => {
  const statusColors = {
    active: '#3560C1',
    completed: '#24A148',
    error: '#DA1E28',
  };

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{title}</Typography>
          <Chip
            label={`${progress}%`}
            size="small"
            sx={{
              bgcolor: progress === 100 ? '#DEFBE6' : '#E0F3FE',
              color: progress === 100 ? '#24A148' : '#3560C1',
            }}
          />
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#E0E0E0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: statusColors[status],
              borderRadius: 4,
            },
          }}
        />
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

// 10. Pricing Card
export const PricingCard: React.FC<{
  title: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  buttonText?: string;
  onSelect?: () => void;
}> = ({ title, price, period = '/month', features, highlighted = false, buttonText = 'Select Plan', onSelect }) => (
  <StyledCard sx={{
    border: highlighted ? '2px solid #3560C1' : '1px solid #E0E0E0',
    position: 'relative',
  }}>
    {highlighted && (
      <Chip
        label="RECOMMENDED"
        size="small"
        sx={{
          position: 'absolute',
          top: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: '#3560C1',
          color: 'white',
        }}
      />
    )}
    <CardContent sx={{ textAlign: 'center', pt: highlighted ? 3 : 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="baseline" mb={3}>
        <Typography variant="h3" component="span" sx={{ fontWeight: 600 }}>
          {price}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
          {period}
        </Typography>
      </Box>
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {features.map((feature, index) => (
          <Box component="li" key={index} sx={{ mb: 1.5 }}>
            <Typography variant="body2" color="text.secondary">
              ✓ {feature}
            </Typography>
          </Box>
        ))}
      </Box>
    </CardContent>
    <CardActions sx={{ p: 2, pt: 0 }}>
      <Button
        variant={highlighted ? 'primary' : 'secondary'}
        fullWidth
        onClick={onSelect}
      >
        {buttonText}
      </Button>
    </CardActions>
  </StyledCard>
);

export default {
  BasicCard,
  MediaCard,
  UserCard,
  StatsCard,
  ExpandableCard,
  InteractiveCard,
  FileCard,
  NotificationCard,
  ProgressCard,
  PricingCard,
};