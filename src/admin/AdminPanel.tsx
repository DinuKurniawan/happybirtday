import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BirthdayData, createShareLink } from '../utils';
import { FaLock, FaUser, FaCalendar, FaMusic, FaComment, FaSave, FaImage, FaTimes, FaLink, FaCopy } from 'react-icons/fa';

interface AdminPanelProps {
  data: BirthdayData;
  onSave: (data: BirthdayData) => void;
  onBack: () => void;
}

export default function AdminPanel({ data, onSave, onBack }: AdminPanelProps) {
  const [formData, setFormData] = useState<BirthdayData>(data);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>(data.images || []);
  const [shareableLink, setShareableLink] = useState<string>('');
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const baseUrl = window.location.origin + window.location.pathname;
    const link = createShareLink(baseUrl, formData);
    setShareableLink(link);
  }, [formData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    let updatedData = { ...formData };

    if (updatedData.musicLink) {
      updatedData.musicUrl = '';
    }
    
    // Handle music file
    if (musicFile) {
      const url = URL.createObjectURL(musicFile);
      updatedData.musicUrl = url;
      updatedData.musicLink = '';
    }
    
    updatedData.images = imagePreviews;
    
    onSave(updatedData);
  };

  const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setMusicFile(file);
    } else {
      alert('Mohon upload file audio (MP3, WAV, dll)');
    }
  };

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error(`Gagal membaca file: ${file.name}`));
      reader.readAsDataURL(file);
    });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validImages = Array.from(files).filter((file) => file.type.startsWith('image/'));
      
      if (validImages.length > 0) {
        try {
          const newPreviews = await Promise.all(validImages.map((file) => fileToDataUrl(file)));
          setImagePreviews((prev) => [...prev, ...newPreviews]);
        } catch {
          alert('Ada gambar yang gagal diproses. Coba upload ulang.');
        }
      } else {
        alert('Mohon upload file gambar (JPG, PNG, GIF, dll)');
      }
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '600px',
          width: '100%',
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
          gap: '10px'
        }}>
          <FaLock size={30} color="#1e3c72" />
          <h1 style={{
            fontSize: '2.5rem',
            color: '#1e3c72',
            fontWeight: 'bold'
          }}>
            Admin Panel
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.1rem',
              color: '#333',
              marginBottom: '10px',
              fontWeight: '600'
            }}>
              <FaUser color="#1e3c72" /> Nama
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1rem',
                border: '2px solid #ddd',
                borderRadius: '10px',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* Date Input */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.1rem',
              color: '#333',
              marginBottom: '10px',
              fontWeight: '600'
            }}>
              <FaCalendar color="#1e3c72" /> Tanggal Lahir
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1rem',
                border: '2px solid #ddd',
                borderRadius: '10px',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* Music Upload */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.1rem',
              color: '#333',
              marginBottom: '10px',
              fontWeight: '600'
            }}>
              <FaMusic color="#1e3c72" /> Upload Musik (File)
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleMusicChange}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1rem',
                border: '2px solid #ddd',
                borderRadius: '10px',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            {formData.musicUrl && !musicFile && (
              <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>
                ✓ Musik sudah terupload
              </p>
            )}
            {musicFile && (
              <p style={{ marginTop: '10px', color: '#1e3c72', fontSize: '0.9rem' }}>
                ✓ File baru dipilih: {musicFile.name}
              </p>
            )}
          </div>

          {/* Music Link Input */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.1rem',
              color: '#333',
              marginBottom: '10px',
              fontWeight: '600'
            }}>
              <FaLink color="#1e3c72" /> Link Musik (YouTube, Spotify, dll)
            </label>
            <input
              type="url"
              value={formData.musicLink}
              onChange={(e) => setFormData({ ...formData, musicLink: e.target.value })}
              placeholder="https://youtube.com/... atau https://open.spotify.com/..."
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1rem',
                border: '2px solid #ddd',
                borderRadius: '10px',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>
              💡 Paste link dari YouTube, Spotify, SoundCloud, dll. Akan ditampilkan sebagai embed player.
            </p>
            {formData.musicLink && (
              <p style={{ marginTop: '5px', color: '#1e3c72', fontSize: '0.9rem' }}>
                ✓ Link musik: {formData.musicLink.substring(0, 50)}...
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.1rem',
              color: '#333',
              marginBottom: '10px',
              fontWeight: '600'
            }}>
              <FaImage color="#1e3c72" /> Upload Gambar (Tanpa Batasan)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1rem',
                border: '2px solid #ddd',
                borderRadius: '10px',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>
              💡 Bisa pilih multiple gambar sekaligus (Ctrl+Click atau Shift+Click)
            </p>
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div style={{
                marginTop: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '15px'
              }}>
                {imagePreviews.map((preview, index) => (
                  <div key={index} style={{
                    position: 'relative',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    aspectRatio: '1'
                  }}>
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: 'rgba(255, 0, 0, 0.8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '25px',
                        height: '25px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {imagePreviews.length > 0 && (
              <p style={{ marginTop: '15px', color: '#1e3c72', fontSize: '0.9rem', fontWeight: '600' }}>
                ✓ {imagePreviews.length} gambar siap diupload
              </p>
            )}
          </div>

          {/* Message Input */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.1rem',
              color: '#333',
              marginBottom: '10px',
              fontWeight: '600'
            }}>
              <FaComment color="#1e3c72" /> Kata-kata Ucapan
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1rem',
                border: '2px solid #ddd',
                borderRadius: '10px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                flex: 1,
                padding: '15px',
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <FaSave /> Simpan & Tampilkan
            </motion.button>
            
            <motion.button
              type="button"
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '15px 30px',
                fontSize: '1.1rem',
                background: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Kembali
            </motion.button>
          </div>
        </form>

        {/* Shareable Link Section */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(30, 60, 114, 0.1) 0%, rgba(42, 82, 152, 0.1) 100%)',
          borderRadius: '15px',
          border: '2px solid #1e3c72'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#1e3c72',
            marginBottom: '15px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FaLink /> Shareable Link
          </h3>
          <p style={{ color: '#666', marginBottom: '15px', fontSize: '0.95rem' }}>
            Share link ini ke yang berulang tahun:
          </p>
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              value={shareableLink}
              readOnly
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '0.95rem',
                border: '2px solid #ddd',
                borderRadius: '8px',
                background: 'white',
                color: '#333'
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyLink}
              style={{
                padding: '12px 20px',
                fontSize: '1rem',
                background: linkCopied ? '#28a745' : '#1e3c72',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <FaCopy /> {linkCopied ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f0f0f0',
          borderRadius: '10px',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          💡 <strong>Tips:</strong> Musik akan otomatis diputar saat halaman birthday dibuka.
          Beberapa browser memerlukan interaksi user sebelum memutar audio.
        </div>
      </motion.div>
    </div>
  );
}
