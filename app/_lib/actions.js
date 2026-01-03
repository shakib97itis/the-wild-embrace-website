'use server';

const {signIn} = require('./auth');

export async function signInAction() {
  await signIn('google', {redirectTo: '/account'});
}
