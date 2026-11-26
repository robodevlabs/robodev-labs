import { supabase } from '../db/supabase';
import { updateWorkshopCountdown } from './workshopCountdown';

export interface WorkshopSummary {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  tagline?: string;
  level: string;
  format: string;
  duration: string;
  date?: string;
  startsAt?: string;
  price: string;
  isFree: boolean;
  status: 'upcoming' | 'open' | 'completed';
  isOpen: boolean;
  isComingSoon: boolean;
  hasCertificate?: boolean;
  instructor?: string;
  language?: string;
  hasPaymentUrl?: boolean;
}

type StatusVariant = 'info' | 'success' | 'warning' | 'error';

function getTrimmedValue(id: string): string {
  const el = document.getElementById(id);
  if (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement
  ) {
    return el.value.trim();
  }
  return '';
}

function normalizeOptional(id: string): string | null {
  const trimmed = getTrimmedValue(id);
  return trimmed.length > 0 ? trimmed : null;
}

function setFieldError(inputId: string, errorId: string, invalid: boolean): boolean {
  const input = document.getElementById(inputId);
  const err = document.getElementById(errorId);
  if (input) {
    input.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    input.classList.toggle('is-invalid', invalid);
  }
  if (err) {
    err.hidden = !invalid;
  }
  return !invalid;
}

