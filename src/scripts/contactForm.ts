import { supabase } from '../db/supabase';

const TOPIC_CONTEXT_GROUPS: Record<'engineering' | 'academy' | 'partnership', string[]> = {
  engineering: [
    'Software Engineering',
    'AI Automation',
    'SaaS / Product Development',
    'Website / Web Application',
    'Custom Business Software',
  ],
  academy: ['RoboDev Academy / Workshop', 'University / Student Organization'],
  partnership: ['Product Collaboration', 'Partnership'],
};

type ContextKey = keyof typeof TOPIC_CONTEXT_GROUPS;
type StatusVariant = 'info' | 'success' | 'error';

function getActiveContext(selectedTopic: string): ContextKey | null {
  if (!selectedTopic) return null;
  const keys = Object.keys(TOPIC_CONTEXT_GROUPS) as ContextKey[];
  return keys.find((key) => TOPIC_CONTEXT_GROUPS[key].includes(selectedTopic)) ?? null;
}

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

/**
 * Initializes scroll reveals, conditional contextual sections, validation,
 * and direct browser-to-Supabase submission for the /contact page form.
 */
export function initContactForm(): void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Reveal animations */
  const revealEls = document.querySelectorAll('.contact-page .reveal-fade-up');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  const topicEl = document.getElementById('cf-topic');
  const formEl = document.getElementById('contact-form');
  const statusEl = document.getElementById('contact-status');
  const submitBtnEl = document.getElementById('cf-submit-btn');
  const submitTextEl = document.getElementById('cf-submit-text');
  const honeypotEl = document.getElementById('cf-hp');

  if (
    !(topicEl instanceof HTMLSelectElement) ||
    !(formEl instanceof HTMLFormElement) ||
    !(statusEl instanceof HTMLElement)
  ) {
    return;
  }

  const topic = topicEl;
  const form = formEl;
  const status = statusEl;
  const submitBtn = submitBtnEl instanceof HTMLButtonElement ? submitBtnEl : null;
  const honeypot = honeypotEl instanceof HTMLInputElement ? honeypotEl : null;

  const inbox = form.getAttribute('data-inbox') || 'robodevlabs.team@gmail.com';
  const googleFormUrl = form.getAttribute('data-form-url') || '';

  const contexts = Array.from(document.querySelectorAll('[data-context]')).filter(
    (node): node is HTMLElement => node instanceof HTMLElement
  );

  const syncContexts = (): void => {
    const active = getActiveContext(topic.value);
    contexts.forEach((fs) => {
      fs.hidden = fs.getAttribute('data-context') !== active;
    });
  };

  topic.addEventListener('change', syncContexts);
  syncContexts();

  const setStatus = (variant: StatusVariant, populate: (el: HTMLElement) => void): void => {
    status.replaceChildren();
    status.hidden = false;
    status.className =
      variant === 'success'
        ? 'contact-status contact-status--success'
        : variant === 'error'
          ? 'contact-status contact-status--error'
          : 'contact-status';
    populate(status);
  };

  const showFallbackError = (): void => {
    setStatus('error', (el) => {
      el.appendChild(
        document.createTextNode(
          "We couldn't submit your inquiry right now. Your details are still in the form — please try again, or reach us directly via "
        )
      );
      if (googleFormUrl) {
        const gLink = document.createElement('a');
        gLink.href = googleFormUrl;
        gLink.target = '_blank';
        gLink.rel = 'noopener noreferrer';
        gLink.style.textDecoration = 'underline';
        gLink.style.fontWeight = '600';
        gLink.textContent = 'our Google Form';
        el.appendChild(gLink);
        el.appendChild(document.createTextNode(' or email '));
      }
      const mLink = document.createElement('a');
      mLink.href = `mailto:${inbox}`;
      mLink.style.textDecoration = 'underline';
      mLink.style.fontWeight = '600';
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
      syncContexts();
      setStatus('success', (el) => {
        el.textContent = 'Thank you. Your submission has been received.';
      });
      return;
    }

    const name = getTrimmedValue('cf-name');
    const email = getTrimmedValue('cf-email');
    const selectedTopic = topic.value.trim();
    const subject = getTrimmedValue('cf-subject');
    const message = getTrimmedValue('cf-message');

    const allowedTopics = Array.from(topic.options)
      .map((opt) => opt.value)
      .filter(Boolean);

    const emailOk = email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const topicOk = Boolean(selectedTopic && allowedTopics.includes(selectedTopic));

    const checks = [
      setFieldError('cf-name', 'cf-name-error', name.length < 1 || name.length > 120),
      setFieldError('cf-email', 'cf-email-error', !emailOk),
      setFieldError('cf-topic', 'cf-topic-error', !topicOk),
      setFieldError('cf-subject', 'cf-subject-error', subject.length < 1 || subject.length > 200),
      setFieldError('cf-message', 'cf-message-error', message.length < 20 || message.length > 5000),
    ];

    if (checks.includes(false)) {
      const firstBad = form.querySelector('.is-invalid');
      if (firstBad instanceof HTMLElement) firstBad.focus();
      setStatus('error', (el) => {
        el.textContent = 'Please review the highlighted fields before submitting.';
      });
      return;
    }

    if (!supabase) {
      console.error('Supabase client is not configured for contact submissions.');
      showFallbackError();
      return;
    }

    const activeContext = getActiveContext(selectedTopic);

    // Strict allowlisted payload matching public.project_inquiries insertable columns
    const payload = {
      name,
      email,
      organization: normalizeOptional('cf-org'),
      role: normalizeOptional('cf-role'),
      phone: normalizeOptional('cf-phone'),
      location: normalizeOptional('cf-location'),
      topic: selectedTopic,
      subject,
      message,
      project_type: activeContext === 'engineering' ? normalizeOptional('cf-projtype') : null,
      timeline: activeContext === 'engineering' ? normalizeOptional('cf-timeline') : null,
      budget: activeContext === 'engineering' ? normalizeOptional('cf-budget') : null,
      institution: activeContext === 'academy' ? normalizeOptional('cf-institution') : null,
      workshop: activeContext === 'academy' ? normalizeOptional('cf-workshop') : null,
      participants: activeContext === 'academy' ? normalizeOptional('cf-participants') : null,
      preferred_date: activeContext === 'academy' ? normalizeOptional('cf-prefdate') : null,
      partner_org: activeContext === 'partnership' ? normalizeOptional('cf-partner-org') : null,
      collaboration: activeContext === 'partnership' ? normalizeOptional('cf-collab') : null,
    };

    isSubmitting = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
    }
    if (submitTextEl) submitTextEl.textContent = 'Sending inquiry...';
    setStatus('info', (el) => {
      el.textContent = 'Sending your inquiry to RoboDev Labs...';
    });

    try {
      const { error } = await supabase.from('project_inquiries').insert(payload);
      if (error) {
        console.error('Project inquiry insert failed:', {
          code: error.code ?? 'unknown',
          hint: error.hint ?? null,
        });
        showFallbackError();
        return;
      }

      setStatus('success', (el) => {
        const title = document.createElement('strong');
        title.textContent = 'Inquiry sent! ';
        el.appendChild(title);
        el.appendChild(
          document.createTextNode(
            'Thank you for reaching out to RoboDev Labs. Our team has received your inquiry and will reply by email.'
          )
        );
      });

      form.reset();
      syncContexts();
      form.querySelectorAll('.is-invalid').forEach((node) => {
        node.classList.remove('is-invalid');
        node.removeAttribute('aria-invalid');
      });
      form.querySelectorAll('.form-error').forEach((errEl) => {
        if (errEl instanceof HTMLElement) errEl.hidden = true;
      });
    } catch (err) {
      console.error(
        'Unexpected project inquiry submission failure.',
        err instanceof Error ? err.name : 'UnknownError'
      );
      showFallbackError();
    } finally {
      isSubmitting = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
      }
      if (submitTextEl) submitTextEl.textContent = 'Send inquiry';
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
