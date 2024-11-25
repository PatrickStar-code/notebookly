'use server';

import { signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function logout() {
    try {
        await signOut();
        redirect('/');
    } catch (e) {
        throw e;
    }
}