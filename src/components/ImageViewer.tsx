import Lightbox, { SlideImage } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function ImageViewer(
  { open, setOpen, images }:
  { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; images: string[] }
) {
  const slides: SlideImage[] = [];

  images.forEach(item => {
    const s: SlideImage = {} as SlideImage;
    s.src = item;
    slides.push(s);
  });

  console.log(slides)

  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
      />
    </>
  );
}