import { useLayoutEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { LocationIcon } from './UiIcons';
import categoryIcon0 from '../assets/categories0.svg';
import categoryIcon1 from '../assets/categories1.svg';
import categoryIcon2 from '../assets/categories2.svg';
import categoryIcon3 from '../assets/categories3.svg';
import categoryIcon4 from '../assets/categories4.svg';
import './Sidebar.scss';

const CATEGORY_ICONS = [categoryIcon0, categoryIcon1, categoryIcon2, categoryIcon3, categoryIcon4];
const CATEGORY_ICON_SIZES = [
  { width: 27.88, height: 27.88, gap: 13 },
  { width: 20.91, height: 20.91, gap: 16.5 },
  { width: 27.5, height: 34, gap: 10 },
  { width: 27.1, height: 27.1, gap: 13.5 },
  { width: 21.13, height: 21.13, gap: 16 },
];

const TRANSITION_R = 16;
const NOTCH_HEIGHT = 66;
const NOTCH_INSET = 7.25;

function buildNotchPath(width, height, pillLeft, itemTop, itemHeight) {
  const r = TRANSITION_R;
  const pillR = itemHeight / 2;
  const k = 0.5523;
  const rk = r * k;
  const pk = pillR * k;

  const topFlatY = itemTop;
  const bottomFlatY = itemTop + itemHeight;
  const notchTop = topFlatY - r;
  const notchBottom = bottomFlatY + r;
  const pillRight = pillLeft + pillR;

  return [
    `M0,0`,
    `H${width}`,
    `V${notchTop}`,
    `C${width},${notchTop + rk} ${width - r + rk},${topFlatY} ${width - r},${topFlatY}`,
    `L${pillRight},${topFlatY}`,
    `C${pillRight - pk},${topFlatY} ${pillLeft},${topFlatY + pk} ${pillLeft},${topFlatY + pillR}`,
    `C${pillLeft},${bottomFlatY - pk} ${pillRight - pk},${bottomFlatY} ${pillRight},${bottomFlatY}`,
    `L${width - r},${bottomFlatY}`,
    `C${width - r + rk},${bottomFlatY} ${width},${notchBottom - rk} ${width},${notchBottom}`,
    `V${height}`,
    `H0`,
    `Z`,
  ].join(' ');
}

function buildMaskUrl(width, height, path) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><path d="${path}" fill="white"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const NOTCH_ANIMATION_MS = 300;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function Sidebar({ activeCategory, onSelectCategory, shopName, shopAddress, shopNumber }) {
  const sidebarRef = useRef(null);
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [maskUrl, setMaskUrl] = useState('');
  const displayedTopRef = useRef(null);
  const animationFrameRef = useRef(null);

  useLayoutEffect(() => {
    const sidebarEl = sidebarRef.current;
    const navEl = navRef.current;
    const activeEl = itemRefs.current[activeCategory];
    if (!sidebarEl || !navEl || !activeEl) return;

    const measure = () => {
      const width = sidebarEl.offsetWidth;
      const height = sidebarEl.offsetHeight;

      const sidebarRect = sidebarEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();

      const scale = width / sidebarRect.width;
      const itemCenter = (itemRect.top + itemRect.height / 2 - sidebarRect.top) * scale;

      return {
        width,
        height,
        pillLeft: (navRect.left - sidebarRect.left) * scale - NOTCH_INSET,
        itemTop: itemCenter - NOTCH_HEIGHT / 2,
        itemHeight: NOTCH_HEIGHT,
      };
    };

    const renderMask = (top, { width, height, pillLeft, itemHeight }) => {
      const path = buildNotchPath(width, height, pillLeft, top, itemHeight);
      setMaskUrl(buildMaskUrl(width, height, path));
    };

    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    const target = measure();

    if (displayedTopRef.current === null) {
      displayedTopRef.current = target.itemTop;
      renderMask(target.itemTop, target);
    } else {
      const startTop = displayedTopRef.current;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - startTime) / NOTCH_ANIMATION_MS);
        const eased = easeOutCubic(progress);
        const currentTop = startTop + (target.itemTop - startTop) * eased;
        displayedTopRef.current = currentTop;
        renderMask(currentTop, target);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(tick);
        }
      };

      animationFrameRef.current = requestAnimationFrame(tick);
    }

    const handleResize = () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      const resized = measure();
      displayedTopRef.current = resized.itemTop;
      renderMask(resized.itemTop, resized);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [activeCategory]);

  return (
    <aside className="sidebar" ref={sidebarRef}>
      <div className="sidebar__highlight" />
      <div
        className="sidebar__panel-mask"
        style={{ WebkitMaskImage: maskUrl, maskImage: maskUrl }}
      />

      <div className="sidebar__shop-row">
        <div className="sidebar__shop-name">
          <h2>{shopName}</h2>
          <p className="sidebar__address">
            <LocationIcon size={14} />
            {shopAddress}
          </p>
        </div>
        <span className="sidebar__badge">#{shopNumber}</span>
      </div>

      <p className="sidebar__label">Категорії товарів:</p>
      <nav className="sidebar__nav" ref={navRef}>
        {CATEGORIES.map((cat, index) => (
          <button
            key={cat.id}
            ref={(el) => {
              itemRefs.current[cat.id] = el;
            }}
            className={`sidebar__item ${activeCategory === cat.id ? 'is-active' : ''}`}
            style={{ gap: `${CATEGORY_ICON_SIZES[index].gap}px` }}
            onClick={() => onSelectCategory(cat.id)}
          >
            <span className="sidebar__item-icon">
              <img
                src={CATEGORY_ICONS[index]}
                alt=""
                width={CATEGORY_ICON_SIZES[index].width}
                height={CATEGORY_ICON_SIZES[index].height}
              />
            </span>
            <span>{cat.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
