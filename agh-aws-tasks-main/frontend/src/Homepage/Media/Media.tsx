import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Chip from "@mui/material/Chip";
import millify from "millify";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { DateTime, Duration } from "luxon";

import { Video } from "../video";

interface Props {
  video: Video;
}

// TODO: styling improvements (sx vs styled-components)
export const Media: React.VFC<Props> = ({ video }) => {
  const date: string | null = React.useMemo(
    () =>
      DateTime.fromISO(video.date)
        .setLocale("en-US")
        .toRelative({
          locale: "en-US",
          unit: ["years", "months", "weeks", "days"],
        }),
    [video.date]
  );

  const duration: string = React.useMemo(
    () => Duration.fromISO(video.duration).toFormat("m:ss"),
    [video.duration]
  );

  return (
    <Box
      sx={{
        width: "100%",
        margin: 0,
        mr: 2,
        mb: 4,
        display: "block",
        maxWidth: (theme) => theme.spacing(45),
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          component="img"
          sx={{
            width: "100%",
          }}
          alt=""
          src={video.thumbnail}
        />
        <Chip
          size="small"
          label={duration}
          sx={{
            position: "absolute",
            bottom: (theme) => theme.spacing(1.5),
            right: (theme) => theme.spacing(0.5),
            color: "#FFF",
            backgroundColor: "#000",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Avatar
          src={video.channel.avatar}
          alt={video.channel.name}
          sx={{
            width: (theme) => theme.spacing(4),
            height: (theme) => theme.spacing(4),
            marginRight: (theme) => theme.spacing(1),
          }}
        />
        <div>
          <Typography variant="subtitle2" gutterBottom>
            {video.title}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="caption">{video.channel.name}</Typography>
            {video.channel.verified && (
              <Tooltip title="Verified">
                <CheckCircleIcon
                  sx={{
                    width: (theme) => theme.spacing(1.5),
                    height: (theme) => theme.spacing(1.5),
                    marginLeft: (theme) => theme.spacing(0.5),
                    color: (theme) => theme.palette.text.secondary,
                  }}
                />
              </Tooltip>
            )}
          </Box>
          <Typography variant="caption" gutterBottom>
            {millify(video.views, { precision: 0 })} views • {date}
          </Typography>
        </div>
      </Box>
    </Box>
  );
};
