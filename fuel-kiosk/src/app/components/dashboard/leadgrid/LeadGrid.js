import { Container, Grid, SimpleGrid, Skeleton } from '@mantine/core';

// Height constant for the primary content section
const PRIMARY_COL_HEIGHT = '300px';

// Grid layout component for dashboard organization
export function LeadGrid({
  primaryContent,          // Main content area (e.g., login form)
  secondaryTopContent,     // Top secondary content
  secondaryBottomLeftContent,  // Bottom left content
  secondaryBottomRightContent  // Bottom right content
}) {
  // Calculate height for secondary sections based on primary height
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md" fluid >
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* Primary content section - full height */}
        <div style={{ height: PRIMARY_COL_HEIGHT }}>
          {primaryContent || <Skeleton height="100%" radius="md" animate={false} />}
        </div>

        {/* Secondary content grid with three sections */}
        <Grid gutter="md">
          {/* Top section - full width */}
          <Grid.Col>
            <div style={{ height: SECONDARY_COL_HEIGHT }}>
              {secondaryTopContent || <Skeleton height="100%" radius="md" animate={false} />}
            </div>
          </Grid.Col>

          {/* Bottom left section - half width */}
          <Grid.Col span={6}>
            <div style={{ height: SECONDARY_COL_HEIGHT }}>
              {secondaryBottomLeftContent || <Skeleton height="100%" radius="md" animate={false} />}
            </div>
          </Grid.Col>

          {/* Bottom right section - half width */}
          <Grid.Col span={6}>
            <div style={{ height: SECONDARY_COL_HEIGHT }}>
              {secondaryBottomRightContent || <Skeleton height="100%" radius="md" animate={false} />}
            </div>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
