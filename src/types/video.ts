export interface Video {
  id: string;
  url: string;
  username: string;
  userAvatar: string;
  description: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  hasLiked: boolean;
}

export interface VideoPlayerProps {
  videoUrl: string;
  isActive: boolean;
  onVideoEnd?: () => void;
}

export interface VideoInfoProps {
  video: Video;
}

export interface VideoActionsProps {
  video: Video;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}