
import { ImagePlaceholder } from '@/lib/placeholder-images';

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  imageUrl: string;
  imageHint: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
};

export type User = {
  id: string;
  name: string;
  title: string;
};

export type Profile = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  followers?: number;
  activity?: number;
  location?: string;
  skills?: string[];
  experience?: string;
  companySize?: string;
  materials?: string[];
  rating?: number;
  projectType?: string;
  scaleOfOperations?: string;
  yearsInBusiness?: string;
  courses?: string[];
  affiliation?: string;
  serviceCategory?: string;
  specificService?: string;
  trade?: string;
  licenseAndCertifications?: boolean;
  specialties?: string[];
  specialization?: string;
  bio?: string;
  jobType?: string;
  experienceLevel?: string;
  industry?: string;
};

export type Project = {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  category: string;
  status: string;
  architect?: string;
};

export type JobPosting = {
  id: string;
  title: string;
  companyName: string;
  location: string;
  description: string;
  jobType: string;
  experienceLevel: string;
  industry: string;
};

export const communityPosts: Post[] = [
    {
        id: '1',
        title: 'The Future of Sustainable Architecture',
        excerpt: 'Exploring green building materials and their impact on modern construction. How can we build more sustainably? What are the latest innovations?',
        author: {
            name: 'Priya Sharma',
            avatarUrl: ImagePlaceholder.architect,
        },
        date: '2024-05-18',
        imageUrl: ImagePlaceholder.sustainableBuilding,
        imageHint: 'A modern building integrated with nature, featuring green roofs and solar panels.',
    },
    {
        id: '2',
        title: 'Tips for Aspiring Civil Engineers',
        excerpt: 'A senior engineer shares valuable advice for students and recent graduates looking to start their careers in civil engineering. Key skills, networking, and career paths.',
        author: {
            name: 'Rajesh Kumar',
            avatarUrl: ImagePlaceholder.engineer,
        },
        date: '2024-05-17',
        imageUrl: ImagePlaceholder.bridgeConstruction,
        imageHint: 'A large suspension bridge under construction at dawn, showcasing complex engineering.',
    },
    {
        id: '3',
        title: 'Job Opportunity: Project Manager at BuildWell Inc.',
        excerpt: 'BuildWell Inc. is hiring an experienced Project Manager to oversee large-scale commercial construction projects. Competitive salary and benefits.',
        author: {
            name: 'BuildWell Inc.',
            avatarUrl: ImagePlaceholder.companyLogo,
        },
        date: '2024-05-20',
        imageUrl: ImagePlaceholder.constructionSite,
        imageHint: 'A bustling construction site with cranes and workers, indicating a large-scale project.',
    },
    {
        id: '4',
        title: 'The Rise of Prefabricated Construction',
        excerpt: 'How modular and prefabricated building techniques are revolutionizing the construction industry, reducing costs and timelines.',
        author: {
            name: 'Anjali Verma',
            avatarUrl: ImagePlaceholder.constructionManager,
        },
        date: '2024-05-15',
        imageUrl: ImagePlaceholder.prefabricated,
        imageHint: 'Modular home sections being assembled on-site with a crane.',
    },
    {
        id: '5',
        title: 'Networking Event for AEC Professionals',
        excerpt: 'Join us for our annual networking event. Meet industry leaders, discover new opportunities, and share your experiences.',
        author: {
            name: 'AEC Network',
            avatarUrl: ImagePlaceholder.eventLogo,
        },
        date: '2024-05-12',
        imageUrl: ImagePlaceholder.networkingEvent,
        imageHint: 'A conference room full of professionals networking and talking.',
    },
];
export const professionalProfiles: Profile[] = [];
export const agencyProfiles: Profile[] = [];
export const projectProfiles: Project[] = [];
export const supplierProfiles: Profile[] = [];
export const instituteProfiles: Profile[] = [];
export const developerProfiles: Profile[] = [];
export const serviceProviderProfiles: Profile[] = [];
export const educationalInstituteProfiles: Profile[] = [];
export const contractorProfiles: Profile[] = [];
export const builderProfiles: Profile[] = [];
export const aspirantProfiles: Profile[] = [];
