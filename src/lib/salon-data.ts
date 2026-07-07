import gelishImg from "@/assets/service-gelish.jpg";
import acrilicasImg from "@/assets/service-acrilicas.jpg";
import esculturalesImg from "@/assets/service-esculturales.jpg";
import nailartImg from "@/assets/service-nailart.jpg";
import pedicureImg from "@/assets/service-pedicure.jpg";
import manicureImg from "@/assets/service-manicure.jpg";

import galleryBB from "@/assets/gallery-babyboomer.jpg";
import galleryFrench from "@/assets/gallery-french.jpg";
import galleryChrome from "@/assets/gallery-chrome.jpg";
import galleryCatEye from "@/assets/gallery-cateye.jpg";
import gallery3D from "@/assets/gallery-3d.jpg";
import galleryNailArt from "@/assets/service-nailart.jpg";

import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";

export type Service = {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number; // MXN
  image: string;
  tag?: string;
};

export const SERVICES: Service[] = [
  {
    id: "gelish",
    name: "Gelish",
    description: "Esmaltado semipermanente de larga duración con acabado espejo.",
    duration: 60,
    price: 450,
    image: gelishImg,
    tag: "Más popular",
  },
  {
    id: "acrilicas",
    name: "Acrílicas",
    description: "Extensiones acrílicas moldeadas a mano, resistentes y ligeras.",
    duration: 120,
    price: 850,
    image: acrilicasImg,
  },
  {
    id: "esculturales",
    name: "Esculturales",
    description: "Uñas esculpidas 100% a medida, forma libre y arquitectura premium.",
    duration: 150,
    price: 1200,
    image: esculturalesImg,
    tag: "Premium",
  },
  {
    id: "nailart",
    name: "Nail Art",
    description: "Diseños personalizados: florales, gold foil, 3D y colecciones de temporada.",
    duration: 90,
    price: 650,
    image: nailartImg,
  },
  {
    id: "pedicure",
    name: "Pedicure Spa",
    description: "Ritual completo con exfoliación, masaje aromático y esmaltado.",
    duration: 75,
    price: 550,
    image: pedicureImg,
  },
  {
    id: "manicure",
    name: "Manicure Clásico",
    description: "Cuidado esencial de cutícula, forma y esmaltado tradicional.",
    duration: 45,
    price: 320,
    image: manicureImg,
  },
];

export type Specialist = {
  id: string;
  name: string;
  specialty: string;
  years: number;
  rating: number;
  photo: string;
};

export const SPECIALISTS: Specialist[] = [
  {
    id: "sofia",
    name: "Sofía Herrera",
    specialty: "Nail Art & Esculturales",
    years: 9,
    rating: 5.0,
    photo: team1,
  },
  {
    id: "camila",
    name: "Camila Ríos",
    specialty: "Gelish & Baby Boomer",
    years: 6,
    rating: 4.9,
    photo: team2,
  },
  {
    id: "valentina",
    name: "Valentina López",
    specialty: "Pedicure Spa & Manicure",
    years: 8,
    rating: 4.9,
    photo: team3,
  },
  {
    id: "regina",
    name: "Regina Marín",
    specialty: "Directora & Novias",
    years: 12,
    rating: 5.0,
    photo: team4,
  },
];

export type GalleryItem = {
  id: string;
  category: "Baby Boomer" | "French" | "Chrome" | "Cat Eye" | "3D" | "Nail Art";
  image: string;
};

export const GALLERY: GalleryItem[] = [
  { id: "g1", category: "Baby Boomer", image: galleryBB },
  { id: "g2", category: "French", image: galleryFrench },
  { id: "g3", category: "Chrome", image: galleryChrome },
  { id: "g4", category: "Cat Eye", image: galleryCatEye },
  { id: "g5", category: "3D", image: gallery3D },
  { id: "g6", category: "Nail Art", image: galleryNailArt },
];

export const GALLERY_CATEGORIES = [
  "Todos",
  "Baby Boomer",
  "French",
  "Chrome",
  "Cat Eye",
  "3D",
  "Nail Art",
] as const;

export type Review = {
  id: string;
  name: string;
  handle: string;
  rating: number;
  text: string;
  avatar: string;
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Ana Paula G.",
    handle: "Cliente desde 2022",
    rating: 5,
    text: "El mejor salón al que he ido. El detalle en cada uña es impresionante y el ambiente se siente como un spa de lujo.",
    avatar: team3,
  },
  {
    id: "r2",
    name: "María F. Torres",
    handle: "Boda 2024",
    rating: 5,
    text: "Regina me hizo las uñas para mi boda y quedaron de ensueño. Elegantes, delicadas y duraron perfectas todo el viaje.",
    avatar: team4,
  },
  {
    id: "r3",
    name: "Isabella R.",
    handle: "Cliente frecuente",
    rating: 5,
    text: "Sofía es una artista. Cada visita salgo con un diseño único y siempre me sorprende con detalles nuevos.",
    avatar: team1,
  },
];

