import { Search } from 'lucide-react';
import Input from './Input';

// SearchBar - search input with icon.
export default function SearchBar({ value, onChange, placeholder = 'Søg...', className = '' }) {
  return <Input className={className} type="search" value={value} onChange={onChange} placeholder={placeholder} iconLeft={<Search size={18} />} />;
}
