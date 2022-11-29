import { useQuery } from "react-query";

import axios from "../api/client";

import { Video } from "./video";

// TODO: better types
export function useRecommendedVideos() {
  return useQuery<Video[]>(
    "recommendedVideos",
    async () => {
      const result = await axios.get<Video[]>("/videos");
      return result.data;
    }
  );
}
