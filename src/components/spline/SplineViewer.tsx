
interface SplineViewerProps {
  url: string;
}

export const SplineViewer = ({ url }: SplineViewerProps) => {
  return (
    <spline-viewer
      url={url}
      loading-anim={true}
      events-target="global"
    />
  );
};
