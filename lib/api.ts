export const deleteUser = async (user_id: string) =>
  fetch('/api/delete_user', {
    method: 'POST',
    body: JSON.stringify({
      user_id: user_id,
    }),
  });
