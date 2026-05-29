import React from 'react';
import { 
  FileText, 
  ShoppingBag, 
  Wrench, 
  Activity, 
  Layers, 
  Eye, 
  Sparkles, 
  Video, 
  Network, 
  Heart,
  Globe,
  Cpu,
  ShieldAlert,
  Award,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Lock,
  Edit2,
  Plus,
  Trash2,
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  User,
  Building,
  Check,
  Search,
  Settings,
  X,
  Menu,
  ChevronDown
} from 'lucide-react';

const icons: Record<string, React.ComponentType<any>> = {
  FileText,
  ShoppingBag,
  Wrench,
  Activity,
  Layers,
  Eye,
  Sparkles,
  Video,
  Network,
  Heart,
  Globe,
  Cpu,
  ShieldAlert,
  Award,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Lock,
  Edit2,
  Plus,
  Trash2,
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  User,
  Building,
  Check,
  Search,
  Settings,
  X,
  Menu,
  ChevronDown
};

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = '', size = 20 }: LucideIconProps) {
  const IconComponent = icons[name] || HelpCircle;
  return <IconComponent className={className} size={size} />;
}
