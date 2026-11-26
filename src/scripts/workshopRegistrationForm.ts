import { supabase } from '../db/supabase';
import { openSuccessModal } from './formSuccessModal';

export interface WorkshopSummary {
  slug: string;
  title: string;
  shortTitle?: string;
  tagline?: string;
  description: string;
  format: string;
  duration: string;
  date?: string;
  price: string;
  isFree: boolean;
  status: 'upcoming' | 'open' | 'completed';
  isOpen: boolean;
  isComingSoon: boolean;
  hasPaymentUrl?: boolean;
}

type StatusVariant = 'warning' | 'error';

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

function isValidEmail(email: string): boolean {
  return email.length >= 3 && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidInternationalPhone(raw: string): boolean {
  if (raw.length < 6 || raw.length > 40) return false;
  if (!/^[+0-9()\s.-]{6,40}$/.test(raw)) return false;
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 6 && digits.length <= 15;
}

/**
 * Initializes URL workshop resolution, real-time field validation,
 * submit button gating, Supabase insertion, and accessible success modal.
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

  let isSubmitting = false;

  const setStatus = (
    variant: StatusVariant,
    title: string,
    populate: (body: HTMLElement) => void
  ): void => {
    status.replaceChildren();
    status.hidden = false;
    status.className = `wr-status wr-status--${variant}`;

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
  };

  const setBanner = (variant: 'unavailable' | 'paid-note' | null, message = ''): void => {
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

  const getSelectedOpenWorkshop = (): WorkshopSummary | null => {
    const slug = workshopSelect.value.trim();
    return openWorkshops.find((w) => w.slug === slug) ?? null;
  };

  const isFormReady = (): boolean => {
    if (isSubmitting) return false;
    const workshop = getSelectedOpenWorkshop();
    if (!workshop) return false;

    const fullName = getTrimmedValue('wr-name');
    const email = getTrimmedValue('wr-email');
    const phone = getTrimmedValue('wr-phone');
    const institution = normalizeOptional('wr-institution');
    const role = normalizeOptional('wr-role');
    const notes = normalizeOptional('wr-notes');

    return (
      fullName.length >= 1 &&
      fullName.length <= 120 &&
      isValidEmail(email) &&
      isValidInternationalPhone(phone) &&
      (institution === null || institution.length <= 160) &&
      (role === null || role.length <= 120) &&
      (notes === null || notes.length <= 2000)
    );
  };

  const syncSubmitState = (): void => {
    if (!submitBtn) return;
    const ready = isFormReady();
    submitBtn.disabled = !ready;
    submitBtn.classList.toggle('is-disabled', !ready);
    submitBtn.setAttribute('aria-disabled', ready ? 'false' : 'true');
  };

  const setFormEnabled = (enabled: boolean): void => {
    const controls = form.querySelectorAll('input, textarea');
    controls.forEach((ctrl) => {
      if (ctrl instanceof HTMLInputElement || ctrl instanceof HTMLTextAreaElement) {
        if (ctrl.id !== 'wr-hp') {
          ctrl.disabled = !enabled;
        }
      }
    });
    syncSubmitState();
  };

  const validateSingleField = (fieldId: string): boolean => {
    switch (fieldId) {
      case 'wr-workshop':
        return setFieldError('wr-workshop', 'wr-workshop-error', !getSelectedOpenWorkshop());
      case 'wr-name': {
        const val = getTrimmedValue('wr-name');
        return setFieldError('wr-name', 'wr-name-error', val.length < 1 || val.length > 120);
      }
      case 'wr-email':
        return setFieldError('wr-email', 'wr-email-error', !isValidEmail(getTrimmedValue('wr-email')));
      case 'wr-phone':
        return setFieldError(
          'wr-phone',
          'wr-phone-error',
          !isValidInternationalPhone(getTrimmedValue('wr-phone'))
        );
      case 'wr-institution': {
        const val = normalizeOptional('wr-institution');
        return setFieldError(
          'wr-institution',
          'wr-institution-error',
          val !== null && val.length > 160
        );
      }
      case 'wr-role': {
        const val = normalizeOptional('wr-role');
        return setFieldError('wr-role', 'wr-role-error', val !== null && val.length > 120);
      }
      case 'wr-notes': {
        const val = normalizeOptional('wr-notes');
        return setFieldError('wr-notes', 'wr-notes-error', val !== null && val.length > 2000);
      }
      default:
        return true;
    }
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
      setText('wr-detail-tuition', '—');
      setText('wr-detail-status', 'Unavailable');
      setText('wr-detail-date', '—');
      setText('wr-detail-format', '—');

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
    const formatText = [workshop.format, workshop.duration].filter(Boolean).join(' · ');

    setText('wr-hero-title', workshop.title);
    setText('wr-hero-desc', workshop.tagline ?? workshop.description);
    setText('wr-detail-tuition', tuitionText);
    setText('wr-detail-status', availability);
    setText('wr-detail-date', workshop.date ?? 'Date to be announced');
    setText('wr-detail-format', formatText || '—');

    if (!workshop.isOpen) {
      const reason =
        workshop.status === 'completed'
          ? 'This workshop has already been completed and is closed for registration.'
          : 'Registration is not open yet for this workshop (Coming Soon).';
      const switchHint =
        openWorkshops.length > 0 ? ' You can select an open workshop below to register.' : '';
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
    validateSingleField('wr-workshop');
    syncSubmitState();

    const url = new URL(window.location.href);
    if (selected) {
      url.searchParams.set('workshop', selected.slug);
    } else {
      url.searchParams.delete('workshop');
    }
    window.history.replaceState(null, '', url.toString());
  });

  // Real-time input validation, button gating, and blur validation
  const fieldIds = [
    'wr-name',
    'wr-email',
    'wr-phone',
    'wr-institution',
    'wr-role',
    'wr-notes',
  ];

  fieldIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('input', () => {
      if (el.classList.contains('is-invalid')) {
        validateSingleField(id);
      }
      clearStatus();
      syncSubmitState();
    });

    el.addEventListener('change', () => {
      syncSubmitState();
    });

    el.addEventListener('blur', () => {
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        const trimmed = el.value.trim();
        if (el.value !== trimmed) {
          el.value = trimmed;
        }
        if (trimmed.length > 0 || el.classList.contains('is-invalid')) {
          validateSingleField(id);
        }
      }
      syncSubmitState();
    });
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Lightweight honeypot check
    if (honeypot && honeypot.value.trim() !== '') {
      form.reset();
      syncSubmitState();
      openSuccessModal({
        modalId: 'wr-success-modal',
        title: 'Registration received',
        message: 'Thank you. Your registration has been received.',
      });
      return;
    }

    const selectedWorkshop = getSelectedOpenWorkshop();
    const fullName = getTrimmedValue('wr-name');
    const email = getTrimmedValue('wr-email');
    const phone = getTrimmedValue('wr-phone');
    const institution = normalizeOptional('wr-institution');
    const role = normalizeOptional('wr-role');
    const additionalNotes = normalizeOptional('wr-notes');

    const checks = [
      validateSingleField('wr-workshop'),
      validateSingleField('wr-name'),
      validateSingleField('wr-email'),
      validateSingleField('wr-phone'),
      validateSingleField('wr-institution'),
      validateSingleField('wr-role'),
      validateSingleField('wr-notes'),
    ];

    if (checks.includes(false) || !selectedWorkshop) {
      const firstBad = form.querySelector('.is-invalid');
      if (firstBad instanceof HTMLElement) firstBad.focus();
      setStatus('error', 'Check your details', (el) => {
        el.textContent = selectedWorkshop
          ? 'Please review the highlighted fields before submitting.'
          : 'Please select an available workshop to register.';
      });
      syncSubmitState();
      return;
    }

    if (!supabase) {
      console.error('Supabase client is not configured for workshop registrations.');
      showSubmissionError();
      return;
    }

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
    clearStatus();
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-disabled');
      submitBtn.setAttribute('aria-busy', 'true');
    }
    if (submitTextEl) submitTextEl.textContent = 'Submitting registration…';

    try {
      const { error } = await supabase.from('workshop_registrations').insert(payload);

      if (error) {
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

      openSuccessModal({
        modalId: 'wr-success-modal',
        title: selectedWorkshop.isFree ? 'Registration received' : 'Registration request received',
        message: selectedWorkshop.isFree
          ? `We have recorded your registration for ${selectedWorkshop.title}. Session details will be sent to ${email}.`
          : `We have recorded your registration request for ${selectedWorkshop.title}. Payment and confirmation instructions will be sent to ${email}.`,
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
        submitBtn.removeAttribute('aria-busy');
      }
      if (submitTextEl) submitTextEl.textContent = 'Submit registration';
      syncSubmitState();
    }
  });

  // Initial button state sync
  syncSubmitState();
}
