/**
 * API Types for different views in the application
 */

// Base types for common structures
export interface Link {
  title: string;
  url: string;
  target: string;
}

export interface LinkItem {
  link: Link;
}

export interface Course {
  id: number;
  name: string;
  url: string;
  image: string;
}

export interface Specialty {
  id: number;
  name: string;
  url: string;
  courses: Course[];
}

// Main API response type
export interface APIResponse {
  lang: string;
  sections: {
    specialities: Specialty[];
    que_ofrecemos: LinkItem[];
    recursos: LinkItem[];
  };
}

// Types for specific views

/**
 * Type for the Discover View
 * Consumes the complete sections array
 */
export interface DiscoverViewModel {
  specialities: Specialty[];
  que_ofrecemos: LinkItem[];
  recursos: LinkItem[];
}

/**
 * Type for the Specialty View
 * Consumes the specialities array
 */
export interface SpecialtyViewModel {
  specialities: Specialty[];
}

/**
 * Type for the Specialty Detail View
 * Consumes the courses array of a specific specialty
 */
export interface SpecialtyDetailViewModel {
  specialty: Specialty;
  courses: Course[];
}

/**
 * Type for the Offer View
 * Consumes the que_ofrecemos array
 */
export interface OfferViewModel {
  offers: LinkItem[];
}

/**
 * Type for the Resources View
 * Consumes the recursos array
 */
export interface ResourcesViewModel {
  resources: LinkItem[];
}

// Helper functions to transform API response into view models

/**
 * Transforms the API response into the Discover View model
 */
export function toDiscoverViewModel(response: APIResponse): DiscoverViewModel {
  return {
    specialities: response.sections.specialities,
    que_ofrecemos: response.sections.que_ofrecemos,
    recursos: response.sections.recursos
  };
}

/**
 * Transforms the API response into the Specialty View model
 */
export function toSpecialtyViewModel(response: APIResponse): SpecialtyViewModel {
  return {
    specialities: response.sections.specialities
  };
}

/**
 * Transforms the API response into the Specialty Detail View model for a specific specialty
 */
export function toSpecialtyDetailViewModel(response: APIResponse): SpecialtyDetailViewModel[] {
  return response.sections.specialities.map(specialty => {
    return {
      specialty,
      courses: specialty.courses
    };
  });
}

/**
 * Transforms the API response into the Offer View model
 */
export function toOfferViewModel(response: APIResponse): OfferViewModel {
  return {
    offers: response.sections.que_ofrecemos
  };
}

/**
 * Transforms the API response into the Resources View model
 */
export function toResourcesViewModel(response: APIResponse): ResourcesViewModel {
  return {
    resources: response.sections.recursos
  };
}