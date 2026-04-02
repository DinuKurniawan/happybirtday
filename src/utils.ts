export interface BirthdayData {
  name: string;
  date: string;
  message: string;
  musicUrl: string;
  musicLink: string;
  images: string[];
}

const STORAGE_KEY = 'birthday_data';

interface SharePayload {
  name: string;
  date: string;
  message: string;
  musicLink: string;
}

export const loadBirthdayData = (): BirthdayData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return {
    name: 'Sahabatku',
    date: new Date().toISOString().split('T')[0],
    message: 'Selamat ulang tahun! Semoga panjang umur, sehat selalu, dan semua impianmu terwujud! 🎂🎉',
    musicUrl: '',
    musicLink: '',
    images: []
  };
};

export const saveBirthdayData = (data: BirthdayData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const createShareLink = (baseUrl: string, data: BirthdayData): string => {
  const payload: SharePayload = {
    name: data.name,
    date: data.date,
    message: data.message,
    musicLink: data.musicLink,
  };

  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  return `${baseUrl}?data=${encodeURIComponent(encoded)}`;
};

export const parseShareData = (encodedData: string): Partial<BirthdayData> | null => {
  try {
    const decoded = decodeURIComponent(encodedData);
    const json = decodeURIComponent(escape(atob(decoded)));
    const parsed = JSON.parse(json) as Partial<SharePayload>;

    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    return {
      name: parsed.name ?? 'Sahabatku',
      date: parsed.date ?? new Date().toISOString().split('T')[0],
      message:
        parsed.message ??
        'Selamat ulang tahun! Semoga panjang umur, sehat selalu, dan semua impianmu terwujud! 🎂🎉',
      musicLink: parsed.musicLink ?? '',
      musicUrl: '',
      images: [],
    };
  } catch {
    return null;
  }
};
