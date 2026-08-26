COPY public.announcements (id, title, description, date, "time", location, image, alt, status, created_at, google_form_url) FROM stdin;
COPY public.donation_settings (id, created_at, upi_id, account_name, bank_name, account_number, ifsc_code, qr_image_url, phone, email) FROM stdin;
COPY public.events (id, created_at, title, description, event_date, location, image_url, ratio) FROM stdin;
COPY public.gallery (id, created_at, image_url, year, event, title, caption, span) FROM stdin;
COPY public.programs (id, slug, title, description, content, parent_slug, image_urls, year_breakdown, sort_order, is_active, created_at, updated_at) FROM stdin;
COPY public.settings (id, key, value, description, updated_at) FROM stdin;
COPY public.stats (id, created_at, value, label, display_order) FROM stdin;
COPY public.testimonials (id, name, role, content, rating, image_url, is_active, sort_order, created_at, updated_at, linkedin_url, "years of experience") FROM stdin;
COPY public.timeline (id, year, title, description, image_urls, details, sort_order, created_at, updated_at, is_active, badge) FROM stdin;
