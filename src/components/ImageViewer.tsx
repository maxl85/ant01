import { useRef } from 'react';
import Lightbox, { SlideImage } from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Download from 'yet-another-react-lightbox/plugins/download';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

export default function ImageViewer(
  { open, setOpen, images }:
    { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; images: string[] }
) {
  // const thumbnailsRef = useRef(null);
  
  const slides: SlideImage[] = [];

  images.forEach(item => {
    const s: SlideImage = {} as SlideImage;
    s.src = item;
    slides.push(s);
  });

  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        controller={{closeOnBackdropClick: false}}
        carousel={{finite: true}}
        plugins={[Counter, Thumbnails, Zoom]}
        thumbnails={{ showToggle: true }}
        // thumbnails={{ ref: thumbnailsRef, showToggle: true, vignette: true }}
        counter={{ container: { style: { top: 0, bottom: 'unset' } } }}
        zoom={{maxZoomPixelRatio: 3, zoomInMultiplier: 1.5, scrollToZoom: true, wheelZoomDistanceFactor: 500}}
      />
    </>
  );
}