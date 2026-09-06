import React from 'react';

const Pagination = ({ total, page, limit, totalPages, onPageChange }) => {
  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
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
        Showing <span className="font-bold text-[var(--text-primary)]">{(page - 1) * limit + 1}</span> to{' '}
        <span className="font-bold text-[var(--text-primary)]">{Math.min(page * limit, total)}</span> of{' '}
        <span className="font-bold text-[var(--text-primary)]">{total}</span> employees
      </p>
      
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--card-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        
        {getPages().map((p, i) => (
          p === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-[var(--text-secondary)]">...</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                page === p
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--card-hover)]'
              }`}
            >
              {p}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--card-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
