import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link as RouterLink } from "react-router-dom";

export interface Props {
  countryCode?: string;
}

export const Logo: React.FC<Props> = ({ countryCode }) => {
  const displayCountryCode = countryCode && countryCode !== "US";

  return (
    <Tooltip title="YouTube Home" enterDelay={500}>
      <Box
        component={RouterLink}
        to="/"
        display="flex"
        alignItems="center"
        sx={{
          textDecoration: "none",
        }}
      >
        <YouTubeIcon fontSize="large" sx={{ fill: "red" }} />
        <Typography
          variant="h6"
          color="textPrimary"
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            letterSpacing: "-0.075rem",
          }}
        >
          YouTube
        </Typography>
        {displayCountryCode && (
          <Typography variant="caption" color="textSecondary" sx={{ mt: -2 }}>
            <sup>{countryCode}</sup>
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};
