/** Fixed backdrop: dot grid, two slow-drifting colour blobs and film grain. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-dots absolute inset-0" />
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
