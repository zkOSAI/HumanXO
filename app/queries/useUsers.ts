'use client';

import { useQuery } from '@tanstack/react-query';
import { getUser } from './getUsers';
import { useWallet } from '@solana/wallet-adapter-react';

export const useUsers = () => {
    const { publicKey } = useWallet();
    const { data} = useQuery({
        queryKey: ['users', publicKey],
        queryFn: () => getUser(publicKey),
        refetchInterval: 4000,  // optional: poll every 10s
        enabled: !!publicKey
    });
    if (data) { 
        console.log("get user data ")
        return data
    };
    return null
};
