// 'use client';
// import React from 'react';
// import { useUser } from '@auth0/nextjs-auth0/client';

// const Page = () => {
// 	const { user, error, isLoading } = useUser();

// 	if (isLoading) return <div>Loading...</div>;
// 	if (error) return <div>{error.message}</div>;

// 	return (
// 		<div>
// 			<a href='/api/auth/login'>Login</a>
// 			<a href='/api/auth/logout'>Logout</a>

// 			{user && (
// 				<>
// 					<img src={user.picture ?? ''} alt={user.name ?? 'User'} />
// 					<h2>{user.name}</h2>
// 					<p>{user.email}</p>
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default Page;
