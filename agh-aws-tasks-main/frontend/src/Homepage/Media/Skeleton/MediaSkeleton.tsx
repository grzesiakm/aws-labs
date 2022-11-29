import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const MediaSkeleton: React.VFC = React.memo(() => {
  return (
    <Box sx={{ mr: 2, mb: 4 }}>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={360} height={202.5} />
        <Stack direction="row" spacing={1}>
          <Skeleton variant="circular" width={32} height={32} />
          <Stack width="100%">
            <Typography variant="subtitle2">
              <Skeleton variant="text" width="100%" />
            </Typography>
            <Typography variant="subtitle2">
              <Skeleton variant="text" width="50%" />
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
});
