import Account from '../Interfaces/account.interface';

interface Item {
    role: number;
    navigation: string;
}

export const navigateOptions: Item[] = [
    {
        role: 1,
        navigation: '/admin'
    },
    {
        role: 2,
        navigation: '/dean'
    },
    {
        role: 3,
        navigation: '/doctor'
    },
    {
        role: 4,
        navigation: '/nurse'
    },
    {
        role: 5,
        navigation: '/coordinator'
    },
    {
        role: 6,
        navigation: '/patient'
    },
]

export const checkNavigation = (role: number) => {
    const value = navigateOptions.find((item: Item) => item.role === role);
    if (value) {
        return value.navigation
    }
    return '/login';
}

export const checkProfile = (profile: Account) => {
    if (profile.role) {
        return profile.role
    }
    else return 6;
}