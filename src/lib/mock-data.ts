export type User = {
    id: string;
    name: string;
    title: string;
    bio: string;
    avatarUrl: string;
    email: string;
    phone: string;
    location: string;
    plan: 'Basic' | 'Premium' | 'Enterprise';
    status: 'Active' | 'Inactive' | 'Pending' | 'Banned';
    };

    export const allUsers: User[] = [
        {
        id: '1',
        name: 'John Doe',
        title: 'Software Engineer',
        bio: 'A passionate developer with a love for building innovative solutions.',
        avatarUrl: '/avatars/01.png',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        location: 'San Francisco, CA',
        plan: 'Premium',
        status: 'Active',
        },
        {
        id: '2',
        name: 'Jane Smith',
        title: 'UX Designer',
        bio: 'Creating intuitive and beautiful user experiences is my passion.',
        avatarUrl: '/avatars/02.png',
        email: 'jane.smith@example.com',
        phone: '098-765-4321',
        location: 'New York, NY',
        plan: 'Basic',
        status: 'Inactive',
        },
        ];