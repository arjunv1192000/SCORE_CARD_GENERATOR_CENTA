export const setUserEmail = (email: string) => ({
    type: 'SET_USER_EMAIL' as const,
    payload: email,
  });
  
 