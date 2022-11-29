import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { Media, MediaSkeleton } from "./Media";
import { useRecommendedVideos } from "./useVideos";

export const Homepage: React.VFC = () => {
  const { data: videos, error, isFetching } = useRecommendedVideos();

  if (isFetching)
    return (
      <Stack direction="row" flexWrap="wrap">
        {Array.from(new Array(4)).map((_, index) => (
          <MediaSkeleton key={index} />
        ))}
      </Stack>
    );

  // TODO: better way of getting error messages
  if (error) {
    return <Alert severity="error">{(error as Error).message}</Alert>;
  }

  return (
    <>
      <Stack direction="row" flexWrap="wrap">
        {videos?.map((video) => (
          <Media key={video.id} video={video}></Media>
        ))}
      </Stack>
    </>
  );
};
