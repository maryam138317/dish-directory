'use client';
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
 
interface SliderImage {
  id: string;
  image: string;
}
 
const sliderImages: SliderImage[] = [
  { id: '1', image: 'https://cdn.dummyjson.com/recipe-images/1.webp' },
  { id: '2', image: 'https://cdn.dummyjson.com/recipe-images/6.webp' },
  { id: '3', image: 'https://cdn.dummyjson.com/recipe-images/13.webp' },
  { id: '4', image: 'https://cdn.dummyjson.com/recipe-images/30.webp' },
];
 
export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSrc = sliderImages[activeIndex];
 
  const goTo = (index: number) => {
    const wrapped = (index + sliderImages.length) % sliderImages.length;
    setActiveIndex(wrapped);
  };
 
  return (
    <Box
      sx={{
        position: 'relative',
        width: '80%',
        height: { xs: 280, sm: 360, md: 440 },
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSrc.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src={activeSrc.image}
            alt={`Recipe preview ${activeSrc.id}`}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 90vw, 1200px"
            style={{ objectFit: 'cover' }}
            priority={activeIndex === 0}
          />
        </motion.div>
      </AnimatePresence>
 
      {/* darken the bottom edge so the white dots stay legible over any photo */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 30%)',
          pointerEvents: 'none',
        }}
      />
 
      <IconButton
        onClick={() => goTo(activeIndex - 1)}
        aria-label="Previous image"
        sx={{
          position: 'absolute',
          top: '50%',
          left: 12,
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.55)' },
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>
 
      <IconButton
        onClick={() => goTo(activeIndex + 1)}
        aria-label="Next image"
        sx={{
          position: 'absolute',
          top: '50%',
          right: 12,
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.55)' },
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
 
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        {sliderImages.map((item, index) => (
          <Box
            key={item.id}
            onClick={() => setActiveIndex(index)}
            sx={{
              width: index === activeIndex ? 20 : 8,
              height: 8,
              borderRadius: 4,
              cursor: 'pointer',
              backgroundColor: index === activeIndex ? 'common.white' : 'rgba(255,255,255,0.5)',
              transition: 'width 0.25s ease, background-color 0.25s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
