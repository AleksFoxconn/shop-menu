const wrap = (path, viewBox = '0 0 24 24') => (props) => (
  <svg
    width={props.size || 16}
    height={props.size || 16}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    {path}
  </svg>
);

export const SearchIcon = wrap(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </>
);

export const CloseIcon = wrap(
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>
);

export const CartIcon = wrap(
  <>
    <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
    <path d="M2 3h2l2.6 12.2A2 2 0 0 0 8.6 17h9.8a2 2 0 0 0 2-1.6L22 7H6" />
  </>
);

export const PlusIcon = wrap(<path d="M12 5v14 M5 12h14" />);
export const MinusIcon = wrap(<path d="M5 12h14" />);

export const TrashIcon = wrap(
  <>
    <path d="M4 7h16 M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
  </>
);

export const CoinIcon = wrap(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10 M9.5 9.5c0-1 1-1.5 2.5-1.5s2.5.6 2.5 1.6c0 2-5 1.4-5 3.4 0 1 1 1.6 2.5 1.6s2.5-.5 2.5-1.5" />
  </>
);

export const BankIcon = wrap(
  <>
    <path d="M3 21h18 M4 21V10 M20 21V10 M12 3 3 8h18L12 3Z M8 21v-7 M12 21v-7 M16 21v-7" />
  </>
);

export const LocationIcon = wrap(
  <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
);

export const DollarIcon = wrap(
  <path d="M12 3v18 M9 8c0-1.8 1.5-3 3-3s3 1 3 2.6c0 3.4-6 2.2-6 5.6 0 1.6 1.5 2.8 3 2.8s3-1.2 3-3" />
);

export const WalletIcon = wrap(
  <>
    <path d="M3 8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
    <path d="M16 13.5h.01" strokeWidth="2.6" />
  </>
);

export const SunIcon = wrap(
  <>
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2.5v2.5 M12 19v2.5 M4.2 4.2l1.8 1.8 M18 18l1.8 1.8 M2.5 12h2.5 M19 12h2.5 M4.2 19.8l1.8-1.8 M18 6l1.8-1.8" />
  </>
);

export const MoonIcon = wrap(
  <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />
);