/* ---------- Admin mock data ---------- */

export type AppointmentStatus = "confirmed" | "pending" | "canceled";

export type Appointment = {
  id: string;
  clientName: string;
  serviceName: string;
  specialistName: string;
  time: string; // HH:mm
  date: string; // yyyy-mm-dd
  status: AppointmentStatus;
  price: number;
};

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return iso(d);
};

export const APPOINTMENTS: Appointment[] = [
  { id: "a1", clientName: "Ana Paula García", serviceName: "Gelish", specialistName: "Camila Ríos", time: "10:00", date: iso(today), status: "confirmed", price: 450 },
  { id: "a2", clientName: "Regina Salinas", serviceName: "Esculturales", specialistName: "Sofía Herrera", time: "11:30", date: iso(today), status: "confirmed", price: 1200 },
  { id: "a3", clientName: "María F. Torres", serviceName: "Nail Art", specialistName: "Sofía Herrera", time: "13:00", date: iso(today), status: "pending", price: 650 },
  { id: "a4", clientName: "Valeria Ochoa", serviceName: "Pedicure Spa", specialistName: "Valentina López", time: "15:00", date: iso(today), status: "confirmed", price: 550 },
  { id: "a5", clientName: "Isabella Reyes", serviceName: "Manicure Clásico", specialistName: "Valentina López", time: "17:30", date: iso(today), status: "canceled", price: 320 },
  { id: "a6", clientName: "Daniela Ruiz", serviceName: "Acrílicas", specialistName: "Camila Ríos", time: "10:00", date: addDays(1), status: "confirmed", price: 850 },
  { id: "a7", clientName: "Fernanda Vega", serviceName: "Gelish", specialistName: "Regina Marín", time: "12:30", date: addDays(1), status: "pending", price: 450 },
  { id: "a8", clientName: "Camila Prieto", serviceName: "Nail Art", specialistName: "Sofía Herrera", time: "16:00", date: addDays(2), status: "confirmed", price: 650 },
];

export const CLIENTS = [
  { id: "c1", name: "Ana Paula García", phone: "+52 55 1234 5678", visits: 24, lastVisit: "hace 3 días", spent: 12400, tier: "VIP" as const },
  { id: "c2", name: "Regina Salinas", phone: "+52 55 2345 6789", visits: 18, lastVisit: "hace 1 semana", spent: 21600, tier: "VIP" as const },
  { id: "c3", name: "María F. Torres", phone: "+52 55 3456 7890", visits: 12, lastVisit: "hace 2 semanas", spent: 8900, tier: "Frecuente" as const },
  { id: "c4", name: "Valeria Ochoa", phone: "+52 55 4567 8901", visits: 8, lastVisit: "ayer", spent: 5300, tier: "Frecuente" as const },
  { id: "c5", name: "Isabella Reyes", phone: "+52 55 5678 9012", visits: 3, lastVisit: "hace 1 mes", spent: 1800, tier: "Nueva" as const },
  { id: "c6", name: "Daniela Ruiz", phone: "+52 55 6789 0123", visits: 15, lastVisit: "mañana", spent: 11200, tier: "VIP" as const },
];

export const WEEKLY_STATS = [
  { day: "Lun", citas: 12, ingresos: 6800 },
  { day: "Mar", citas: 15, ingresos: 8900 },
  { day: "Mié", citas: 18, ingresos: 11200 },
  { day: "Jue", citas: 14, ingresos: 7600 },
  { day: "Vie", citas: 22, ingresos: 14800 },
  { day: "Sáb", citas: 28, ingresos: 19400 },
  { day: "Dom", citas: 9, ingresos: 5100 },
];

export const TOP_SERVICES = [
  { name: "Gelish", value: 38 },
  { name: "Nail Art", value: 24 },
  { name: "Esculturales", value: 18 },
  { name: "Pedicure", value: 12 },
  { name: "Acrílicas", value: 8 },
];

export const AVAILABLE_HOURS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00",
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

/* WhatsApp production number */
export const WHATSAPP_NUMBER = "527712133544";
export const SALON_NAME = "Maison Marín";
