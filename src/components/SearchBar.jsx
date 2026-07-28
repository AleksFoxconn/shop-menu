import { SearchIcon } from './UiIcons';
import closeIconUrl from '../assets/close.svg';
import './SearchBar.scss';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <SearchIcon size={20} className="search-bar__icon" />
      <input
        type="text"
        placeholder="Пошук"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-bar__clear" onClick={() => onChange('')} aria-label="Очистити пошук">
          <img src={closeIconUrl} alt="" width={36} height={36} />
        </button>
      )}
    </div>
  );
}
