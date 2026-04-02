import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaBirthdayCake, FaGift, FaHeart } from 'react-icons/fa';
import { BirthdayData } from '../utils';
import { useEffect, useRef, useState } from 'react';

interface BirthdayPageProps {
  data: BirthdayData;
}

export default function BirthdayPage({ data }: BirthdayPageProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
  };

  const getSpotifyEmbedUrl = (url: string) => {
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? `https://open.spotify.com/embed/track/${match[1]}` : null;
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Auto play music
    if (data.musicUrl && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Autoplay blocked:', err);
      });
    }
  }, [data.musicUrl]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100
      }
    }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const
    }
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut' as const
    }
  };

  const youtubeEmbedUrl = data.musicLink ? getYouTubeEmbedUrl(data.musicLink) : null;
  const spotifyEmbedUrl = data.musicLink ? getSpotifyEmbedUrl(data.musicLink) : null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {showConfetti && <Confetti width={dimensions.width} height={dimensions.height} />}
      
      {/* Audio Element */}
      {data.musicUrl && !data.musicLink && (
        <audio ref={audioRef} src={data.musicUrl} loop>
          Your browser does not support audio.
        </audio>
      )}

      {/* Music Link Audio (background only, no visible player) */}
      {data.musicLink && (
        <>
          {youtubeEmbedUrl && (
            <iframe
              width="1"
              height="1"
              src={youtubeEmbedUrl}
              allow="autoplay; encrypted-media"
              title="YouTube audio-only player"
              style={{ border: 'none', position: 'absolute', left: '-9999px', top: '-9999px' }}
            />
          )}
          {spotifyEmbedUrl && (
            <iframe
              src={spotifyEmbedUrl}
              width="1"
              height="1"
              allow="encrypted-media"
              title="Spotify background audio player"
              style={{ border: 'none', position: 'absolute', left: '-9999px', top: '-9999px' }}
            />
          )}
        </>
      )}

      {/* Floating Icons Background */}
      <motion.div
        animate={floatingAnimation}
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          fontSize: '80px',
          opacity: 0.2,
          color: '#fff'
        }}
      >
        🎈
      </motion.div>
      <motion.div
        animate={floatingAnimation}
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          fontSize: '60px',
          opacity: 0.2,
          color: '#fff'
        }}
      >
        🎁
      </motion.div>
      <motion.div
        animate={floatingAnimation}
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '20%',
          fontSize: '70px',
          opacity: 0.2,
          color: '#fff'
        }}
      >
        🎉
      </motion.div>
      <motion.div
        animate={floatingAnimation}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          fontSize: '65px',
          opacity: 0.2,
          color: '#fff'
        }}
      >
        🎂
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: '800px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '30px',
          padding: '60px 40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Animated Icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
          <motion.div animate={pulseAnimation}>
            <FaBirthdayCake size={50} color="#667eea" />
          </motion.div>
          <motion.div animate={pulseAnimation}>
            <FaGift size={50} color="#764ba2" />
          </motion.div>
          <motion.div animate={pulseAnimation}>
            <FaHeart size={50} color="#f093fb" />
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: '4rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          HAPPY BIRTHDAY! 🎉
        </motion.h1>

        {/* Name */}
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: '3rem',
            color: '#764ba2',
            marginBottom: '30px',
            fontWeight: '600'
          }}
        >
          {data.name}
        </motion.h2>

        {/* Date */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: '1.5rem',
            color: '#555',
            marginBottom: '40px',
            fontWeight: '500'
          }}
        >
          📅 {new Date(data.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </motion.p>

        {/* Message */}
        <motion.div
          variants={itemVariants}
          style={{
            fontSize: '1.3rem',
            lineHeight: '2',
            color: '#333',
            padding: '30px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: '20px',
            marginBottom: '40px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
          }}
        >
          {data.message}
        </motion.div>

        {/* Image Gallery */}
        {data.images && data.images.length > 0 && (
          <motion.div
            variants={itemVariants}
            style={{
              marginBottom: '40px'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              color: '#764ba2',
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              📸 Gallery Kenangan
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: data.images.length === 1 
                ? '1fr' 
                : data.images.length === 2 
                  ? 'repeat(2, 1fr)'
                  : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              padding: '10px'
            }}>
              {data.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    aspectRatio: '1',
                    position: 'relative'
                  }}
                >
                  <img
                    src={image}
                    alt={`Memory ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Animated Balloons */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            fontSize: '4rem',
            marginTop: '20px'
          }}
        >
          🎈🎊🎁🎂🎉
        </motion.div>
      </motion.div>
    </div>
  );
}
