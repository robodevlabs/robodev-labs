/* ==========================================================================
   RoboDev Labs Legal Document Data
   Single source of truth for legal page content.
   ========================================================================== */

export type LegalDocumentSlug = 'privacy-policy' | 'terms' | 'cookie-policy';

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: LegalSection[];
}

export interface LegalDocument {
  slug: LegalDocumentSlug;
  title: string;
  shortDescription: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const lastUpdated = 'September 21, 2026';
const legalEmail = 'robodevlabs.team@gmail.com';

export const legalDocuments: LegalDocument[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    shortDescription:
      'How RoboDev Labs handles information from website visitors, prospective clients, students, workshop participants, job applicants, partners, and collaborators.',
    lastUpdated,
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'This Privacy Policy explains how RoboDev Labs handles personal information in connection with this website and related communications for Engineering Services, RoboDev Academy, Product Studio, Careers, and Contact inquiries.',
          'This policy is written for the current website implementation. The site is primarily informational. The contact form prepares an email message to our team inbox, Academy registration buttons may link to Google Forms, and career applications are submitted by email. Where applicable, we handle personal information in accordance with relevant privacy requirements.',
        ],
      },
      {
        heading: 'Information you provide',
        paragraphs: [
          'You may choose to provide information when you contact RoboDev Labs, inquire about services, register interest in Academy programs, apply for a role, or communicate with us by email.',
        ],
        bullets: [
          'Name and contact details, such as email address and optional phone number.',
          'Company, organization, school, institution, role, country, or location.',
          'Project, partnership, workshop, product, or collaboration details.',
          'Messages, questions, preferences, timelines, budgets, participant estimates, and similar context you decide to share.',
          'Career application materials, such as CVs, links to work, project examples, GitHub repositories, portfolios, and availability.',
          'Attachments you choose to send through your own email application.',
        ],
      },
      {
        heading: 'Contact and inquiry information',
        paragraphs: [
          'The website contact form does not submit information to a custom backend in this repository. It validates your entries in the browser and opens your email application with a pre-addressed message to RoboDev Labs. You must send the email from your email application for us to receive it.',
          'If you select an attachment in the contact form, the website does not upload that file to RoboDev Labs. The page only notes the selected file name and asks you to attach the file in your email application if you want to send it.',
        ],
      },
      {
        heading: 'Project and business information',
        paragraphs: [
          'If you contact us about Engineering Services, Custom Software, AI Automation, SaaS or Product Development, or related work, we may receive business and project information that you include in your inquiry.',
          'We use this information to understand your needs, respond to your request, prepare follow-up questions, discuss possible scope, and decide whether a separate proposal, statement of work, contract, or similar commercial document is appropriate.',
        ],
      },
      {
        heading: 'Academy and workshop information',
        paragraphs: [
          'RoboDev Academy pages may invite visitors to register for workshops, training, mentorship, bootcamps, or other educational programs. In the current website implementation, Academy registration links point to external Google Forms URLs.',
          'If you use an external registration form, the information you submit is handled by that third-party form provider as well as by RoboDev Labs for the purpose of managing the program, communicating with participants, and providing relevant workshop information.',
        ],
      },
      {
        heading: 'Career application information',
        paragraphs: [
          'Career pages direct applicants to apply by email. If you apply for a role, we may process the information you send, such as your CV, introduction, links to relevant work, experience, availability, and any other material you include.',
          'We use career application information to review applications, communicate with applicants, evaluate fit for a role, conduct follow-up conversations or practical tasks, and manage hiring decisions.',
        ],
      },
      {
        heading: 'Technical information',
        paragraphs: [
          'When you visit the website, standard technical information may be processed by browsers, hosting infrastructure, and security systems involved in delivering the site. This may include IP address, browser type, device information, requested pages, dates and times of access, and similar log data.',
          'The repository does not show a custom analytics provider, advertising pixel, user account system, payment checkout, database-backed contact submission, or authentication system for this website.',
        ],
      },
      {
        heading: 'How we use information',
        paragraphs: [
          'RoboDev Labs uses information for practical business, educational, hiring, and website operations.',
        ],
        bullets: [
          'Responding to inquiries and direct emails.',
          'Discussing possible engineering projects, collaborations, partnerships, or Product Studio opportunities.',
          'Managing Academy interest, registrations, participant communications, and educational program logistics.',
          'Reviewing career applications and communicating with applicants.',
          'Preparing proposals, scopes, agreements, or similar documents where requested or appropriate.',
          'Maintaining website reliability, security, and functionality.',
          'Keeping reasonable business records of communications and decisions.',
          'Complying with applicable legal obligations and protecting legitimate business interests.',
        ],
      },
      {
        heading: 'Communication',
        paragraphs: [
          'If you contact RoboDev Labs, register interest, apply for a role, or otherwise communicate with us, we may reply using the contact details you provide. Communications may relate to your inquiry, requested services, Academy programs, careers, partnership discussions, or administrative follow-up.',
          'We do not use the current website implementation to automatically enroll visitors in a newsletter or marketing list.',
        ],
      },
      {
        heading: 'Service providers and information sharing',
        paragraphs: [
          'We may use service providers and third-party platforms that help operate the website, deliver email, host forms, provide fonts, or support normal business communications. These providers may process information according to their own terms and privacy practices.',
          'Based on the current repository, relevant third-party touchpoints include Google Fonts for font delivery, Google Forms for some Academy registration links, external social links, and users\' own email providers when they send messages to RoboDev Labs.',
        ],
      },
      {
        heading: 'Legal disclosures',
        paragraphs: [
          'We may disclose information if required by applicable law, legal process, government request, or where we reasonably believe disclosure is necessary to protect rights, safety, security, or the integrity of our services.',
          'We may also share information where necessary to establish, exercise, or defend legal claims, enforce agreements, investigate misuse, or protect RoboDev Labs, users, applicants, participants, or others.',
        ],
      },
      {
        heading: 'International data processing',
        paragraphs: [
          'RoboDev Labs operates from Nepal and may communicate with visitors, clients, students, participants, applicants, partners, and collaborators in other countries. Information may therefore be processed across borders depending on your location, our tools, and the services used to communicate or host forms.',
          'Where applicable, we take reasonable steps to handle personal information in line with relevant privacy expectations and any mandatory legal requirements that apply to the specific context.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'We use reasonable administrative and technical measures appropriate to the nature of the website and communications we receive. No website, email system, form provider, or internet transmission can be guaranteed to be completely secure.',
          'Please avoid sending highly sensitive information unless it is necessary for your inquiry or application. If a project requires confidential material, we can discuss appropriate handling through separate arrangements.',
        ],
      },
      {
        heading: 'Data retention',
        paragraphs: [
          'We keep personal information only for as long as reasonably needed for the purpose for which it was provided, including responding to inquiries, managing Academy communications, reviewing applications, maintaining records, complying with legal obligations, resolving disputes, and protecting legitimate interests.',
          'Retention periods may vary depending on the type of information, the relationship, whether a project or application is active, and whether legal or business recordkeeping requirements apply.',
        ],
      },
      {
        heading: 'Privacy rights and requests',
        paragraphs: [
          'Depending on your location and the context, you may have rights to request access to, correction of, deletion of, restriction of, or information about certain personal data. The availability and scope of these rights can vary by jurisdiction.',
          `To make a privacy request, contact us at ${legalEmail}. We may need to verify your identity and understand the context of your request before taking action.`,
        ],
      },
      {
        heading: 'Correction and deletion',
        paragraphs: [
          'If information you provided to RoboDev Labs is inaccurate or you want us to delete information where applicable, contact us with enough detail to identify the relevant communication, inquiry, registration, or application.',
          'We may retain certain records where required or permitted by applicable law, where needed for legitimate business records, or where necessary to resolve disputes, protect rights, or complete an ongoing transaction or process.',
        ],
      },
      {
        heading: 'Children, minors, and students',
        paragraphs: [
          'RoboDev Academy may be relevant to students and educational communities. If a participant is a minor, a parent, guardian, school, institution, or responsible adult should be involved where required by applicable law or program context.',
          'We do not knowingly ask minors to provide unnecessary personal information through this website. If you believe a minor has provided information that should be corrected or removed, contact us at the email below.',
        ],
      },
      {
        heading: 'Third-party links',
        paragraphs: [
          'The website may link to third-party websites or services, including Google Forms, social platforms, external profiles, and other resources. RoboDev Labs does not control those third-party services.',
          'When you leave the RoboDev Labs website, the privacy practices, cookies, tracking, security, and terms of the third-party service apply. You should review those policies before submitting information to them.',
        ],
      },
      {
        heading: 'Changes to this Privacy Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time as the website, services, Academy programs, Product Studio activities, or legal requirements change. The Last updated date shows when this document was last revised.',
          'Material updates will be reflected on this page. Your continued use of the website after an update means the revised policy applies from the updated date.',
        ],
      },
      {
        heading: 'Contact information',
        paragraphs: [
          `For privacy questions or requests, contact RoboDev Labs at ${legalEmail}.`,
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    shortDescription:
      'The terms that govern use of the RoboDev Labs website and explain how website inquiries, Engineering Services, RoboDev Academy, Product Studio, and Careers information should be understood.',
    lastUpdated,
    sections: [
      {
        heading: 'Acceptance of these Terms',
        paragraphs: [
          'These Terms of Service govern your use of the RoboDev Labs website. By accessing or using the website, you agree to these Terms to the extent permitted by applicable law.',
          'If you do not agree with these Terms, you should not use the website. Separate written agreements may apply to specific engineering engagements, Academy programs, product collaborations, employment processes, or other arrangements.',
        ],
      },
      {
        heading: 'Website use',
        paragraphs: [
          'You may use the website for lawful purposes, including learning about RoboDev Labs, making inquiries, reviewing Engineering Services, exploring RoboDev Academy programs, viewing Product Studio information, and reviewing career opportunities.',
          'You are responsible for ensuring that any information you submit is accurate, lawful, and that you have the right to share it with RoboDev Labs.',
        ],
      },
      {
        heading: 'Prohibited use',
        paragraphs: [
          'You must not misuse the website or interfere with its operation.',
        ],
        bullets: [
          'Do not attempt unauthorized access to systems, accounts, infrastructure, or code.',
          'Do not submit malicious code, spam, deceptive content, or unlawful material.',
          'Do not use the website to harass, threaten, impersonate, or mislead others.',
          'Do not scrape, copy, or reuse website content in a way that infringes rights or violates applicable law.',
          'Do not interfere with security, availability, performance, or normal operation of the website.',
        ],
      },
      {
        heading: 'Website information and content',
        paragraphs: [
          'The website provides general information about RoboDev Labs, Engineering Services, RoboDev Academy, Product Studio, Careers, and Contact options. We try to keep information accurate and useful, but website content may change and may not always be complete, current, or error-free.',
          'Website content is provided for informational purposes. It is not professional legal, tax, financial, or other regulated advice.',
        ],
      },
      {
        heading: 'Engineering Services',
        paragraphs: [
          'Engineering Services may include work such as Custom Software, AI Automation, SaaS or Product Development, web applications, mobile applications, cloud infrastructure, APIs, integrations, and related technical services.',
          'Information on the website describes service areas and capabilities. It does not create a binding obligation for RoboDev Labs to provide any specific service, timeline, price, feature, deliverable, support level, or result.',
        ],
      },
      {
        heading: 'Client engagements',
        paragraphs: [
          'Submitting the contact form, sending an email, booking a conversation, or discussing a potential project does not automatically create a client relationship, contract, partnership, employment relationship, or obligation to perform work.',
          'Actual engineering engagements are governed by separate commercial agreements, proposals, statements of work, contracts, purchase orders, or similar documentation where applicable. Those documents control the scope, fees, timelines, deliverables, responsibilities, intellectual property terms, confidentiality terms, and other project-specific details.',
        ],
      },
      {
        heading: 'Proposals, contracts, and statements of work',
        paragraphs: [
          'Any proposal, estimate, statement of work, or similar document is subject to its own terms and may require written acceptance before it becomes binding. Discussions before that point are exploratory unless expressly stated otherwise in a signed or otherwise mutually accepted document.',
          'If there is a conflict between these Terms and a separate written agreement with RoboDev Labs, the separate written agreement controls for the specific engagement covered by that agreement.',
        ],
      },
      {
        heading: 'RoboDev Academy and workshops',
        paragraphs: [
          'RoboDev Academy may offer workshops, training, mentorship, bootcamps, career development, educational programs, and related learning experiences. Individual programs may have additional details or terms communicated at the time of registration.',
          'The current website may link to external registration forms for Academy programs. Registering through an external form may also be subject to that provider\'s terms and privacy practices.',
        ],
      },
      {
        heading: 'Educational materials and outcomes',
        paragraphs: [
          'Academy materials are for learning and practical skill development. They may include examples, exercises, resources, code, templates, checklists, or project guidance.',
          'RoboDev Labs does not guarantee employment, income, business success, academic results, search ranking results, admissions outcomes, funding, certification recognition by third parties, or any other specific career or commercial result from participating in Academy programs.',
        ],
      },
      {
        heading: 'Product Studio and products',
        paragraphs: [
          'Product Studio pages may describe RoboDev Labs products, concepts, prototypes, experiments, or product work. Product descriptions, screenshots, roadmaps, technical notes, and future plans may change over time.',
          'A Product Studio page on this website does not necessarily mean that a product is available in every region, ready for commercial use, or governed only by these Terms. Specific products may have separate terms, privacy notices, user agreements, or platform rules when they are made available.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'The website, including its design, text, branding, graphics, logos, code, layouts, and other content, is owned by RoboDev Labs or its licensors unless otherwise indicated. You may view the website for personal or internal business evaluation purposes.',
          'You must not copy, reproduce, modify, publish, distribute, sell, or create derivative works from website content without permission, except as allowed by applicable law or clearly permitted by RoboDev Labs.',
        ],
      },
      {
        heading: 'User-submitted information',
        paragraphs: [
          'If you submit information through email, forms, career applications, or other communications, you grant RoboDev Labs permission to use that information for the purpose of reviewing, responding to, and managing the relevant inquiry, application, registration, project discussion, or relationship.',
          'Do not submit confidential, proprietary, sensitive, or third-party information unless you have the right to share it and it is necessary for the relevant discussion. Confidentiality obligations, if any, should be handled through separate written agreements.',
        ],
      },
      {
        heading: 'Third-party services and links',
        paragraphs: [
          'The website may link to or rely on third-party services, including Google Forms, Google Fonts, social platforms, email applications, external websites, and other resources. Third-party services are not controlled by RoboDev Labs.',
          'RoboDev Labs is not responsible for third-party content, availability, security, privacy practices, terms, or actions. Your use of third-party services is governed by their own terms and policies.',
        ],
      },
      {
        heading: 'Disclaimers',
        paragraphs: [
          'The website is provided on an "as is" and "as available" basis. To the extent permitted by applicable law, RoboDev Labs disclaims warranties of any kind, whether express, implied, statutory, or otherwise, including warranties of accuracy, reliability, availability, fitness for a particular purpose, and non-infringement.',
          'We do not guarantee that the website will be uninterrupted, secure, error-free, or free from harmful components. We may update, suspend, or remove website content at any time.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the extent permitted by applicable law, RoboDev Labs will not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages, or for loss of profits, revenue, data, goodwill, or business opportunities arising from or related to your use of the website.',
          'Nothing in these Terms is intended to exclude or limit liability that cannot be excluded or limited under applicable law.',
        ],
      },
      {
        heading: 'Changes to the website and services',
        paragraphs: [
          'RoboDev Labs may update, change, pause, or discontinue parts of the website, service descriptions, Academy pages, Product Studio pages, Careers pages, or Contact features without notice.',
          'We may also update how inquiries, registrations, applications, or external links work as the website evolves.',
        ],
      },
      {
        heading: 'Changes to these Terms',
        paragraphs: [
          'We may revise these Terms of Service from time to time. The Last updated date shows when the current version was published.',
          'Your continued use of the website after changes are posted means the revised Terms apply from the updated date, to the extent permitted by applicable law.',
        ],
      },
      {
        heading: 'Governing and applicable law',
        paragraphs: [
          'RoboDev Labs operates from Nepal. These Terms are intended to be interpreted with Nepal as the governing-law context, except where mandatory laws in another jurisdiction apply and cannot be waived.',
          'Nothing in these Terms is intended to remove rights or protections that apply to you under mandatory consumer, privacy, employment, education, or other laws in your jurisdiction.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          `For questions about these Terms of Service, contact RoboDev Labs at ${legalEmail}.`,
        ],
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    shortDescription:
      'How cookies, local browser storage, Google Fonts, external forms, and third-party links relate to the current RoboDev Labs website.',
    lastUpdated,
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'This Cookie Policy explains how cookies and similar browser technologies relate to the RoboDev Labs website.',
          'This policy is based on the current implementation visible in the repository. The website does not include a cookie-consent banner, custom analytics script, advertising pixel, payment checkout, login system, or first-party cookie-setting code.',
        ],
      },
      {
        heading: 'What cookies are',
        paragraphs: [
          'Cookies are small text files that websites or third-party services can store in your browser. They are commonly used to remember preferences, keep sessions active, measure traffic, support security, or provide embedded services.',
          'Similar technologies include local storage, session storage, pixels, tags, and scripts that store or read information in a browser.',
        ],
      },
      {
        heading: 'Cookies used by this website',
        paragraphs: [
          'Based on the current repository, the RoboDev Labs website itself does not set first-party cookies through application code.',
          'The website also does not include Google Analytics, advertising cookies, Meta Pixel, tracking pixels, newsletter tracking, authentication cookies, or payment cookies in the current implementation.',
        ],
      },
      {
        heading: 'Local browser storage',
        paragraphs: [
          'The website layout includes code that can read a localStorage key named robodev_theme_customizer. This is browser storage, not a cookie. It is used to apply saved visual customization values if such values already exist in the visitor browser.',
          'Local storage stays in your browser unless you clear it or your browser removes it. It is not used in the current repository as an analytics or advertising identifier.',
        ],
      },
      {
        heading: 'Essential and technical technologies',
        paragraphs: [
          'Some technical processing is necessary for the website to load, display pages, serve assets, and support basic browser functionality. This may involve standard server or hosting logs and browser requests for pages, scripts, styles, images, fonts, and other assets.',
          'These technologies are used for delivery, performance, troubleshooting, and security. They are not the same as advertising or behavioral tracking cookies.',
        ],
      },
      {
        heading: 'Analytics technologies',
        paragraphs: [
          'The current website implementation does not show an active analytics provider or analytics cookie script. Although some educational content may mention analytics tools as workshop topics, that is not the same as installing analytics tracking on this website.',
          'If RoboDev Labs adds analytics in the future, this Cookie Policy should be updated to describe the provider and the relevant cookie or storage behavior.',
        ],
      },
      {
        heading: 'Third-party technologies and links',
        paragraphs: [
          'The website loads fonts from Google Fonts. When your browser requests those fonts, Google may receive technical request information such as IP address, browser details, and requested font files according to its own policies.',
          'Academy registration buttons may link to Google Forms. Social links may lead to platforms such as GitHub, LinkedIn, X, Instagram, YouTube, Facebook, and TikTok. If you visit those external services, they may use their own cookies or similar technologies. RoboDev Labs does not control third-party cookie practices.',
        ],
      },
      {
        heading: 'Email and attachments',
        paragraphs: [
          'The contact form opens your email application instead of storing a submission in a website backend. Any information you send by email is handled by your email provider and by RoboDev Labs inbox systems according to their respective practices.',
          'If you attach a file in your email application, that file is sent through email infrastructure rather than through a cookie or website upload system.',
        ],
      },
      {
        heading: 'Browser controls',
        paragraphs: [
          'Most browsers let you block, delete, or manage cookies and site data. You can usually find these controls in your browser privacy or security settings.',
          'You may also clear local storage for this website through your browser settings or developer tools. Exact controls vary by browser and device.',
        ],
      },
      {
        heading: 'Consequences of disabling cookies or storage',
        paragraphs: [
          'Because the current RoboDev Labs website does not rely on first-party cookies for core functionality, blocking cookies should not prevent you from reading the main website pages.',
          'Blocking third-party requests, disabling JavaScript, or clearing local storage may affect fonts, visual preferences, external forms, contact form behavior, links, or other browser-level functionality.',
        ],
      },
      {
        heading: 'No cookie-consent banner',
        paragraphs: [
          'The website does not currently include a cookie-consent banner because the repository does not show non-essential first-party analytics, advertising, or tracking cookies being set by the site.',
          'If future changes add non-essential cookies or tracking technologies that require consent, the website and this policy should be updated accordingly.',
        ],
      },
      {
        heading: 'Changes to this Cookie Policy',
        paragraphs: [
          'We may update this Cookie Policy if the website changes, including if analytics, advertising, embedded services, authentication, payment systems, or other browser technologies are added.',
          'The Last updated date shows when this document was last revised.',
        ],
      },
      {
        heading: 'Contact information',
        paragraphs: [
          `For questions about this Cookie Policy, contact RoboDev Labs at ${legalEmail}.`,
        ],
      },
    ],
  },
];

export function getLegalDocumentBySlug(slug: LegalDocumentSlug) {
  return legalDocuments.find((document) => document.slug === slug);
}
