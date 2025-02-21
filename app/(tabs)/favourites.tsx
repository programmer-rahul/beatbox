import MusicFilesListingLayout from "@/layout/MusicFilesListingLayout";
import useMusicStore from "@/store/useMusicStore";

export default function FavouritesPage() {
  const localMusicFiles = useMusicStore((state) => state.localMusicFiles);
  const favouriteLocalMusicFiles = useMusicStore(
    (state) => state.favouriteLocalMusicFiles,
  );
  const favouriteMusicFiles = localMusicFiles.filter((musicFile) =>
    favouriteLocalMusicFiles.includes(musicFile.id),
  );

  return (
    <MusicFilesListingLayout
      musicFiles={favouriteMusicFiles}
      title="FAVOURITE MUSIC"
      message="No Favourite Music Files"
      type="FAVOURITE"
    />
  );
}
