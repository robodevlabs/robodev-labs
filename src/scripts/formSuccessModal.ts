export interface SuccessModalOptions {
  modalId: string;
  title: string;
  message: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Opens an accessible full-screen confirmation modal, traps keyboard focus,
 * locks background scroll, and supports Escape / backdrop / close actions.
 */
export function openSuccessModal({ modalId, title, message }: SuccessModalOptions): void {
  const backdrop = document.getElementById(modalId);
  if (!(backdrop instanceof HTMLElement)) return;

  const titleEl = document.getElementById(`${modalId}-title`);
  const descEl = document.getElementById(`${modalId}-desc`);
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = message;

  const previouslyFocused =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const previousOverflow = document.body.style.overflow;

  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';

  const primaryBtn = backdrop.querySelector<HTMLElement>('[data-modal-primary]');
  const closeBtn = backdrop.querySelector<HTMLElement>('[data-modal-close]');

  const getFocusable = (): HTMLElement[] =>
    Array.from(backdrop.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (el) => !el.hasAttribute('hidden') && el.offsetParent !== null
    );

  const closeModal = (): void => {
    backdrop.hidden = true;
    document.body.style.overflow = previousOverflow;
    document.removeEventListener('keydown', onKeyDown);
    backdrop.removeEventListener('click', onBackdropClick);
    primaryBtn?.removeEventListener('click', closeModal);
    closeBtn?.removeEventListener('click', closeModal);

    if (previouslyFocused && document.contains(previouslyFocused)) {
      previouslyFocused.focus();
    }
  };

  const onBackdropClick = (e: MouseEvent): void => {
    if (e.target === backdrop) {
      closeModal();
    }
  };

  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  document.addEventListener('keydown', onKeyDown);
  backdrop.addEventListener('click', onBackdropClick);
  primaryBtn?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);

  requestAnimationFrame(() => {
    (primaryBtn ?? closeBtn)?.focus();
  });
}
