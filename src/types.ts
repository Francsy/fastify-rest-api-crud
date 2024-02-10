export type UserParams = {
    id?: string;
    email?: string;
};

export type UserRegistrationBody = {
    email: string;
    password: string;
    confirmPassword: string;
};

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type Role = 'user' | 'admin';

export type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type DurationString = `${string}:${string}:${string}`;