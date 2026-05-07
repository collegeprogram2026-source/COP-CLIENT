const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getPageContent(slug: string) {
  const res = await fetch(`${API_BASE}/api/public/page-content/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch page: ${slug}`);
  }

  return res.json();
}

export async function getProviders() {
  const res = await fetch(`${API_BASE}/api/public/providers`, {
    next: { revalidate: 1 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }

  return res.json();
}

export async function getDegreeTypes() {
  const res = await fetch(`${API_BASE}/api/public/degree-types`, {
    next: { revalidate: 1 },
  });
  if (!res.ok) throw new Error("Failed to fetch degree types");
  return res.json();
}

export async function getCourses() {
  const res = await fetch(`${API_BASE}/api/public/courses`, {
    next: { revalidate: 1 },
  });
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export async function getCoursesHomeSummary() {
  const res = await fetch(`${API_BASE}/api/public/courses/home-summary`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch courses home summary");
  return res.json();
}

export async function getSpecializations() {
  const res = await fetch(`${API_BASE}/api/public/specializations`, {
    next: { revalidate: 1 },
  });
  if (!res.ok) throw new Error("Failed to fetch specializations");
  return res.json();
}

export async function getProvider(slug: string) {
  const res = await fetch(`${API_BASE}/api/public/providers/${slug}`, {
    next: { revalidate: 1 },
  });
  if (!res.ok) throw new Error(`Failed to fetch provider: ${slug}`);
  return res.json();
}

export async function getProviderCourses(slug: string) {
  const res = await fetch(`${API_BASE}/api/public/providers/${slug}/courses`, {
    next: { revalidate: 1 },
  });
  if (!res.ok) throw new Error(`Failed to fetch courses for provider: ${slug}`);
  return res.json();
}

export async function getProviderReviews(slug: string) {
  const res = await fetch(`${API_BASE}/api/public/providers/${slug}/reviews`, {
    next: { revalidate: 1 },
  });
  if (!res.ok) throw new Error(`Failed to fetch reviews for provider: ${slug}`);
  return res.json();
}

export async function getCourseDetail(identifier: string) {
  const res = await fetch(`${API_BASE}/api/public/courses/${identifier}`, {
    next: { revalidate: 1 },
  });
  if (!res.ok) throw new Error(`Failed to fetch course detail: ${identifier}`);
  return res.json();
}
export async function getAllProviderCourses(specializationId?: string) {
  const url = specializationId
    ? `${API_BASE}/api/public/provider-courses?specializationId=${specializationId}`
    : `${API_BASE}/api/public/provider-courses`;
  const res = await fetch(url, {
    next: { revalidate: 1 },
  });
  if (!res.ok) throw new Error("Failed to fetch provider courses");
  return res.json();
}

export async function getProvidersBySpecialization(identifier: string) {

  const res = await fetch(`${API_BASE}/api/public/specializations/${identifier}/providers`, {
    next: { revalidate: 1 },
  });
  if (!res.ok) throw new Error(`Failed to fetch providers for specialization: ${identifier}`);
  return res.json();
}

export async function getBestROIPrograms() {
  const res = await fetch(`${API_BASE}/api/public/providers/programs/best-roi`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error("Failed to fetch best ROI programs");
  return res.json();
}

export async function getReviews() {
  const res = await fetch(`${API_BASE}/api/public/reviews`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export async function submitReview(data: any) {
  const res = await fetch(`${API_BASE}/api/public/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}