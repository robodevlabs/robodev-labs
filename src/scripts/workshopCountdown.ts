function padTwo(n: number): string {
  return String(Math.max(0, Math.floor(n))).padStart(2, '0');
}

function parseTargetTimestamp(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed || /to be announced|tba|coming soon/i.test(trimmed)) return null;
  const ms = Date.parse(trimmed);
  return Number.isNaN(ms) ? null : ms;
}

const activeTimers = new WeakMap<HTMLElement, number>();

export function renderCountdownElement(root: HTMLElement): void {
  const prevTimer = activeTimers.get(root);
  if (prevTimer !== undefined) {
    window.clearInterval(prevTimer);
    activeTimers.delete(root);
  }

  const gridEl = root.querySelector('[data-cd-grid]') as HTMLElement | null;
  const fallbackEl = root.querySelector('[data-cd-fallback]') as HTMLElement | null;
  const daysEl = root.querySelector('[data-cd-days]');
  const hoursEl = root.querySelector('[data-cd-hours]');
  const minsEl = root.querySelector('[data-cd-mins]');
  const secsEl = root.querySelector('[data-cd-secs]');

  const targetRaw = root.getAttribute('data-target-date');
  const scheduleLabel = root.getAttribute('data-schedule-label') || 'Date to be announced';
  const status = root.getAttribute('data-workshop-status') || 'upcoming';

  const targetMs = parseTargetTimestamp(targetRaw);

  if (status === 'completed') {
    if (gridEl) gridEl.hidden = true;
    if (fallbackEl) {
      fallbackEl.hidden = false;
      fallbackEl.textContent = 'Workshop completed';
    }
    return;
  }

  if (targetMs === null) {
    if (gridEl) gridEl.hidden = true;
    if (fallbackEl) {
      fallbackEl.hidden = false;
      fallbackEl.textContent = `${scheduleLabel} · Countdown starts once scheduled`;
    }
    return;
  }

  const updateTick = (): boolean => {
    const diff = targetMs - Date.now();
    if (diff <= 0) {
      if (gridEl) gridEl.hidden = true;
      if (fallbackEl) {
        fallbackEl.hidden = false;
        fallbackEl.textContent = 'Session started';
      }
      return false;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (gridEl) gridEl.hidden = false;
    if (fallbackEl) fallbackEl.hidden = true;
    if (daysEl) daysEl.textContent = padTwo(days);
    if (hoursEl) hoursEl.textContent = padTwo(hours);
    if (minsEl) minsEl.textContent = padTwo(mins);
    if (secsEl) secsEl.textContent = padTwo(secs);
    return true;
  };

  if (!updateTick()) return;

  const timerId = window.setInterval(() => {
    const keepRunning = updateTick();
    if (!keepRunning) {
      window.clearInterval(timerId);
      activeTimers.delete(root);
    }
  }, 1000);

  activeTimers.set(root, timerId);
}

export function initWorkshopCountdowns(): void {
  document.querySelectorAll<HTMLElement>('[data-workshop-countdown]').forEach((root) => {
    renderCountdownElement(root);
  });
}

export function updateWorkshopCountdown(
  elementId: string,
  targetDate: string | null | undefined,
  scheduleLabel: string,
  status: string
): void {
  const root = document.getElementById(elementId);
  if (!root) return;
  if (targetDate) {
    root.setAttribute('data-target-date', targetDate);
  } else {
    root.removeAttribute('data-target-date');
  }
  root.setAttribute('data-schedule-label', scheduleLabel);
  root.setAttribute('data-workshop-status', status);
  renderCountdownElement(root);
}
