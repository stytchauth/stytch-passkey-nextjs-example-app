import loadStytch from './stytchClient';

const stytch = loadStytch();

export const UserService = {
  // TODO: get rid of this functionality and get rid of delete user registrations button
  delete: async function (user_id: string) {
    return stytch.users.delete({user_id});
  },
};
