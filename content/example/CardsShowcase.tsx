/**
 * MUI Cards Showcase with ODL Theme
 * Demonstrates various card patterns and use cases
 */

import React from 'react';
import { ODLThemeProvider } from '../src/theme/ODLThemeProvider';
import {
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
} from '../src/components-mui/Card/CardVariations';
import {
  Box,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Assessment as AssessmentIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { Button } from '../src/components-mui/Button';

const CardsShowcase: React.FC = () => {
  return (
    <ODLThemeProvider enableMui={true}>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb', py: 4 }}>
        <Container maxWidth="lg">
          {/* Navigation */}
          <Box sx={{ mb: 3 }}>
            <Button
              variant="ghost"
              leftIcon={<ArrowBackIcon />}
              onClick={() => window.location.href = '/mui-comparison.html'}
            >
              Back to Component Comparison
            </Button>
          </Box>

          <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
            ODL-Themed MUI Card Variations
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            A collection of card components built with Material-UI and styled with ODL design system
          </Typography>

          <Grid container spacing={3}>
            {/* Basic Card */}
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="h6" gutterBottom>Basic Card</Typography>
              <BasicCard
                title="Simple Card"
                content="This is a basic card with title and content. Perfect for simple information display."
              />
            </Grid>

            {/* Media Card */}
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="h6" gutterBottom>Media Card</Typography>
              <MediaCard
                image="https://via.placeholder.com/400x200/3560C1/ffffff?text=ODL+Design"
                title="Featured Content"
                description="Cards can display media content like images or videos along with text and actions."
                onPrimaryClick={() => console.log('Primary action')}
                onSecondaryClick={() => console.log('Secondary action')}
              />
            </Grid>

            {/* User Card */}
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="h6" gutterBottom>User Profile Card</Typography>
              <UserCard
                name="Sarah Johnson"
                role="Senior Designer"
                bio="Passionate about creating beautiful and functional user experiences."
                stats={[
                  { label: 'Projects', value: 42 },
                  { label: 'Awards', value: 8 },
                  { label: 'Team', value: 15 },
                ]}
              />
            </Grid>

            {/* Stats Cards */}
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h6" gutterBottom>Stats Card</Typography>
              <StatsCard
                title="Total Revenue"
                value="$45,231"
                change={12.5}
                subtitle="vs last month"
                icon={<DashboardIcon />}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <StatsCard
                title="Active Users"
                value="2,543"
                change={-5.4}
                subtitle="vs last week"
                icon={<PeopleIcon />}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <StatsCard
                title="Orders"
                value="1,234"
                change={23.1}
                subtitle="vs yesterday"
                icon={<ShoppingCartIcon />}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <StatsCard
                title="Performance"
                value="98.5%"
                change={0}
                subtitle="stable"
                icon={<AssessmentIcon />}
              />
            </Grid>

            {/* Expandable Card */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Expandable Card</Typography>
              <ExpandableCard
                title="Learn More About ODL"
                summary="ODL Design System provides consistent, accessible components for building enterprise applications."
                details="The ODL (Open Design Language) is a comprehensive design system that includes design tokens, component patterns, accessibility guidelines, and implementation resources. It ensures consistency across all applications while maintaining flexibility for specific use cases. The system is built on modern web standards and follows WCAG 2.1 AA accessibility guidelines."
              />
            </Grid>

            {/* Interactive Card */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Interactive Card</Typography>
              <InteractiveCard
                title="Click Me!"
                description="This entire card is clickable. Great for navigation or selection interfaces."
                image="https://via.placeholder.com/400x200/E0F3FE/3560C1?text=Interactive"
                onClick={() => alert('Card clicked!')}
              />
            </Grid>

            {/* File Cards */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>File Card</Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <FileCard
                  fileName="Design-System-Guidelines.pdf"
                  fileSize="2.4 MB"
                  fileType="PDF Document"
                  modified="2 hours ago"
                />
                <FileCard
                  fileName="Component-Library.sketch"
                  fileSize="15.7 MB"
                  fileType="Sketch File"
                  modified="Yesterday"
                />
              </Box>
            </Grid>

            {/* Notification Cards */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Notification Cards</Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <NotificationCard
                  type="success"
                  title="Deployment Successful"
                  message="Your application has been deployed to production."
                  time="5 minutes ago"
                />
                <NotificationCard
                  type="warning"
                  title="Storage Warning"
                  message="You're using 85% of your storage quota."
                  time="1 hour ago"
                />
                <NotificationCard
                  type="error"
                  title="Build Failed"
                  message="The latest build failed due to test errors."
                  time="30 minutes ago"
                />
              </Box>
            </Grid>

            {/* Progress Cards */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Progress Cards</Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <ProgressCard
                  title="Project Alpha"
                  progress={75}
                  subtitle="3 of 4 milestones completed"
                  status="active"
                />
                <ProgressCard
                  title="Data Migration"
                  progress={100}
                  subtitle="Completed successfully"
                  status="completed"
                />
                <ProgressCard
                  title="System Backup"
                  progress={45}
                  subtitle="In progress..."
                  status="active"
                />
              </Box>
            </Grid>

            {/* Pricing Cards */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Pricing Cards</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <PricingCard
                    title="Starter"
                    price="$9"
                    features={[
                      '10 Projects',
                      '2 GB Storage',
                      'Basic Support',
                      'API Access',
                    ]}
                    onSelect={() => console.log('Starter selected')}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <PricingCard
                    title="Professional"
                    price="$29"
                    highlighted
                    features={[
                      'Unlimited Projects',
                      '100 GB Storage',
                      'Priority Support',
                      'Advanced Analytics',
                      'Custom Integrations',
                    ]}
                    onSelect={() => console.log('Professional selected')}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <PricingCard
                    title="Enterprise"
                    price="$99"
                    features={[
                      'Everything in Pro',
                      'Unlimited Storage',
                      'Dedicated Support',
                      'Custom Training',
                      'SLA Guarantee',
                    ]}
                    buttonText="Contact Sales"
                    onSelect={() => console.log('Enterprise selected')}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Usage Notes */}
          <Box sx={{ mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
            <Typography variant="h5" gutterBottom>
              Card Variations Summary
            </Typography>
            <Typography variant="body2" paragraph>
              These MUI Card components demonstrate various patterns while maintaining ODL design consistency:
            </Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 3 }}>
              <li>• <strong>Basic Card</strong> - Simple content display</li>
              <li>• <strong>Media Card</strong> - Image/video with actions</li>
              <li>• <strong>User Card</strong> - Profile information with stats</li>
              <li>• <strong>Stats Card</strong> - KPIs and metrics display</li>
              <li>• <strong>Expandable Card</strong> - Progressive disclosure</li>
              <li>• <strong>Interactive Card</strong> - Clickable for navigation</li>
              <li>• <strong>File Card</strong> - Document/file representation</li>
              <li>• <strong>Notification Card</strong> - Alerts and messages</li>
              <li>• <strong>Progress Card</strong> - Task/project status</li>
              <li>• <strong>Pricing Card</strong> - Product tiers and plans</li>
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              All cards use ODL colors, spacing, typography, and shadows for consistency.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ODLThemeProvider>
  );
};

export default CardsShowcase;