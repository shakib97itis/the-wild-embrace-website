import {auth} from '../_lib/auth';

export const metadata = {
  title: 'Account',
};
async function Page() {
  const session = await auth();
  const firstName = session.user.name.split(' ').at(0);

  return (
    <div>
      <h1>Welcome, {firstName}</h1>
    </div>
  );
}

export default Page;
