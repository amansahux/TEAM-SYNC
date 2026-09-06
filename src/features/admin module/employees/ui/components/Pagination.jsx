import { ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

const Pagination = ({ total, page, limit, totalPages, onPageChange }) => {
  const getPages = () => {
    const p = Number(page);
    const tp = Number(totalPages);
    let pages = [];
    for (let i = 1; i <= tp; i++) {
      if (i === 1 || i === tp || (i >= p - 1 && i <= p + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div className="p-6 border-t border-[var(--border)] bg-[var(--card)] flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-sm text-[var(--text-secondary)]">
        Showing <span className="font-bold text-[var(--text-primary)]">{total === 0 ? 0 : (Number(page) - 1) * Number(limit) + 1}</span> to{' '}
        <span className="font-bold text-[var(--text-primary)]">{Math.min(Number(page) * Number(limit), total)}</span> of{' '}
        <span className="font-bold text-[var(--text-primary)]">{total}</span> employees
      </p>
      
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Number(page) - 1)}
          disabled={Number(page) === 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--card-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
         <ChevronLeft/>
        </button>
        
        {getPages().map((p, i) => (
          p === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-[var(--text-secondary)]">...</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                Number(page) === p
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--card-hover)]'
              }`}
            >
              {p}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(Number(page) + 1)}
          disabled={Number(page) === Number(totalPages)}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--card-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight/>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