function setText(id: string, value: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function parseWorkshopsCatalog(): WorkshopSummary[] {
  const dataEl = document.getElementById('academy-workshops-data');
  if (!dataEl?.textContent) return [];
  try {
    const parsed = JSON.parse(dataEl.textContent);
    return Array.isArray(parsed) ? (parsed as WorkshopSummary[]) : [];
  } catch {
    return [];
  }
}

function getAvailabilityLabel(workshop: WorkshopSummary): string {
  if (workshop.status === 'completed') return 'Completed';
  if (workshop.isComingSoon) return 'Coming Soon';
  if (workshop.isOpen) return 'Registration Open';
  return 'Unavailable';
}

function isValidInternationalPhone(raw: string): boolean {
  if (raw.length < 6 || raw.length > 40) return false;
  if (!/^[+0-9()\s.-]{6,40}$/.test(raw)) return false;
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 6 && digits.length <= 15;
}

/**
 * Initializes URL workshop resolution, dynamic summary updates, validation,
 * and direct browser-to-Supabase submission for /academy/register.
 */
export function initWorkshopRegistrationForm(): void {
  const workshops = parseWorkshopsCatalog();
  const openWorkshops = workshops.filter((w) => w.isOpen);

  const formEl = document.getElementById('workshop-register-form');
  const selectEl = document.getElementById('wr-workshop');
  const statusEl = document.getElementById('wr-status');
  const submitBtnEl = document.getElementById('wr-submit-btn');
  const submitTextEl = document.getElementById('wr-submit-text');
  const honeypotEl = document.getElementById('wr-hp');
  const noticeBannerEl = document.getElementById('wr-availability-banner');
  const noticeBannerTextEl = document.getElementById('wr-availability-text');

  if (
    !(formEl instanceof HTMLFormElement) ||
    !(selectEl instanceof HTMLSelectElement) ||
    !(statusEl instanceof HTMLElement)
  ) {
    return;
  }

  const form = formEl;
  const workshopSelect = selectEl;
  const status = statusEl;
  const submitBtn = submitBtnEl instanceof HTMLButtonElement ? submitBtnEl : null;
  const honeypot = honeypotEl instanceof HTMLInputElement ? honeypotEl : null;
  const inbox = form.getAttribute('data-inbox') || 'robodevlabs.team@gmail.com';

  const STATUS_ICONS: Record<StatusVariant, string> = {
    info: '↻',
    success: '✓',
    warning: '!',
    error: '✕',
  };

  const setStatus = (variant: StatusVariant, title: string, populate: (body: HTMLElement) => void): void => {
    status.replaceChildren();
    status.hidden = false;
    status.className = `wr-status wr-status--${variant}`;
    status.setAttribute('data-icon', STATUS_ICONS[variant]);

    const content = document.createElement('div');

    const titleEl = document.createElement('span');
    titleEl.className = 'wr-status-title';
    titleEl.textContent = title;
    content.appendChild(titleEl);

    const bodyEl = document.createElement('span');
    bodyEl.className = 'wr-status-body';
    populate(bodyEl);
    content.appendChild(bodyEl);

    status.appendChild(content);
  };

  const clearStatus = (): void => {
    status.replaceChildren();
    status.hidden = true;
    status.className = 'wr-status';
    status.removeAttribute('data-icon');
  };

  const setBanner = (
    variant: 'unavailable' | 'paid-note' | null,
    message = ''
  ): void => {
    if (!noticeBannerEl || !noticeBannerTextEl) return;
    if (!variant) {
      noticeBannerEl.hidden = true;
      noticeBannerEl.className = 'wr-banner';
      noticeBannerTextEl.textContent = '';
      return;
    }
    noticeBannerEl.hidden = false;
    noticeBannerEl.className = `wr-banner wr-banner--${variant}`;
    noticeBannerTextEl.textContent = message;
  };

  const setFormEnabled = (enabled: boolean): void => {
    const controls = form.querySelectorAll('input, textarea, button[type="submit"]');
    controls.forEach((ctrl) => {
      if (ctrl instanceof HTMLInputElement || ctrl instanceof HTMLTextAreaElement) {
        if (ctrl.id !== 'wr-hp') {
          ctrl.disabled = !enabled;
        }
      } else if (ctrl instanceof HTMLButtonElement) {
        ctrl.disabled = !enabled;
      }
    });
  };

  const renderWorkshopDetails = (workshop: WorkshopSummary | null, missingSlug?: string): void => {
    if (!workshop) {
      setText('wr-hero-title', 'Workshop Unavailable');
      setText(
        'wr-hero-desc',
        missingSlug
          ? `We could not find an active workshop matching "${missingSlug}".`
          : 'No workshops are currently open for registration.'
      );
      setText('wr-hero-price-pill', 'Unavailable');
      setText('wr-hero-status-pill', 'Unavailable');
      setText('wr-hero-duration-pill', '—');
      setText('wr-hero-format-pill', 'RoboDev Academy');

      setText('wr-detail-tuition', '—');
      setText('wr-detail-status', 'Unavailable');
      setText('wr-detail-date', '—');
      setText('wr-detail-duration', '—');
      setText('wr-detail-format', '—');
      setText('wr-detail-level', '—');
      setText('wr-detail-language', '—');
      setText('wr-detail-cert', '—');

      const syllabusLink = document.getElementById('wr-syllabus-link');
      if (syllabusLink instanceof HTMLAnchorElement) {
        syllabusLink.href = '/academy#workshops';
        syllabusLink.textContent = 'Browse all workshops';
      }

      updateWorkshopCountdown('wr-countdown', null, 'Date to be announced', 'upcoming');

      if (openWorkshops.length > 0) {
        setBanner(
          'unavailable',
          missingSlug
            ? `The requested workshop ("${missingSlug}") is unavailable. Please choose an open workshop below.`
            : 'Please select an open workshop below to register.'
        );
      } else {
        setBanner(
          'unavailable',
          'No workshops are currently open for registration. Please check back soon or email us for updates.'
        );
      }
      setFormEnabled(false);
      return;
    }

    const availability = getAvailabilityLabel(workshop);
    const tuitionText = workshop.isFree ? 'Free' : workshop.price;

    setText('wr-hero-title', workshop.title);
    setText('wr-hero-desc', workshop.tagline ?? workshop.description);
    setText('wr-hero-price-pill', tuitionText);
    setText('wr-hero-status-pill', availability);
    setText('wr-hero-duration-pill', workshop.duration);
    setText('wr-hero-format-pill', workshop.format);

    setText('wr-detail-tuition', tuitionText);
    setText('wr-detail-status', availability);
    setText('wr-detail-date', workshop.date ?? 'Date to be announced');
    setText('wr-detail-duration', workshop.duration);
    setText('wr-detail-format', workshop.format);
    setText('wr-detail-level', workshop.level);
    setText('wr-detail-language', workshop.language ?? 'English');
    setText(
      'wr-detail-cert',
      workshop.hasCertificate ? 'Free certificate included' : 'Not specified'
    );

    const syllabusLink = document.getElementById('wr-syllabus-link');
    if (syllabusLink instanceof HTMLAnchorElement) {
      syllabusLink.href = `/academy/courses/${workshop.slug}`;
      syllabusLink.textContent = 'View full syllabus & details';
    }

    updateWorkshopCountdown(
      'wr-countdown',
      workshop.startsAt ?? workshop.date,
      workshop.date ?? 'Date to be announced',
      workshop.status
    );

    if (!workshop.isOpen) {
      const reason =
        workshop.status === 'completed'
          ? 'This workshop has already been completed and is closed for registration.'
          : 'Registration is not open yet for this workshop (Coming Soon).';
      const switchHint =
        openWorkshops.length > 0 ? ' You can select an open workshop above to register.' : '';
      setBanner('unavailable', `${reason}${switchHint}`);
      setFormEnabled(false);
      return;
    }

    if (!workshop.isFree && !workshop.hasPaymentUrl) {
      setBanner(
        'paid-note',
        'Paid workshop: submitting this form records your registration request. Payment and confirmation instructions will be sent to your email.'
      );
    } else {
      setBanner(null);
    }

    setFormEnabled(true);
  };

  // Resolve initial workshop from URL query parameter (?workshop=<slug>)
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get('workshop')?.trim() || '';

  if (requestedSlug) {
    const matched = workshops.find((w) => w.slug === requestedSlug) ?? null;
    if (!matched) {
      workshopSelect.value = '';
      renderWorkshopDetails(null, requestedSlug);
    } else if (!matched.isOpen) {
      workshopSelect.value = '';
      renderWorkshopDetails(matched);
    } else {
      workshopSelect.value = matched.slug;
      renderWorkshopDetails(matched);
    }
  } else if (openWorkshops.length > 0) {
    workshopSelect.value = openWorkshops[0].slug;
    renderWorkshopDetails(openWorkshops[0]);
  } else {
    workshopSelect.value = '';
    renderWorkshopDetails(null);
  }

  workshopSelect.addEventListener('change', () => {
    clearStatus();
    const slug = workshopSelect.value.trim();
    const selected = workshops.find((w) => w.slug === slug) ?? null;
    renderWorkshopDetails(selected);

    const url = new URL(window.location.href);
    if (selected) {
      url.searchParams.set('workshop', selected.slug);
    } else {
      url.searchParams.delete('workshop');
    }
    window.history.replaceState(null, '', url.toString());
  });

  const showSubmissionError = (): void => {
    setStatus('error', 'Registration not saved', (el) => {
      el.appendChild(
        document.createTextNode(
          'We could not save your registration right now. Your details are still in the form — please try again, or email us at '
        )
      );
      const mLink = document.createElement('a');
      mLink.href = `mailto:${inbox}?subject=${encodeURIComponent('RoboDev Academy Workshop Registration')}`;
      mLink.className = 'wr-status__link';
      mLink.textContent = inbox;
      el.appendChild(mLink);
      el.appendChild(document.createTextNode('.'));
    });
  };

  let isSubmitting = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Lightweight honeypot check
    if (honeypot && honeypot.value.trim() !== '') {
      form.reset();
      setStatus('success', 'Registration received', (el) => {
        el.textContent = 'Thank you. Your registration has been received.';
      });
      return;
    }

    const selectedSlug = workshopSelect.value.trim();
    const selectedWorkshop = openWorkshops.find((w) => w.slug === selectedSlug) ?? null;

    const fullName = getTrimmedValue('wr-name');
    const email = getTrimmedValue('wr-email');
    const phone = getTrimmedValue('wr-phone');
    const institution = normalizeOptional('wr-institution');
    const role = normalizeOptional('wr-role');
    const additionalNotes = normalizeOptional('wr-notes');

    const emailOk =
      email.length >= 3 &&
      email.length <= 254 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const checks = [
      setFieldError('wr-workshop', 'wr-workshop-error', !selectedWorkshop),
      setFieldError('wr-name', 'wr-name-error', fullName.length < 1 || fullName.length > 120),
      setFieldError('wr-email', 'wr-email-error', !emailOk),
      setFieldError('wr-phone', 'wr-phone-error', !isValidInternationalPhone(phone)),
      setFieldError(
        'wr-institution',
        'wr-institution-error',
        institution !== null && institution.length > 160
      ),
      setFieldError('wr-role', 'wr-role-error', role !== null && role.length > 120),
      setFieldError(
        'wr-notes',
        'wr-notes-error',
        additionalNotes !== null && additionalNotes.length > 2000
      ),
    ];

    if (checks.includes(false) || !selectedWorkshop) {
      const firstBad = form.querySelector('.is-invalid');
      if (firstBad instanceof HTMLElement) firstBad.focus();
      setStatus('error', 'Check your details', (el) => {
        el.textContent = selectedWorkshop
          ? 'Please review the highlighted fields before submitting.'
          : 'Please select an available workshop to register.';
      });
      return;
    }

    if (!supabase) {
      console.error('Supabase client is not configured for workshop registrations.');
      showSubmissionError();
      return;
    }

    // Strict allowlisted payload matching public.workshop_registrations insertable columns
    const payload = {
      workshop_slug: selectedWorkshop.slug,
      workshop_title: selectedWorkshop.title,
      full_name: fullName,
      email,
      phone,
      institution,
      role,
      additional_notes: additionalNotes,
    };

    isSubmitting = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
    }
    if (submitTextEl) submitTextEl.textContent = 'Submitting registration...';
    setStatus('info', 'Submitting…', (el) => {
      el.textContent = 'Sending your registration to RoboDev Academy.';
    });

    try {
      const { error } = await supabase.from('workshop_registrations').insert(payload);

      if (error) {
        // 23505 = unique_violation (same email already registered for this workshop)
        if (error.code === '23505') {
          setStatus('warning', 'Already registered', (el) => {
            el.appendChild(
              document.createTextNode(
                `This email address is already registered for ${selectedWorkshop.title}. Need to update your details? Email us at `
              )
            );
            const mLink = document.createElement('a');
            mLink.href = `mailto:${inbox}?subject=${encodeURIComponent(`Registration update: ${selectedWorkshop.title}`)}`;
            mLink.className = 'wr-status__link';
            mLink.textContent = inbox;
            el.appendChild(mLink);
            el.appendChild(document.createTextNode('.'));
          });
          return;
        }

        console.error('Workshop registration insert failed:', {
          code: error.code ?? 'unknown',
          hint: error.hint ?? null,
        });
        showSubmissionError();
        return;
      }

      setStatus('success', 'Registration received', (el) => {
        el.textContent = selectedWorkshop.isFree
          ? `We have recorded your registration for ${selectedWorkshop.title}. Session details will be sent to ${email}.`
          : `We have recorded your registration request for ${selectedWorkshop.title}. Payment and confirmation instructions will be sent to ${email}.`;
      });

      // Reset form fields while preserving the selected workshop context
      const activeSlug = selectedWorkshop.slug;
      form.reset();
      workshopSelect.value = activeSlug;
      form.querySelectorAll('.is-invalid').forEach((node) => {
        node.classList.remove('is-invalid');
        node.removeAttribute('aria-invalid');
      });
      form.querySelectorAll('.form-error').forEach((errEl) => {
        if (errEl instanceof HTMLElement) errEl.hidden = true;
      });
    } catch (err) {
      console.error(
        'Unexpected workshop registration failure.',
        err instanceof Error ? err.name : 'UnknownError'
      );
      showSubmissionError();
    } finally {
      isSubmitting = false;
      if (submitBtn) {
        submitBtn.disabled = !selectedWorkshop.isOpen;
        submitBtn.removeAttribute('aria-busy');
      }
      if (submitTextEl) submitTextEl.textContent = 'Submit registration';
    }
  });

  /* Clear field errors on input */
  form.querySelectorAll('input, select, textarea').forEach((el) => {
    el.addEventListener('input', () => {
      el.classList.remove('is-invalid');
      el.removeAttribute('aria-invalid');
      const err = el.parentElement?.querySelector('.form-error');
      if (err instanceof HTMLElement) err.hidden = true;
    });
  });
}
