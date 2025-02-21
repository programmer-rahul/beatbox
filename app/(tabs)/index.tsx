import MusicFilesListingLayout from "@/layout/MusicFilesListingLayout";
import useMusicStore from "@/store/useMusicStore";

export default function HomePage() {
  const localMusicFiles = useMusicStore((state) => state.localMusicFiles);

  return (
    <MusicFilesListingLayout
      musicFiles={localMusicFiles}
      title="ALL MUSIC FILES"
      message="No Music Files Found"
      type="ALL"
    />
  );
}
